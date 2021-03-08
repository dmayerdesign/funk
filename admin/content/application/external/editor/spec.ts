describe("ContentEditorService", () => {
  it("test is not implemented", () => {
    expect(true).toBeTruthy()
  })
})
// import { GetById as GetContentById } from "@funk/admin/content/application/external/behaviors/persistence/get-by-id"
// import { ListenById as ListenByIdForContent } from "@funk/admin/content/application/external/behaviors/persistence/listen-by-id"
// import { SetById as SetContentById } from "@funk/admin/content/application/external/behaviors/persistence/set-by-id"
// import { UpdateById as UpdateContentPreviewById } from "@funk/admin/content/application/external/behaviors/persistence/update-by-id"
// import { GetMaybeActiveContentValueControl } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-value-control"
// import {
//   construct as constructOpenEditor,
//   OpenEditor,
// } from "@funk/admin/content/application/external/editor/behaviors/open-editor"
// import {
//   Content,
//   CONTENTS,
//   ContentType,
//   ManagedText,
// } from "@funk/admin/content/model/content"
// import { ContentPreview } from "@funk/admin/content/model/content-preview"
// import { ListenById as ListenForContentPreviewById } from "@funk/admin/content/preview/application/external/behaviors/persistence/listen-by-id"
// import { UserRole } from "@funk/auth/model/user-role"
// import { asPromise } from "@funk/helpers/as-promise"
// import { shareReplayOnce } from "@funk/helpers/rxjs-shims"
// import { FAKE_USER_UID } from "@funk/identity/application/external/stubs"
// import { UserSession } from "@funk/identity/application/external/user-session"
// import { UserState, USER_STATES } from "@funk/identity/model/user-state"
// import { GetById as GetUserStateById } from "@funk/identity/user-state/application/external/behaviors/persistence/get-by-id"
// import { ListenById as ListenForUserStateById } from "@funk/identity/user-state/application/external/behaviors/persistence/listen-by-id"
// import { UpdateById as UpdateUserStateById } from "@funk/identity/user-state/application/external/behaviors/persistence/update-by-id"
// import { PrimaryKey } from "@funk/persistence/model/primary-key"
// import { DomGetInnerText } from "@funk/ui/infrastructure/external/helpers/dom/get-inner-text"
// import { DeviceWidth } from "@funk/ui/plugins/external/layout/device-width"
// import { AlertController } from "@ionic/angular"
// import { subHours } from "date-fns"
// import { when } from "jest-when"
// import { Dictionary } from "lodash"
// import { of } from "rxjs"
// import { GetMaybeActiveContent } from "./behaviors/get-maybe-active-content"
// import { GetMaybeActiveContentId } from "./behaviors/get-maybe-active-content-id"
// import { GetMaybeActiveContentValue } from "./behaviors/get-maybe-active-content-value"

// describe("ContentEditorService", () => {
//   let alertController: AlertController
//   let deviceWidth: DeviceWidth
//   let userSession: UserSession
//   let getInnerText: DomGetInnerText
//   let getContentById: GetContentById
//   let listenByIdForContent: ListenByIdForContent
//   let listenForContentPreviewById: ListenForContentPreviewById
//   let setContentById: SetContentById
//   let updateContentPreviewById: UpdateContentPreviewById
//   let getUserStateById: GetUserStateById
//   let listenForUserStateById: ListenForUserStateById
//   let updateUserStateById: UpdateUserStateById
//   let getMaybeActiveContent: GetMaybeActiveContent
//   let getMaybeActiveContentValue: GetMaybeActiveContentValue
//   let getMaybeActiveContentValueControl: GetMaybeActiveContentValueControl
//   let getMaybeActiveContentId: GetMaybeActiveContentId

//   let openEditor: OpenEditor

