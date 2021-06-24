import { Injectable } from "@angular/core"
import { ContentHtmlBlogPost } from "@funk/content/model/content"

@Injectable({ providedIn: "root" })
export class CacheService {
  public homeTagline?: string
  public contact?: ContentHtmlBlogPost
  public about?: ContentHtmlBlogPost
  public cV?: ContentHtmlBlogPost
  public pages = new Map<string, ContentHtmlBlogPost>()

  public constructor() {}
}
