export const construct: (store: any) => typeof deleteById

export default function deleteById(
  collectionPath: string,
  documentPath: string,
): Promise<void>

export type DeleteById = typeof deleteById
