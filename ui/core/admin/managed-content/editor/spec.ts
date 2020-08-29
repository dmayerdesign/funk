import { USER_STATES, UserState } from "@funk/model/identity/user-state"
import {
  CONTENTS,
  ManagedContent,
  ManagedContentType,
  ManagedText,
} from "@funk/model/managed-content/managed-content"
import { FAKE_USER_UID } from "@funk/ui/core/identity/stubs"
import {
  construct,
  ManagedContentEditorService,
} from "@funk/ui/core/admin/managed-content/editor/service"
import { construct as constructListenById } from
  "@funk/ui/plugins/persistence/behaviors/listen-by-id"
import { GetById } from "@funk/ui/plugins/persistence/behaviors/get-by-id"
import { construct as constructSetById } from "@funk/ui/plugins/persistence/behaviors/set-by-id"
import { construct as constructUpdateById } from
  "@funk/ui/plugins/persistence/behaviors/update-by-id"
import { construct as constructGetInnerText } from "@funk/ui/helpers/html/get-inner-text"
import { asPromise } from "@funk/helpers/as-promise"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { UserRole } from "@funk/model/auth/user-role"
import { subHours } from "date-fns"
import { when } from "jest-when"
import { Dictionary } from "lodash"
import { of } from "rxjs"
import { AlertController } from "@ionic/angular"

