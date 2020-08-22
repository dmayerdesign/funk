export interface RouterNavigationItem {
  text: string
  /** @required */
  routerLink: string[]
  children?: RouterNavigationItem[]
}

export interface ExternalNavigationItem {
  text: string
  /** @required */
  externalLink: string[]
  children?: ExternalNavigationItem[]
}

export type NavigationItem = RouterNavigationItem | ExternalNavigationItem
