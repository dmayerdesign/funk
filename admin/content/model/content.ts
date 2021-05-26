import { ImageGroup } from "@funk/admin/image-group/model/image-group"
import {
  DatabaseDocument,
  RemovedAt,
} from "@funk/persistence/model/database-document"
import { PrimaryKey } from "@funk/persistence/model/primary-key"

// TODO: Rename to `Text`, `Image`, etc. once
// https://github.com/vega/ts-json-schema-generator/pull/667 is released.

export interface ContentText extends DatabaseDocument, RemovedAt {
  type: ContentType.TEXT
  value: string
  i18n?: {
    meaning: string
    defaultLocale: string
    translations: {
      [localeId: string]: any /* ContentText["value"] */
    }
  }
}

export interface ContentHtml extends DatabaseDocument, RemovedAt {
  type: ContentType.HTML
  value: string
  i18n?: {
    meaning: string
    defaultLocale: string
    translations: {
      [localeId: string]: any /* ContentHtml["value"] */
    }
  }
}

export interface ContentImage extends DatabaseDocument, RemovedAt {
  type: ContentType.IMAGE
  value: ImageGroup
  caption?: string
  i18n?: {
    meaning: string
    defaultLocale: string
    translations: {
      [localeId: string]: any /* ContentImage["value"] */
    }
  }
}

export interface ContentHtmlBlogPost extends DatabaseDocument, RemovedAt {
  type: ContentType.HTML_BLOG_POST
  title: string
  subtitle?: string
  /** The HTML post body. */
  value: string
  coverImageGroup: ImageGroup
  taxonomyTerms: PrimaryKey[]
  i18n?: {
    meaning: string
    defaultLocale: string
    translations: {
      [localeId: string]: any /* ContentHtmlBlogPost["value"]*/
    }
  }
}

export enum ContentType {
  TEXT = "TEXT",
  HTML = "HTML",
  IMAGE = "IMAGE",
  HTML_BLOG_POST = "HTML_BLOG_POST",
}

export type Content =
  | ContentText
  | ContentHtml
  | ContentImage
  | ContentHtmlBlogPost

export const CONTENTS = "admin.contents"
