import { USER_STATES } from "@funk/model/identity/user-state"
import { CONTENTS } from "@funk/model/managed-content/managed-content"
import { FAKE_USER_UID } from "@funk/ui/core/identity/stubs"
import { ManagedContentEditorService } from "@funk/ui/core/admin/managed-content/editor/service"
import { construct as constructListenById } from "@funk/plugins/persistence/actions/listen-by-id"
import { GetById } from "@funk/plugins/persistence/actions/get-by-id"
import { construct as constructSetById } from "@funk/plugins/persistence/actions/set-by-id"
import { construct as constructUpdateById } from "@funk/plugins/persistence/actions/update-by-id"
import { asPromise } from "@funk/helpers/as-promise"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { UserRole } from "@funk/model/auth/user-role"
import { subHours } from "date-fns"
import { when } from "jest-when"
import { of } from "rxjs"

describe("ManagedContentEditorService", () =>
{
  let userSession: UserSession
  let listenById: ReturnType<typeof constructListenById>
  let getById: GetById
  let setById: ReturnType<typeof constructSetById>
  let updateById: ReturnType<typeof constructUpdateById>

  it("should manage content for the first time", async (done) =>
  {
    const service = new ManagedContentEditorService(
      userSession, listenById, getById, setById, updateById
    )
    const getActiveContentValueControl = async () =>
      await asPromise(service.activeContentValueControl)

    service.manageContent("content-2")

    expect(await getActiveContentValueControl()).toEqual(
      expect.objectContaining({ value: "Test 2" })
    )
    done()
  })

  it("should manage content for the second time", async (done) =>
  {
    const service = new ManagedContentEditorService(
      userSession, listenById, getById, setById, updateById
    )
    const getActiveContentValueControl = async () =>
      await asPromise(service.activeContentValueControl)

    service.manageContent("content-1")

    expect((await getActiveContentValueControl())?.value).toEqual("Test 1 preview saved")
    done()
  })

  it("should save managed content", async (done) =>
  {
    const service = new ManagedContentEditorService(
      userSession, listenById, getById, setById, updateById
    )

    service.manageContent("content-1")
    const activeContentValueControl =
      await asPromise(service.activeContentValueControl)
    activeContentValueControl?.setValue("Test 1 preview")
    await service.saveAndClearIfEditing()
    const clearedActiveContentValueControl =
      await asPromise(service.activeContentValueControl)

    expect(clearedActiveContentValueControl).toBe(undefined)
    expect(updateById).toHaveBeenCalledTimes(1)
    expect(updateById).toHaveBeenCalledWith(
      USER_STATES,
      FAKE_USER_UID,
      { "contentPreviews.content-1.content": { value: "Test 1 preview" } }
    )
    done()
  })

  it("should publish all previews", async (done) =>
  {
    const service = new ManagedContentEditorService(
      userSession, listenById, getById, setById, updateById
    )

    await service.maybePublishAll()

    expect(setById).toHaveBeenCalledTimes(1)
    expect(setById).toHaveBeenCalledWith(
      CONTENTS,
      "content-1",
      { value: "Test 1 preview saved" }
    )
    expect(updateById).toHaveBeenCalledTimes(1)
    expect(updateById).toHaveBeenCalledWith(
      USER_STATES, FAKE_USER_UID, { contentPreviews: {} }
    )
    done()
  })

  it("should not publish all previews if the user is not an admin", async (done) =>
  {
    userSession = of({ auth: { claims: { role: UserRole.PUBLIC } } }) as UserSession
    const service = new ManagedContentEditorService(
      userSession, listenById, getById, setById, updateById
    )

    await service.maybePublishAll()

    expect(setById).not.toHaveBeenCalled()
    expect(updateById).not.toHaveBeenCalledWith()
    done()
  })

  it("should not publish if the content has been edited since the preview was created",
    async (done) =>
    {
      const FAKE_USER_STATES = createFakeUserStates("content-with-publish-conflict")
      when(listenById as jest.Mock)
        .calledWith(USER_STATES)
        .mockReturnValueOnce(of(FAKE_USER_STATES[FAKE_USER_UID]))
      when(getById as jest.Mock)
        .calledWith(USER_STATES)
        .mockReturnValueOnce(Promise.resolve(FAKE_USER_STATES[FAKE_USER_UID]))
      const service: ManagedContentEditorService = new ManagedContentEditorService(
        userSession, listenById, getById, setById, updateById
      )

      await service.maybePublishAll()
      const contentsUpdatedAfterPreview = await asPromise(
        service.contentsUpdatedAfterPreview)
      const contentIdUpdatedAfterPreview = contentsUpdatedAfterPreview[0][1].id

      expect(setById).not.toHaveBeenCalled()
      expect(updateById).not.toHaveBeenCalledWith()
      expect(contentIdUpdatedAfterPreview).toBe("content-with-publish-conflict")
      done()
    })

  it("should publish one preview, regardless of publish conflict",
    async (done) =>
    {
      const service: ManagedContentEditorService = new ManagedContentEditorService(
        userSession, listenById, getById, setById, updateById
      )

      await service.publishOne("content-1")

      expect(setById).toHaveBeenCalledTimes(1)
      expect(setById).toHaveBeenCalledWith(
        CONTENTS,
        "content-1",
        { value: "Test 1 preview saved" }
      )
      expect(updateById).toHaveBeenCalledTimes(1)
      expect(updateById).toHaveBeenCalledWith(
        USER_STATES, FAKE_USER_UID, { contentPreviews: {} }
      )
      done()
    })

  it("should not publish one preview if the user is not an admin", async (done) =>
  {
    userSession = of({ auth: { claims: { role: UserRole.PUBLIC } } }) as UserSession
    const service = new ManagedContentEditorService(
      userSession, listenById, getById, setById, updateById
    )

    await service.publishOne("content-1")

    expect(setById).not.toHaveBeenCalled()
    expect(updateById).not.toHaveBeenCalledWith()
    done()
  })

  it("should remove a preview", async (done) =>
  {
    const service = new ManagedContentEditorService(
      userSession, listenById, getById, setById, updateById
    )

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
    done()
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
})

const FAKE_CONTENTS = {
  "content-1": {
    id: "content-1",
    value: "Test 1",
    updatedAt: subHours(new Date(), 1).getTime(),
  },
  "content-2": {
    id: "content-2",
    value: "Test 2",
    updatedAt: subHours(new Date(), 1).getTime(),
  },
  "content-with-publish-conflict": {
    id: "content-with-publish-conflict",
    value: "Test With PublishConflict",
    updatedAt: new Date().getTime(),
  },
}

const createFakeUserStates = (contentIdPreviewing = "content-1") => ({
  [FAKE_USER_UID]: {
    id: FAKE_USER_UID,
    contentPreviews: {
      [contentIdPreviewing]: {
        createdAt: subHours(new Date(), 1).getTime(),
        content: {
          value: "Test 1 preview saved",
        },
      },
    },
  },
})
