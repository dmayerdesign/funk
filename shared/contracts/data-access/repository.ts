import { PrimaryKey } from './primary-key'
import { ListRequest } from './requests/list.request'
import { UpdateManyRequest } from './requests/update-many.request'
import { UpdateRequest } from './requests/update.request'

export type InclusivePartial<Type> = Partial<Type> & Partial<Type>

export interface BaseRepository<EntityType extends any> {
  get(primaryKey: PrimaryKey): Promise<EntityType | undefined>

  list(listRequest: ListRequest<EntityType>): Promise<EntityType[]>

  insertMany(body: Partial<EntityType>[]): Promise<any>

  insert(body: Partial<EntityType>): Promise<any>

  updateMany(updateManyRequest: UpdateManyRequest<EntityType>): Promise<any>

  update(updateRequest: UpdateRequest<EntityType>): Promise<any>

  deleteMany(primaryKeys: (PrimaryKey)[]): Promise<any>

  delete(primaryKey: PrimaryKey): Promise<any>
}

export interface Repository<EntityType> extends BaseRepository<EntityType> {
}

export interface ThirdPartyRepository<EntityType> extends BaseRepository<EntityType> { }

export interface ReadOnlyRepository<EntityType> {
  list(listRequest: ListRequest<EntityType>): Promise<EntityType[]>
  get?(primaryKey: string): Promise<EntityType>
}
