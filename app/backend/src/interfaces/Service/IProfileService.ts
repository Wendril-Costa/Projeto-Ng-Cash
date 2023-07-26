import { TToken } from '../../types/Token'
import { IProfileModel } from '../Model/IProfileModel'

export interface IProfileService {
  getProfile (token: TToken): Promise<IProfileModel>

}
