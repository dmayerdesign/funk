import {
  construct,
  ContentEditorService,
} from "@funk/admin/content/application/external/editor/service"
import {
  Content,
  CONTENTS,
  ContentType,
  ManagedText,
} from "@funk/admin/content/model/content"
import { UserRole } from "@funk/auth/model/user-role"
import { asPromise } from "@funk/helpers/as-promise"
import { FAKE_USER_UID } from "@funk/identity/application/external/stubs"
import { UserSession } from "@funk/identity/application/external/user-session"
import { UserState, USER_STATES } from "@funk/identity/model/user-state"
import { GetById } from "@funk/persistence/application/external/behaviors/get-by-id"
import { construct as constructListenById } from "@funk/persistence/application/external/behaviors/listen-by-id"
import { construct as constructSetById } from "@funk/persistence/application/external/behaviors/set-by-id"
import { construct as constructUpdateById } from "@funk/persistence/application/external/behaviors/update-by-id"
import { construct as constructGetInnerText } from "@funk/ui/infrastructure/external/helpers/html/get-inner-text"
import { AlertController } from "@ionic/angular"
import { subHours } from "date-fns"
import { when } from "jest-when"
import { Dictionary } from "lodash"
import { of } from "rxjs"

describe("ContentEditorService", () => {
  let getById: GetById
  let listenById: ReturnType<typeof constructListenById>
  let setById: ReturnType<typeof constructSetById>
  let updateById: ReturnType<typeof constructUpdateById>

  let alertController: AlertController
  let userSession: UserSession
  let getInnerText: ReturnType<typeof constructGetInnerText>

  it("should edit content for the first time", async () => {
    const service = newService()
    const getActiveContentValueControl = async () =>
      await asPromise(service.getMaybeActiveContentValueControl())

    await service.openEditor("content-2")

    expect(await getActiveContentValueControl()).toEqual(
      expect.objectContaining({ value: "Test 2" }),
    )
  })

  it("should edit content for the second time", async () => {
    const service = newService()
    const getActiveContentValueControl = async () =>
      await asPromise(service.getMaybeActiveContentValueControl())

    await service.openEditor("content-1")

    expect((await getActiveContentValueControl())?.value).toEqual(
      "Test 1 preview saved",
    )
  })

  it("should save edited content", async () => {
    const service = newService()
    await service.openEditor("content-1")
    const activeContentValueControl = await asPromise(
      service.getMaybeActiveContentValueControl(),
    )
    activeContentValueControl?.setValue("Test 1 preview")

    await service.saveAndClearIfEditing()

    const clearedActiveContentValueControl = await asPromise(
      service.getMaybeActiveContentValueControl(),
    )
    expect(clearedActiveContentValueControl).toBe(undefined)
    expect(updateById).toHaveBeenCalledTimes(1)
    expect(updateById).toHaveBeenCalledWith(
      USER_STATES,
      FAKE_USER_UID,
      expect.objectContaining({
        "contentPreviews.content-1.content": {
          id: FAKE_CONTENTS["content-1"].id,
          type: FAKE_CONTENTS["content-1"].type,
          value: FAKE_CONTENTS["content-1"].value + " preview",
        },
      }),
    )
  })

  it("should ask the user to confirm before publishing all previews", async () => {
    const service = newService()

    await service.publishAllOnConfirmation()

    expect(alertController.create).toHaveBeenCalled()
  })

  it("should publish all previews", async () => {
    const FAKE_USER_STATES = createFakeUserStates("content-1")
    const service = newService()

    await service.publishAll(FAKE_USER_STATES[FAKE_USER_UID].contentPreviews!, {
      id: FAKE_USER_UID,
    })

    expect(setById).toHaveBeenCalledTimes(1)
    expect(setById).toHaveBeenCalledWith(
      CONTENTS,
      "content-1",
      createFakeUserStates("content-1")[FAKE_USER_UID].contentPreviews?.[
        "content-1"
      ].content,
    )
    expect(updateById).toHaveBeenCalledTimes(1)
    expect(updateById).toHaveBeenCalledWith(USER_STATES, FAKE_USER_UID, {
      contentPreviews: {},
    })
  })

  it("should not publish all previews if the user is not an admin", async () => {
    userSession = of({
      auth: { claims: { role: UserRole.PUBLIC } },
    }) as UserSession
    const service = newService()

    await service.publishAllOnConfirmation()

    expect(alertController.create).not.toHaveBeenCalled()
  })

  it("should not publish if the content has been edited since the preview was created", async () => {
    const FAKE_USER_STATES = createFakeUserStates(
      "content-with-publish-conflict",
    )
    when(listenById as jest.Mock)
      .calledWith(USER_STATES)
      .mockReturnValueOnce(of(FAKE_USER_STATES[FAKE_USER_UID]))
    when(getById as jest.Mock)
      .calledWith(USER_STATES)
      .mockReturnValueOnce(Promise.resolve(FAKE_USER_STATES[FAKE_USER_UID]))
    const service = newService()

    await service.publishAll(FAKE_USER_STATES[FAKE_USER_UID].contentPreviews!, {
      id: FAKE_USER_UID,
    })
    const publishConflicts = await asPromise(service.getPublishConflicts())
    const contentIdUpdatedAfterPreview = publishConflicts[0][1].id

    expect(setById).not.toHaveBeenCalled()
    expect(updateById).not.toHaveBeenCalledWith()
    expect(contentIdUpdatedAfterPreview).toBe("content-with-publish-conflict")
  })

  it("should publish one preview, regardless of publish conflict", async () => {
    const service = newService()

    await service.publishOne("content-1")

    expect(setById).toHaveBeenCalledTimes(1)
    expect(setById).toHaveBeenCalledWith(
      CONTENTS,
      "content-1",
      createFakeUserStates("content-1")[FAKE_USER_UID].contentPreviews?.[
        "content-1"
      ].content,
    )
    expect(updateById).toHaveBeenCalledTimes(1)
    expect(updateById).toHaveBeenCalledWith(USER_STATES, FAKE_USER_UID, {
      contentPreviews: {},
    })
  })

  it("should not publish one preview if the user is not an admin", async () => {
    userSession = of({
      auth: { claims: { role: UserRole.PUBLIC } },
    }) as UserSession
    const service = newService()

    await service.publishOne("content-1")

    expect(setById).not.toHaveBeenCalled()
    expect(updateById).not.toHaveBeenCalledWith()
  })

  it("should remove a preview", async () => {
    const service = newService()

    await service.removePreview("content-1")

    expect(getById).toHaveBeenCalledWith(USER_STATES, FAKE_USER_UID)
    expect(updateById).toHaveBeenCalledWith(USER_STATES, FAKE_USER_UID, {
      contentPreviews: {},
    })
  })

  it("should ask the user to confirm before removing all previews", async () => {
    const service = newService()

    await service.removeAllPreviewsOnConfirmation()

    expect(alertController.create).toHaveBeenCalled()
  })

  it("should remove all previews", async () => {
    const service = newService()

    await service.removeAllPreviews()

    expect(updateById).toHaveBeenCalledWith(USER_STATES, FAKE_USER_UID, {
      contentPreviews: {},
    })
    expect(service.getPublishConflicts().getValue()).toEqual([])
  })

  beforeEach(() => {
    userSession = of({
      auth: { claims: { role: UserRole.ADMINISTRATOR } },
      person: { id: FAKE_USER_UID },
    }) as UserSession
    getById = jest.fn()
    listenById = jest.fn()
    setById = jest.fn()
    updateById = jest.fn()
    getInnerText = (htmlString: string) => htmlString
    alertController = ({
      create: jest.fn().mockReturnValue({ present: jest.fn() }),
      dismiss: jest.fn(),
    } as Partial<AlertController>) as AlertController

    const FAKE_USER_STATES = createFakeUserStates()
    when(listenById as jest.Mock)
      .calledWith(USER_STATES)
      .mockReturnValue(of(FAKE_USER_STATES[FAKE_USER_UID]))
    when(getById as jest.Mock)
      .calledWith(USER_STATES)
      .mockReturnValue(Promise.resolve(FAKE_USER_STATES[FAKE_USER_UID]))
    when(getById as jest.Mock)
      .calledWith(CONTENTS, "content-1")
      .mockReturnValue(Promise.resolve(FAKE_CONTENTS["content-1"]))
    when(getById as jest.Mock)
      .calledWith(CONTENTS, "content-2")
      .mockReturnValue(Promise.resolve(FAKE_CONTENTS["content-2"]))
    when(getById as jest.Mock)
      .calledWith(CONTENTS, "content-with-publish-conflict")
      .mockReturnValue(
        Promise.resolve(FAKE_CONTENTS["content-with-publish-conflict"]),
      )
    when(listenById as jest.Mock)
      .calledWith(CONTENTS, "content-1")
      .mockReturnValue(of(FAKE_CONTENTS["content-1"]))
    when(listenById as jest.Mock)
      .calledWith(CONTENTS, "content-2")
      .mockReturnValue(of(FAKE_CONTENTS["content-2"]))
    when(listenById as jest.Mock)
      .calledWith(CONTENTS, "content-with-publish-conflict")
      .mockReturnValue(of(FAKE_CONTENTS["content-with-publish-conflict"]))
  })

  function newService(): ContentEditorService {
    return construct(
      userSession,
      listenById,
      getById,
      setById,
      updateById,
      getInnerText,
      alertController,
      of(961),
    )
  }
})

