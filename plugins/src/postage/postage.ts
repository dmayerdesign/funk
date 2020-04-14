import { Postage as IPostage } from '@funk/plugins-interface/postage/postage'
import { EasypostRate } from './details/easypost-rate'

export interface Postage extends IPostage
{
  providerData: EasypostRate
}
