import { DatabaseDocument } from "@funk/model/data-access/database-document"

interface DocumentSnapshotExtras {
  ref: any
  readTime: any
}

/**
 * Copied from {@link @google-cloud/types/firestore/firestore.d.ts}
 * and modified slightly.
 *
 *
 * A `DocumentSnapshot` contains data read from a document in your Firestore
 * database. The data can be extracted with `.data()` or `.get(<field>)` to
 * get a specific field.
 *
 * For a `DocumentSnapshot` that points to a non-existing document, any data
 * access will return 'undefined'. You can use the `exists` property to
 * explicitly verify a document's existence.
 */
export interface DocumentSnapshot<
  DocumentType extends { [key: string]: any } = DatabaseDocument
>
  extends DocumentSnapshotExtras
{

  /** True if the document exists. */
  readonly exists: boolean

  /** A `DocumentReference` to the document location. */
  // readonly ref: DocumentReference

  /**
   * The ID of the document for which this `DocumentSnapshot` contains data.
   */
  readonly id: string

  /**
   * The time the document was created. Not set for documents that don't
   * exist.
   */
  // readonly createTime?: Timestamp

  /**
   * The time the document was last updated (at the time the snapshot was
   * generated). Not set for documents that don't exist.
   */
  // readonly updateTime?: Timestamp

  /**
   * The time this snapshot was read.
   */
  // readonly readTime: Timestamp

  /**
   * Retrieves all fields in the document as an Object. Returns 'undefined' if
   * the document doesn't exist.
   *
   * @return An Object containing all fields in the document.
   */
  data(): DocumentType | undefined

  /**
   * Retrieves the field specified by `fieldPath`.
   *
   * @param fieldPath The path (e.g. 'foo' or 'foo.bar') to a specific field.
   * @return The data at the specified field location or undefined if no such
   * field exists in the document.
   */
  get(fieldPath: string): any

  /**
   * Returns true if the document's data and path in this `DocumentSnapshot`
   * is equal to the provided one.
   *
   * @param other The `DocumentSnapshot` to compare against.
   * @return true if this `DocumentSnapshot` is equal to the provided one.
   */
  isEqual(other: DocumentSnapshot<DocumentType>): boolean
}
