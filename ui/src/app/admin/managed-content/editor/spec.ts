import { USER_STATES } from "@funk/model/identity/user-state"
import { CONTENTS } from "@funk/model/managed-content/managed-content"
import { FAKE_USER_UID } from "@funk/ui/app/identity/stubs"
import { ManagedContentEditorService } from "@funk/ui/app/admin/managed-content/editor/service"
import { construct as constructListenById } from "@funk/plugins/persistence/actions/listen-by-id"
import { GetById } from "@funk/plugins/persistence/actions/get-by-id"
import { construct as constructSetById } from "@funk/plugins/persistence/actions/set-by-id"
import { construct as constructUpdateById } from "@funk/plugins/persistence/actions/update-by-id"
import { when } from "jest-when"
import { of } from "rxjs"
import { asPromise } from "@funk/helpers/as-promise"
import UserSession from "@funk/ui/app/identity/user-session"
import { UserRole } from "@funk/model/auth/user-role"

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
    expect(setById).toHaveBeenCalledTimes(1)
    expect(setById).toHaveBeenCalledWith(
      USER_STATES,
      FAKE_USER_UID,
      { contentPreviews: { "content-1": { value: "Test 1 preview" } } }
    )
    done()
  })

  it("should publish managed content", async (done) =>
  {
    const service = new ManagedContentEditorService(
      userSession, listenById, getById, setById, updateById
    )

    await service.maybePublish()

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

  it("should not publish content if the user is not an admin", async (done) =>
  {
    userSession = of({ auth: { claims: { role: UserRole.PUBLIC } } }) as UserSession
    const service = new ManagedContentEditorService(
      userSession, listenById, getById, setById, updateById
    )

    await service.maybePublish()

    expect(setById).not.toHaveBeenCalled()
    expect(updateById).not.toHaveBeenCalledWith()
    done()
  })

  beforeEach(() =>
  {
    userSession = of({
      auth: { claims: { role: UserRole.ADMINISTRATOR } },
      person: { id: FAKE_USER_UID },
    }) as UserSession
    getById = jest.fn().mockReturnValue(Promise.resolve(FAKE_USER_STATES[FAKE_USER_UID]))
    listenById = jest.fn()
    setById = jest.fn()
    updateById = jest.fn()

    when(listenById as jest.Mock)
      .calledWith(USER_STATES)
      .mockReturnValue(of(FAKE_USER_STATES[FAKE_USER_UID]))
    when(listenById as jest.Mock)
      .calledWith(CONTENTS, "content-1")
      .mockReturnValue(of(FAKE_CONTENTS["content-1"]))
    when(listenById as jest.Mock)
      .calledWith(CONTENTS, "content-2")
      .mockReturnValue(of(FAKE_CONTENTS["content-2"]))
  })
})

const FAKE_CONTENTS = {
  "content-1": {
    value: "Test 1",
  },
  "content-2": {
    value: "Test 2",
  },
}

const FAKE_USER_STATES = {
  [FAKE_USER_UID]: {
    id: FAKE_USER_UID,
    contentPreviews: {
      "content-1": {
        value: "Test 1 preview saved",
      },
    },
  },
}
