import { InjectionToken } from '@angular/core'
import { Initializer } from '@funk/ui/helpers/angular.helpers'

export interface InitializerFunction
{
  (): Promise<void>
}

export function createModuleInitializer(...initializers: Initializer[]): InitializerFunction
{
  return async function(): Promise<void>
  {
    await Promise.all(initializers.map((initializer) => initializer.init()))
  }
}

export const INITIALIZE_CONTAINER = new InjectionToken<InitializerFunction>(
  'INITIALIZE_CONTAINER'
)
