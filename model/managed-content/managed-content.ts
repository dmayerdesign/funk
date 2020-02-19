import { DatabaseDocument } from '@funk/model/data-access/database-document'

export interface ManagedContent extends DatabaseDocument
{
  type: ManagedContentType
  value: any
  i18n?: {
    meaning: string
    defaultLocale: string
    translations: {
      [localeId: string]: string
    }
  }
}

export enum ManagedContentType
{
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}
