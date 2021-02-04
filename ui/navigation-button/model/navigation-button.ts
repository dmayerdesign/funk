export interface RouterNavigationButton {
  text: string
  /** @required */
  routerLink: string[]
  children?: RouterNavigationButton[]
}

export interface ExternalNavigationButton {
  text: string
  /** @required */
  externalLink: string[]
  children?: ExternalNavigationButton[]
}

export type NavigationButton = RouterNavigationButton | ExternalNavigationButton
