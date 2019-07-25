import { Entity } from '../data-access/entity'
import { Diff } from '../diff/diff'
import { RequestMethod } from '../http/request-method'
import { DomainEventVerb } from './domain-event-verb'

export interface DomainEvent extends Entity {
    verb: DomainEventVerb
    httpVerb?: RequestMethod
    httpRequest?: any
    httpResponse?: any
    diff: Diff
}