//   beforeEach(() => {
//     const FAKE_USER_STATES = createFakeUserStates()
//     alertController = ({
//       create: jest.fn().mockReturnValue({ present: jest.fn() }),
//       dismiss: jest.fn(),
//     } as Partial<AlertController>) as AlertController
//     deviceWidth = of(1400).pipe(shareReplayOnce())
//     userSession = of({
//       auth: { claims: { role: UserRole.ADMINISTRATOR } },
//       person: { id: FAKE_USER_UID },
//     }) as UserSession
//     getInnerText = jest
//       .fn()
//       .mockImplementation((htmlString: string) => htmlString)
//     getContentById = jest
//       .fn()
//       .mockImplementation(
//         async (contentId: PrimaryKey) => FAKE_CONTENTS[contentId],
//       )
//     listenByIdForContent = jest
//       .fn()
//       .mockImplementation((userStateId: PrimaryKey) =>
//         of(FAKE_CONTENTS[userStateId]),
//       )
//     listenForContentPreviewById = jest
//       .fn()
//       .mockImplementation((contentPreviewId: PrimaryKey) =>
//         of(
//           FAKE_USER_STATES[FAKE_USER_UID]?.contentPreviews?.[contentPreviewId],
//         ),
//       )
//     setContentById = jest.fn().mockImplementation(async () => {})
//     updateContentPreviewById = jest.fn().mockImplementation(async () => {})
//     getUserStateById = jest
//       .fn()
//       .mockImplementation(
//         async (userStateId: PrimaryKey) => FAKE_USER_STATES[userStateId],
//       )
//     listenForUserStateById = jest
//       .fn()
//       .mockImplementation((userStateId: PrimaryKey) =>
//         of(FAKE_USER_STATES[userStateId]),
//       )
//     updateUserStateById = jest.fn().mockImplementation(async () => {})
//     getMaybeActiveContentId = jest.fn()

//     when(listenByIdForContent as jest.Mock)
//       .calledWith("content-1")
//       .mockReturnValue(of(FAKE_CONTENTS["content-1"]))
//     when(listenByIdForContent as jest.Mock)
//       .calledWith("content-2")
//       .mockReturnValue(of(FAKE_CONTENTS["content-2"]))
//     when(listenByIdForContent as jest.Mock)
//       .calledWith("content-with-publish-conflict")
//       .mockReturnValue(of(FAKE_CONTENTS["content-with-publish-conflict"]))
//   })

//   it("should edit content for the first time", async () => {
//     openEditor = constructOpenEditor(getMaybeActiveContentId, getIsAuthorized)
//     await openEditor("content-2")

//     expect(await asPromise(getMaybeActiveContentValueControl())).toEqual(
//       expect.objectContaining({ value: "Test 2" }),
//     )
//   })

//   it("should edit content for the second time", async () => {
//     const service = newService()
//     const getActiveContentValueControl = async () =>
//       await asPromise(service.getMaybeActiveContentValueControl())

//     await service.openEditor("content-1")

//     expect((await getActiveContentValueControl())?.value).toEqual(
//       "Test 1 preview saved",
//     )
//   })

//   it("should save edited content", async () => {
//     const service = newService()
//     await service.openEditor("content-1")
//     const activeContentValueControl = await asPromise(
//       service.getMaybeActiveContentValueControl(),
//     )
//     activeContentValueControl?.setValue("Test 1 preview")

//     await service.saveAndClearIfEditing()

//     const clearedActiveContentValueControl = await asPromise(
//       service.getMaybeActiveContentValueControl(),
//     )
//     expect(clearedActiveContentValueControl).toBe(undefined)
//     expect(updateById).toHaveBeenCalledTimes(1)
//     expect(updateById).toHaveBeenCalledWith(
//       USER_STATES,
//       FAKE_USER_UID,
//       expect.objectContaining({
//         "contentPreviews.content-1.content": {
//           id: FAKE_CONTENTS["content-1"].id,
//           type: FAKE_CONTENTS["content-1"].type,
//           value: FAKE_CONTENTS["content-1"].value + " preview",
//         },
//       }),
//     )
//   })

//   it("should ask the user to confirm before publishing all previews", async () => {
//     const service = newService()

//     await service.publishAllOnConfirmation()

//     expect(alertController.create).toHaveBeenCalled()
//   })

//   it("should publish all previews", async () => {
//     const FAKE_USER_STATES = createFakeUserStates("content-1")
//     const service = newService()

//     await service.publishAll(FAKE_USER_STATES[FAKE_USER_UID].contentPreviews!, {
//       id: FAKE_USER_UID,
//     })

//     expect(setById).toHaveBeenCalledTimes(1)
//     expect(setById).toHaveBeenCalledWith(
//       CONTENTS,
//       "content-1",
//       createFakeUserStates("content-1")[FAKE_USER_UID].contentPreviews?.[
//         "content-1"
//       ].content,
//     )
//     expect(updateById).toHaveBeenCalledTimes(1)
//     expect(updateById).toHaveBeenCalledWith(USER_STATES, FAKE_USER_UID, {
//       contentPreviews: {},
//     })
//   })

//   it("should not publish all previews if the user is not an admin", async () => {
//     userSession = of({
//       auth: { claims: { role: UserRole.PUBLIC } },
//     }) as UserSession
//     const service = newService()

//     await service.publishAllOnConfirmation()

