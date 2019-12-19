import { AVATAX_ACCOUNT_ID, TAX_RATE_CALCULATOR_URL } from '@funk/config'
import { AvataxResponse } from '@funk/model/commerce/tax-rate/avatax-response'
import { EncryptedSecret } from '@funk/model/secret/encrypted-secret'
import { TAX_SERVICE_PROVIDER_SECRET_KEY } from '@funk/model/secret/keys'
import axios, { AxiosResponse } from 'axios'
import { firestore } from 'firebase-admin'

export interface Input {
  postalCode: string
}

export type Output = number

export default async function({ postalCode }: Input): Promise<number>
{
  const avataxLicenseKey = await firestore().collection('vault')
    .doc(TAX_SERVICE_PROVIDER_SECRET_KEY).get()
    .then((snapshot) => snapshot.data() as EncryptedSecret)
    .then(({ value }) => value)
  const authString = Buffer.from(`${AVATAX_ACCOUNT_ID}:${avataxLicenseKey}`)
    .toString('base64')
  const authorizationHeader = `Basic ${authString}`
  const taxRateResponse: AxiosResponse<AvataxResponse> = await axios.get(
    TAX_RATE_CALCULATOR_URL + `?country=USA` + `&postalCode=${postalCode}`,
    {
      headers: {
        authorization: authorizationHeader,
      },
    },
  )
  return taxRateResponse.data.totalRate
}
