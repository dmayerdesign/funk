import { Injectable } from "@angular/core"
import { Plugins } from "@capacitor/core"
import { DeviceStorage } from "@funk/ui/core/device-storage/interface"
import { Initializer } from "@funk/ui/helpers/initializer"
import { orderBy, values } from "lodash"
import { BehaviorSubject, Observable } from "rxjs"
import { first, map } from "rxjs/operators"

const { Storage } = Plugins

@Injectable()
export class DeviceStorageApi implements DeviceStorage, Initializer
{
  private _data = new BehaviorSubject<{ [key: string]: string | undefined }>({})

  public async init(): Promise<void>
  {
    await this._loadFromStorage()
  }

  public list<DocumentType extends object>(
    collectionPath: string,
    paginationOptions?: {
      orderBy: keyof DocumentType & string
      orderByDirection: "asc" | "desc"
      startAt: DocumentType[keyof DocumentType]
    }
  ): Promise<DocumentType[]>
  {
    if (!!paginationOptions?.startAt)
    {
      console.warn("paginationOptions.startAt is not supported in the DeviceStorageApi.")
    }
    if (paginationOptions)
    {
      return this._data.pipe(first()).toPromise()
        .then((data) => this._deserialize<{ [key: string]: DocumentType }>(data[collectionPath]))
        .then((collection) => orderBy(
          values(collection),
          [ paginationOptions.orderBy ],
          [ paginationOptions.orderByDirection ]))
    }
    return this._data.pipe(first()).toPromise()
      .then((data) => this._deserialize<{ [key: string]: DocumentType }>(data[collectionPath]))
      .then(values)
  }

  public listenById<DocumentType extends object>(
    collectionPath: string,
    documentPath: string
  ): Observable<DocumentType | undefined>
  {
    return this._data.pipe(
      map((data) => this._deserialize<{ [key: string]: DocumentType }>(data[collectionPath])),
      map((collection) => collection[documentPath]))
  }

  public async getById<DocumentType extends object>(
    collectionPath: string,
    documentPath: string
  ): Promise<DocumentType | undefined>
  {
    return this._data.pipe(first()).toPromise()
      .then((data) => this._deserialize<{ [key: string]: DocumentType }>(
        data[collectionPath]))
      .then((collection) => collection[documentPath])
  }

  public async setById<DocumentType extends object>(
    collectionPath: string,
    documentPath: string,
    documentData: DocumentType,
    options?: { overwrite?: boolean }
  ): Promise<void>
  {
    const data = { ...this._data.getValue() }
    const collection = this._deserialize<{ [key: string]: DocumentType }>(
      data[collectionPath])

    if (options?.overwrite)
    {
      collection[documentPath] = documentData
    }
    else
    {
      collection[documentPath] = {
        ...collection[documentPath],
        ...documentData,
      }
    }

    const serializedCollection = JSON.stringify(collection)
    this.upsert(collectionPath, serializedCollection)
  }

  public async updateById<DocumentType extends object>(
    collectionPath: string,
    documentPath: string,
    documentData: Partial<DocumentType>
  ): Promise<void>
  {
    await this.setById(collectionPath, documentPath, documentData)
  }

  public async deleteById(collectionPath: string, documentPath: string): Promise<void>
  {
    const data = { ...this._data.getValue() }
    const collection = this._deserialize<{ [key: string]: DocumentType }>(
      data[collectionPath])
    delete collection[documentPath]
    const serializedCollection = JSON.stringify(collection)
    this.upsert(collectionPath, serializedCollection)
  }

  public async get(key: string): Promise<string | undefined>
  {
    return (await Storage.get({ key }))?.value ?? undefined
  }

  public async upsert(key: string, value: string): Promise<void>
  {
    await Storage.set({ key, value })
    this._loadFromStorage()
  }

  public async delete(key: string): Promise<void>
  {
    await Storage.remove({ key })
    this._loadFromStorage()
  }

  private _deserialize<CollectionOrDocumentType extends object>(
    serializedData: string | undefined): CollectionOrDocumentType
  {
    return JSON.parse(serializedData ?? "")
  }

  private async _loadFromStorage(): Promise<void>
  {
    const data = {} as { [key: string]: string | undefined }
    const { keys } = await Storage.keys()
    for (const key of keys)
    {
      const { value } = await Storage.get({ key })
      data[key] = value ?? undefined
    }
    this._data.next(data)
  }
}
