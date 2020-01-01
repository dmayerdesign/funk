import { Postage } from '../../interface/postage/postage'
import { EasypostRate } from './details/easypost-rate'

export interface Postage extends Postage
{
  providerData: EasypostRate
}
