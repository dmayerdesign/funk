import { Injectable } from "@angular/core"

@Injectable({ providedIn: "root" })
export class CacheService {
  public homeTagline: string
  public contact: any
  public about: any
  public cV: any
  public pages = new Map<string, any>()

  constructor() {}
}
