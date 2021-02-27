import { ImageGroup } from "@funk/image/model/image-group"
import {
  DatabaseDocument,
  RemovedAt,
} from "@funk/persistence/model/database-document"

// TODO: Rename to `Text`, `Image`, etc. once
// https://github.com/vega/ts-json-schema-generator/pull/667 is released.

export interface ContentText extends DatabaseDocument, RemovedAt {
  type: ContentType.TEXT
  value: string
  i18n?: {
    meaning: string
    defaultLocale: string
    translations: {
      [localeId: string]: string
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
      [localeId: string]: string
    }
  }
}

export interface ContentImage extends DatabaseDocument, RemovedAt {
  type: ContentType.IMAGE
  value: ImageGroup
  i18n?: {
    meaning: string
    defaultLocale: string
    translations: {
      [localeId: string]: string
    }
  }
}

export interface ContentHtmlBlogPost extends DatabaseDocument, RemovedAt {
  type: ContentType.HTML_BLOG_POST
  title: string
  subtitle?: string
  /** The HTML post body. */
  value: string
  coverImageUrl: string
  taxonomies: Record<string, string[]>
  i18n?: {
    meaning: string
    defaultLocale: string
    translations: {
      [localeId: string]: string
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

export const CONTENTS = "contents"