const FAKE_CONTENTS: Dictionary<Content> = {
  "content-1": {
    id: "content-1",
    value: "Test 1",
    type: ContentType.TEXT,
    updatedAt: subHours(new Date(), 1).getTime(),
  },
  "content-2": {
    id: "content-2",
    value: "Test 2",
    type: ContentType.TEXT,
    updatedAt: subHours(new Date(), 1).getTime(),
  },
  "html-content": {
    id: "content-2",
    value: "<p>HTML <b>content</b></p>",
    type: ContentType.HTML,
    updatedAt: subHours(new Date(), 1).getTime(),
  },
  "content-with-publish-conflict": {
    id: "content-with-publish-conflict",
    value: "Test With PublishConflict",
    type: ContentType.TEXT,
    updatedAt: new Date().getTime(),
  },
}

const createFakeUserStates = (
  contentIdPreviewing = "content-1",
): {
  [id: string]: UserState
} => ({
  [FAKE_USER_UID]: {
    id: FAKE_USER_UID,
    contentPreviews: {
      [contentIdPreviewing]: {
        createdAt: subHours(new Date(), 1).getTime(),
        content: {
          ...FAKE_CONTENTS[contentIdPreviewing],
          value: FAKE_CONTENTS[contentIdPreviewing].value + " preview saved",
        } as Text,
      },
    },
  },
})
