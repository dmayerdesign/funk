export interface NavigationItem {
  text: string
  routerLink: string[]
  children?: NavigationItem[]
}
