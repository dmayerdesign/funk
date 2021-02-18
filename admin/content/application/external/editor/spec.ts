import {
  construct,
  ContentEditorService
} from "@funk/admin/content/application/external/editor/service"
import {
  Content,
  CONTENTS,
  ContentType,
  ManagedText
} from "@funk/admin/content/model/content"
import { ChangeType } from "@funk/admin/content/model/content-preview"
import { UserRole } from "@funk/auth/model/user-role"
import { asPromise } from "@funk/helpers/as-promise"
import { createFakePerson, FAKE_USER_UID } from "@funk/identity/application/external/stubs"
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

  describe("openEditor", () => {
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
  })

  describe("saveAndClearIfEditing", () => {
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
  })

  /*
  publish:
    else:
      shift a mutation to `changes`
      do the publish

  undo/redo preview:
    apply changes[`latestPublishedChangeId` + 1] for undo and changes[`latestPublishedChangeId` - 1] for redo
      to the current value, and set that value as the preview value
    set ContentPreview.isRollback/isRollforward to true
  on the first subsequent update to the preview:
    set ContentPreview.isRollback and ContentPreview.isRollforward to false
  */
  describe("publishAllOnConfirmation", () => {
    it("should ask the user to confirm before publishing all previews", async () => {
      const service = newService()

      await service.publishAllOnConfirmation()

      expect(alertController.create).toHaveBeenCalled()
    })

    it("should not publish all previews if the user is not an admin", async () => {
      userSession = of({
        auth: { claims: { role: UserRole.PUBLIC } },
      }) as UserSession
      const service = newService()

      await service.publishAllOnConfirmation()

      expect(alertController.create).not.toHaveBeenCalled()
    })
  })

  describe("publishAll", () => {
    it("should publish all previews", async () => {
      const FAKE_USER_STATES = createFakeUserStates("content-1")
      const service = newService()

      await service.publishAll(FAKE_USER_STATES[FAKE_USER_UID].contentPreviews!, createFakePerson())

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

    it("should keep track of changes for a rollback", async () => {
      // If `ContentPreview.changeType === ChangeType.ROLLBACK`:
      // Set `latestPublishedChangeId` to its current value + 1 (0 is the most recent).
      const FAKE_USER_STATES = createFakeUserStates(
        "content-being-rolled-back",
        ChangeType.ROLLBACK
      )
      const service = newService()

      await service.publishAll(FAKE_USER_STATES[FAKE_USER_UID].contentPreviews!, createFakePerson())
    })

    it.skip("should keep track of changes for a rollforward", async () => {
      // If `ContentPreview.changeType === ChangeType.ROLLFORWARD`
      // and `ContentState.latestPublishedChangeId !== "0"`:
      // Set the `latestPublishedChangeId` to its current value - 1.
    })

    it.skip("should keep track of changes for a new change", async () => {
      // If `ContentPreview.changeType === ChangeType.NEW`:
      // Add the mutation to the beginning of the `ContentState.changes` list.
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
  })

  describe("publishOne", () => {
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
  })

  describe("removeAllPreviews", () => {
    it("should remove all previews", async () => {
      const service = newService()

      await service.removeAllPreviews()

      expect(updateById).toHaveBeenCalledWith(USER_STATES, FAKE_USER_UID, {
        contentPreviews: {},
      })
      expect(service.getPublishConflicts().getValue()).toEqual([])
    })
  })

  describe("removePreview", () => {
    it("should remove a preview", async () => {
      const service = newService()

      await service.removePreview("content-1")

      expect(getById).toHaveBeenCalledWith(USER_STATES, FAKE_USER_UID)
      expect(updateById).toHaveBeenCalledWith(USER_STATES, FAKE_USER_UID, {
        contentPreviews: {},
      })
    })
  })

  describe("removeAllPreviewsOnConfirmation", () => {
    it("should ask the user to confirm before removing all previews", async () => {
      const service = newService()

      await service.removeAllPreviewsOnConfirmation()

      expect(alertController.create).toHaveBeenCalled()
    })
  })

  beforeEach(() => {
    userSession = of({
      auth: { claims: { role: UserRole.ADMINISTRATOR } },
      person: createFakePerson(),
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
    when(getById as jest.Mock)
      .calledWith(USER_STATES)
      .mockReturnValue(Promise.resolve(FAKE_USER_STATES[FAKE_USER_UID]))
    when(listenById as jest.Mock)
      .calledWith(USER_STATES)
      .mockReturnValue(of(FAKE_USER_STATES[FAKE_USER_UID]))

    when(getById as jest.Mock)
      .calledWith(CONTENTS, expect.any(String))
      .mockImplementation((_collectionName, contentKey) => Promise.resolve(FAKE_CONTENTS[contentKey]))
    when(listenById as jest.Mock)
      .calledWith(CONTENTS, expect.any(String))
      .mockImplementation((_collectionName, contentKey) => of(FAKE_CONTENTS[contentKey]))
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
  contentChangeType = ChangeType.NEW,
): {
  [id: string]: UserState
} => ({
  [FAKE_USER_UID]: {
    id: FAKE_USER_UID,
    contentPreviews: {
      [contentIdPreviewing]: {
        createdAt: subHours(new Date(), 1).getTime(),
        changeType: contentChangeType,
        content: {
          ...FAKE_CONTENTS[contentIdPreviewing],
          value: FAKE_CONTENTS[contentIdPreviewing].value + " preview saved",
        } as ManagedText,
      },
    },
  },
})
