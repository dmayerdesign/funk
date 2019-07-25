import { Entity } from '../data-access/entity'

export interface NavigationItem extends Entity {
  text: string
  routerLink: string[]
  isTopLevel?: boolean
  className?: string
  children?: NavigationItem[]
  onClick?: (event: Event, self: NavigationItem) => void
}
