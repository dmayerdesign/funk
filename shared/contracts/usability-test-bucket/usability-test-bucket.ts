import { UsabilityExperience } from '../usability-experience/usability-experience'

export interface UsabilityTestBucket {
    description: string
    usabilityExperience: UsabilityExperience
    likelihood: number
}
