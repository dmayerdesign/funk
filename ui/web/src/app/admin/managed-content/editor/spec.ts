import { USER_STATES } from "@funk/model/identity/user-state"
import { CONTENTS } from "@funk/model/managed-content/managed-content"
import { IdentityStub, USER_UID_STUB } from "@funk/ui/core/identity/stubs"
import { ManagedContentEditorService } from "@funk/ui/web/app/admin/managed-content/editor/service"
import { Identity } from "@funk/ui/core/identity/interface"
import { construct as constructListenById } from "@funk/plugins/persistence/actions/listen-by-id"
import { construct as constructGetById } from "@funk/plugins/persistence/actions/get-by-id"
import { construct as constructSetById } from "@funk/plugins/persistence/actions/set-by-id"
import { construct as constructUpdateById } from "@funk/plugins/persistence/actions/update-by-id"
import { when } from "jest-when"
import { of } from "rxjs"
import { asPromise } from "@funk/helpers/as-promise"

describe("ManagedContentEditorService", () =>
{
  let identity: Identity
  let listenById: ReturnType<typeof constructListenById>
  let getById: ReturnType<typeof constructGetById>
  let setById: ReturnType<typeof constructSetById>
  let updateById: ReturnType<typeof constructUpdateById>

  it("should manage content for the first time", async (done) =>
  {
    const service = new ManagedContentEditorService(
      identity, listenById, getById, setById, updateById
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
      identity, listenById, getById, setById, updateById
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
      identity, listenById, getById, setById, updateById
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
      USER_UID_STUB,
      { contentPreviews: { "content-1": { value: "Test 1 preview" } } }
    )
    done()
  })

  it("should publish managed content", async (done) =>
  {
    const service = new ManagedContentEditorService(
      identity, listenById, getById, setById, updateById
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
      USER_STATES, USER_UID_STUB, { contentPreviews: {} }
    )
    done()
  })

  beforeEach(() =>
  {
    identity = new IdentityStub()
    listenById = jest.fn()
    getById = jest.fn()
    setById = jest.fn()
    updateById = jest.fn()

    when(getById as unknown as jest.SpiedFunction<typeof getById>)
      .calledWith(USER_STATES, expect.any(String))
      .mockReturnValue(Promise.resolve(FAKE_USER_STATES[USER_UID_STUB]))
    when(listenById as unknown as jest.SpiedFunction<typeof listenById>)
      .calledWith(USER_STATES, expect.any(String))
      .mockReturnValue(of(FAKE_USER_STATES[USER_UID_STUB]))
    when(listenById as unknown as jest.SpiedFunction<typeof listenById>)
      .calledWith(CONTENTS, "content-1")
      .mockReturnValue(of(FAKE_CONTENTS["content-1"]))
    when(listenById as unknown as jest.SpiedFunction<typeof listenById>)
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
  [USER_UID_STUB]: {
    id: USER_UID_STUB,
    contentPreviews: {
      "content-1": {
        value: "Test 1 preview saved",
      },
    },
  },
}
