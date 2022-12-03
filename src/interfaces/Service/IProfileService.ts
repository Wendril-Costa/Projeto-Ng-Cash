import { IProfileModel } from '../Model/IProfileModel'

export interface IProfileService {
  getProfile (token: string | undefined): Promise<IProfileModel>

}