describe("ManagedContentEditorService", () =>
{
  let userSession: UserSession
  let listenById: ReturnType<typeof constructListenById>
  let getById: GetById
  let setById: ReturnType<typeof constructSetById>
  let updateById: ReturnType<typeof constructUpdateById>
  let getInnerText: ReturnType<typeof constructGetInnerText>
  let alertController: AlertController

  it("should manage content for the first time", async () =>
  {
    const service = newService()
    const getActiveContentValueControl = async () =>
      await asPromise(service.activeContentValueControl)

    await service.manageContent("content-2")

    expect(await getActiveContentValueControl()).toEqual(
      expect.objectContaining({ value: "Test 2" })
    )
  })

  it("should manage content for the second time", async () =>
  {
    const service = newService()
    const getActiveContentValueControl = async () =>
      await asPromise(service.activeContentValueControl)

    await service.manageContent("content-1")

    expect((await getActiveContentValueControl())?.value).toEqual("Test 1 preview saved")
  })

  it("should save managed content", async () =>
  {
    const service = newService()
    await service.manageContent("content-1")
    const activeContentValueControl = await asPromise(service.activeContentValueControl)
    activeContentValueControl?.setValue("Test 1 preview")

    await service.saveAndClearIfEditing()

    const clearedActiveContentValueControl =
      await asPromise(service.activeContentValueControl)
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
      })
    )
  })

  it("should ask the user to confirm before publishing all previews", async () =>
  {
    const service = newService()

    await service.maybePublishAll()

    expect(alertController.create).toHaveBeenCalled()
  })

  it("should publish all previews", async () =>
  {
    const FAKE_USER_STATES = createFakeUserStates("content-1")
    const service = newService()

    await service.publishAll(
      FAKE_USER_STATES[FAKE_USER_UID].contentPreviews!,
      { id: FAKE_USER_UID }
    )

    expect(setById).toHaveBeenCalledTimes(1)
    expect(setById).toHaveBeenCalledWith(
      CONTENTS,
      "content-1",
      createFakeUserStates("content-1")[FAKE_USER_UID].contentPreviews?.["content-1"].content
    )
    expect(updateById).toHaveBeenCalledTimes(1)
    expect(updateById).toHaveBeenCalledWith(
      USER_STATES, FAKE_USER_UID, { contentPreviews: {} }
    )
  })

  it("should not publish all previews if the user is not an admin", async () =>
  {
    userSession = of({ auth: { claims: { role: UserRole.PUBLIC } } }) as UserSession
    const service = newService()

    await service.maybePublishAll()

    expect(alertController.create).not.toHaveBeenCalled()
  })

  it("should not publish if the content has been edited since the preview was created",
    async () =>
    {
      const FAKE_USER_STATES = createFakeUserStates("content-with-publish-conflict")
      when(listenById as jest.Mock)
        .calledWith(USER_STATES)
        .mockReturnValueOnce(of(FAKE_USER_STATES[FAKE_USER_UID]))
      when(getById as jest.Mock)
        .calledWith(USER_STATES)
        .mockReturnValueOnce(Promise.resolve(FAKE_USER_STATES[FAKE_USER_UID]))
      const service = newService()

      await service.publishAll(
        FAKE_USER_STATES[FAKE_USER_UID].contentPreviews!,
        { id: FAKE_USER_UID }
      )
      const contentsUpdatedAfterPreview = await asPromise(
        service.contentsUpdatedAfterPreview)
      const contentIdUpdatedAfterPreview = contentsUpdatedAfterPreview[0][1].id

      expect(setById).not.toHaveBeenCalled()
      expect(updateById).not.toHaveBeenCalledWith()
      expect(contentIdUpdatedAfterPreview).toBe("content-with-publish-conflict")
    })

  it("should publish one preview, regardless of publish conflict",
    async () =>
    {
      const service = newService()

      await service.publishOne("content-1")

      expect(setById).toHaveBeenCalledTimes(1)
      expect(setById).toHaveBeenCalledWith(
        CONTENTS,
        "content-1",
        createFakeUserStates("content-1")[FAKE_USER_UID].contentPreviews?.["content-1"].content
      )
      expect(updateById).toHaveBeenCalledTimes(1)
      expect(updateById).toHaveBeenCalledWith(
        USER_STATES, FAKE_USER_UID, { contentPreviews: {} }
      )
    })

  it("should not publish one preview if the user is not an admin", async () =>
  {
    userSession = of({ auth: { claims: { role: UserRole.PUBLIC } } }) as UserSession
    const service = newService()

    await service.publishOne("content-1")

    expect(setById).not.toHaveBeenCalled()
    expect(updateById).not.toHaveBeenCalledWith()
  })

  it("should remove a preview", async () =>
  {
    const service = newService()

    await service.removePreview("content-1")

    expect(getById).toHaveBeenCalledWith(
      USER_STATES,
      FAKE_USER_UID
    )
    expect(updateById).toHaveBeenCalledWith(
      USER_STATES,
      FAKE_USER_UID,
      { contentPreviews: {} }
    )
  })

  it("should ask the user to confirm before removing all previews", async () =>
  {
    const service = newService()

    await service.maybeRemoveAllPreviews()

    expect(alertController.create).toHaveBeenCalled()
  })

  it("should remove all previews", async () =>
  {
    const service = newService()

    await service.removeAllPreviews()

    expect(updateById).toHaveBeenCalledWith(
      USER_STATES, FAKE_USER_UID, { contentPreviews: {} }
    )
    expect(service.contentsUpdatedAfterPreview.getValue()).toEqual([])
  })

  beforeEach(() =>
  {
    userSession = of({
      auth: { claims: { role: UserRole.ADMINISTRATOR } },
      person: { id: FAKE_USER_UID },
    }) as UserSession
    getById = jest.fn()
    listenById = jest.fn()
    setById = jest.fn()
    updateById = jest.fn()
    getInnerText = (htmlString: string) => htmlString
    alertController = {
      create: jest.fn().mockReturnValue({ present: jest.fn() }),
      dismiss: jest.fn(),
    } as Partial<AlertController> as AlertController

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
      .mockReturnValue(Promise.resolve(FAKE_CONTENTS["content-with-publish-conflict"]))
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

  function newService(): ManagedContentEditorService
  {
    return construct(
      userSession, listenById, getById, setById, updateById, getInnerText, alertController, of(961)
    )
  }
})

const FAKE_CONTENTS: Dictionary<ManagedContent> = {
  "content-1": {
    id: "content-1",
    value: "Test 1",
    type: ManagedContentType.TEXT,
    updatedAt: subHours(new Date(), 1).getTime(),
  },
  "content-2": {
    id: "content-2",
    value: "Test 2",
    type: ManagedContentType.TEXT,
    updatedAt: subHours(new Date(), 1).getTime(),
  },
  "html-content": {
    id: "content-2",
    value: "<p>HTML <b>content</b></p>",
    type: ManagedContentType.HTML,
    updatedAt: subHours(new Date(), 1).getTime(),
  },
  "content-with-publish-conflict": {
    id: "content-with-publish-conflict",
    value: "Test With PublishConflict",
    type: ManagedContentType.TEXT,
    updatedAt: new Date().getTime(),
  },
}

const createFakeUserStates = (contentIdPreviewing = "content-1"): {
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
        } as ManagedText,
      },
    },
  },
})