//     expect(alertController.create).not.toHaveBeenCalled()
//   })

//   it("should not publish if the content has been edited since the preview was created", async () => {
//     const FAKE_USER_STATES = createFakeUserStates(
//       "content-with-publish-conflict",
//     )
//     when(listenById as jest.Mock)
//       .calledWith(USER_STATES)
//       .mockReturnValueOnce(of(FAKE_USER_STATES[FAKE_USER_UID]))
//     when(getById as jest.Mock)
//       .calledWith(USER_STATES)
//       .mockReturnValueOnce(Promise.resolve(FAKE_USER_STATES[FAKE_USER_UID]))
//     const service = newService()

//     await service.publishAll(FAKE_USER_STATES[FAKE_USER_UID].contentPreviews!, {
//       id: FAKE_USER_UID,
//     })
//     const publishConflicts = await asPromise(service.getPublishConflicts())
//     const contentIdUpdatedAfterPreview = publishConflicts[0][1].id

//     expect(setById).not.toHaveBeenCalled()
//     expect(updateById).not.toHaveBeenCalledWith()
//     expect(contentIdUpdatedAfterPreview).toBe("content-with-publish-conflict")
//   })

//   it("should publish one preview, regardless of publish conflict", async () => {
//     const service = newService()

//     await service.publishOne("content-1")

//     expect(setById).toHaveBeenCalledTimes(1)
//     expect(setById).toHaveBeenCalledWith(
//       CONTENTS,
//       "content-1",
//       createFakeUserStates("content-1")[FAKE_USER_UID].contentPreviews?.[
//         "content-1"
//       ].content,
//     )
//     expect(updateById).toHaveBeenCalledTimes(1)
//     expect(updateById).toHaveBeenCalledWith(USER_STATES, FAKE_USER_UID, {
//       contentPreviews: {},
//     })
//   })

//   it("should not publish one preview if the user is not an admin", async () => {
//     userSession = of({
//       auth: { claims: { role: UserRole.PUBLIC } },
//     }) as UserSession
//     const service = newService()

//     await service.publishOne("content-1")

//     expect(setById).not.toHaveBeenCalled()
//     expect(updateById).not.toHaveBeenCalledWith()
//   })

//   it("should remove a preview", async () => {
//     const service = newService()

//     await service.removePreview("content-1")

//     expect(getById).toHaveBeenCalledWith(USER_STATES, FAKE_USER_UID)
//     expect(updateById).toHaveBeenCalledWith(USER_STATES, FAKE_USER_UID, {
//       contentPreviews: {},
//     })
//   })

//   it("should ask the user to confirm before removing all previews", async () => {
//     const service = newService()

//     await service.removeAllPreviewsOnConfirmation()

//     expect(alertController.create).toHaveBeenCalled()
//   })

//   it("should remove all previews", async () => {
//     const service = newService()

//     await service.removeAllPreviews()

//     expect(updateUserStateById).toHaveBeenCalledWith(FAKE_USER_UID, {
//       contentPreviews: {},
//     })
//     expect(service.getPublishConflicts().getValue()).toEqual([])
//   })
// })

// const FAKE_CONTENTS: Dictionary<Content> = {
//   "content-1": {
//     id: "content-1",
//     value: "Test 1",
//     type: ContentType.TEXT,
//     updatedAt: subHours(new Date(), 1).getTime(),
//   },
//   "content-2": {
//     id: "content-2",
//     value: "Test 2",
//     type: ContentType.TEXT,
//     updatedAt: subHours(new Date(), 1).getTime(),
//   },
//   "html-content": {
//     id: "content-2",
//     value: "<p>HTML <b>content</b></p>",
//     type: ContentType.HTML,
//     updatedAt: subHours(new Date(), 1).getTime(),
//   },
//   "content-with-publish-conflict": {
//     id: "content-with-publish-conflict",
//     value: "Test With PublishConflict",
//     type: ContentType.TEXT,
//     updatedAt: new Date().getTime(),
//   },
// }

// const createFakeUserStates = (
//   contentIdPreviewing = "content-1",
// ): {
//   [id: string]: UserState
// } => ({
//   [FAKE_USER_UID]: {
//     id: FAKE_USER_UID,
//     contentPreviews: {
//       [contentIdPreviewing]: {
//         createdAt: subHours(new Date(), 1).getTime(),
//         content: {
//           ...FAKE_CONTENTS[contentIdPreviewing],
//           value: FAKE_CONTENTS[contentIdPreviewing].value + " preview saved",
//         } as ManagedText,
//       } as ContentPreview,
//     },
//   },
// })
