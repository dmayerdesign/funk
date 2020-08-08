export interface TuringTestResult {
  success: boolean
  /** Between 0 and 1, 1 indicating certainty that the user is human. */
  score: number
}
