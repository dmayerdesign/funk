export interface NavigationItem {
  text: string
  /** @required */
  routerLink?: string[]
  children?: NavigationItem[]
}
