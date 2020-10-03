import { InjectionToken } from "@angular/core"
import { TURING_TEST_PUBLISHABLE_KEY } from "@funk/configuration"
import { load } from "recaptcha-v3"

export function construct(
  initializeTuringTest = load
)
{
  return async function(): Promise<string>
  {
    const turingTest = await initializeTuringTest(
      TURING_TEST_PUBLISHABLE_KEY,
      { useRecaptchaNet: true }
    )
    return await turingTest.execute("submit")
  }
}

export type GetToken = ReturnType<typeof construct>

export const GET_TOKEN = new InjectionToken("GET_TOKEN")
export const INITIALIZE_TURING_TEST = new InjectionToken("INITIALIZE_TURING_TEST")
