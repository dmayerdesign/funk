export interface Change<DocumentType = object>
{
  type: 'add' | 'update' | 'remove'
  key: keyof DocumentType | '$root'
  value?: any
  oldValue?: any
}
