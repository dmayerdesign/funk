import { Entity } from '../data-access/entity'
import { UsabilityExperience } from '../usability-experience/usability-experience'
import { UsabilityTestBucket } from '../usability-test-bucket/usability-test-bucket'

export interface UsabilityTest extends Entity {
    usabilityExperience: UsabilityExperience
    description: string
    buckets: UsabilityTestBucket
}
