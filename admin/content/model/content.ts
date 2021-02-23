import { ImageGroup } from "@funk/image/model/image-group"
import { DatabaseDocument } from "@funk/persistence/model/database-document"

export interface BaseContent extends DatabaseDocument {}

export interface Text extends BaseContent {
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

export interface Html extends BaseContent {
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

export interface Image extends BaseContent {
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

export interface HtmlBlogPost extends BaseContent {
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
  HTML_BLOG_POST = "HTML_BLOG_POST"
}

export type Content = Text | Html | Image | HtmlBlogPost

export const CONTENTS = "contents"

/*
CRUD a blog post
Editor UI (beacon, etc)

<managed-
*/
