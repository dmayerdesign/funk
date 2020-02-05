import { Initializer } from '@funk/ui/helpers/angular.helpers'

export function createAppInitializer(...initializers: Initializer[]): () => Promise<void>
{
  return async function(): Promise<void>
  {
    await Promise.all(initializers.map((initializer) => initializer.init()))
  }
}
