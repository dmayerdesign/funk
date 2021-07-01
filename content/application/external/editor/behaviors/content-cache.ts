import { Content } from "@funk/content/model/content"

export const contentCache = new Map<string, Content>()

export type ContentCache = typeof contentCache
