import { Change } from 'firebase-functions'
import { EventContext } from './event/context'

export interface ChangeContext extends EventContext
{ }
export { Change }
