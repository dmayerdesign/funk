import { CONTENTS } from '@funk/model/admin/content/content'
import { USER_STATES } from '@funk/model/identity/user-state'
import { IdentityApiStub, USER_UID_STUB } from '@funk/ui/core/identity/stubs'
import { PersistenceApiStub } from '@funk/ui/core/persistence/stubs'
import { ManagedContentEditorService } from '@funk/ui/web/app/admin/managed-content/editor/service'
import { first } from 'rxjs/operators'

const createPersistenceApiStub = () =>
  new PersistenceApiStub({
    [CONTENTS]: {
      'content-1': {
        value: 'Test 1',
      },
      'content-2': {
        value: 'Test 2',
      },
    },
    [USER_STATES]: {
      [USER_UID_STUB]: {
        id: USER_UID_STUB,
        contentPreviews: {
          'content-1': {
            value: 'Test 1 preview saved',
          },
        },
      },
    },
  })

describe('ManagedContentEditorService', () =>
{
  it('should manage content for the first time', async (done) =>
  {
    const service = new ManagedContentEditorService(
      createPersistenceApiStub(),
      new IdentityApiStub(),
    )

    service.manageContent('content-2')
    const activeContentValueControl = await service.activeContentValueControl
      .pipe(first())
      .toPromise()

    expect(activeContentValueControl).toBe(undefined)
    done()
  })

  it('should save a preview if one does not exist', async (done) =>
  {
    const persistenceApiStub = createPersistenceApiStub()
    const service = new ManagedContentEditorService(
      persistenceApiStub,
      new IdentityApiStub(),
    )
    spyOn(persistenceApiStub, 'setById').and.callThrough()

    service.manageContent('content-2')
    await service.activeContentValueControl
      .pipe(first())
      .toPromise()

    expect(persistenceApiStub.setById).toHaveBeenCalledTimes(1)
    expect(persistenceApiStub.setById).toHaveBeenCalledWith(
      USER_STATES,
      `${USER_UID_STUB}.contentPreviews.content-2`,
      { value: 'Test 2' },
    )
    done()
  })

  it('should save managed content', async (done) =>
  {
    const persistenceApiStub = createPersistenceApiStub()
    const service = new ManagedContentEditorService(
      persistenceApiStub,
      new IdentityApiStub(),
    )
    spyOn(persistenceApiStub, 'updateById').and.callThrough()

    service.manageContent('content-1')
    const activeContentValueControl = await service.activeContentValueControl
      .pipe(first())
      .toPromise()
    activeContentValueControl?.setValue('Test 1 preview')
    await service.saveAndClearIfEditing()
    const clearedActiveContentValueControl = await service.activeContentValueControl
      .pipe(first())
      .toPromise()

    expect(clearedActiveContentValueControl).toBe(undefined)
    expect(persistenceApiStub.updateById).toHaveBeenCalledTimes(1)
    expect(persistenceApiStub.updateById).toHaveBeenCalledWith(
      USER_STATES,
      `${USER_UID_STUB}.contentPreviews.content-1`,
      { value: 'Test 1 preview' },
    )
    done()
  })

  it('should manage content for the second time', async (done) =>
  {
    const service = new ManagedContentEditorService(
      createPersistenceApiStub(),
      new IdentityApiStub(),
    )

    service.manageContent('content-1')

    const activeContentValueControl = await service.activeContentValueControl
      .pipe(first())
      .toPromise()
    expect(activeContentValueControl?.value).toEqual('Test 1 preview saved')
    done()
  })

  it('should publish managed content', async (done) =>
  {
    const persistenceApiStub = createPersistenceApiStub()
    const service = new ManagedContentEditorService(
      persistenceApiStub,
      new IdentityApiStub(),
    )
    spyOn(persistenceApiStub, 'updateById').and.callThrough()

    await service.maybePublish()

    expect(persistenceApiStub.updateById).toHaveBeenCalledTimes(1)
    expect(persistenceApiStub.updateById).toHaveBeenCalledWith(
      CONTENTS,
      'content-1',
      { value: 'Test 1 preview saved' },
    )
    done()
  })
})
