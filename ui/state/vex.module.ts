import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core'
import { createVex, Vex } from './vex'

export const INITIAL_STATE = new InjectionToken<any>('INITIAL_STATE')

@NgModule()
export class VexModule {
  public static forRoot<StateType = unknown>(initialState: StateType): ModuleWithProviders {
    return {
      ngModule: VexModule,
      providers: [
        {
          provide: INITIAL_STATE,
          useValue: initialState
        },
        {
          provide: Vex,
          useFactory: createVex,
          deps: [ INITIAL_STATE ]
        }
      ]
    }
  }
}
