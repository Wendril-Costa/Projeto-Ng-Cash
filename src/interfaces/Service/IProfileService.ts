import { IProfileModel } from '../Model/IProfileModel'

export interface IProfileService {
  getProfile (id: number | string): Promise<IProfileModel>

}
