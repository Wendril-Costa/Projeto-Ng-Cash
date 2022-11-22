import Account from '../database/models/account'
import User from '../database/models/user'
import { MissingParamError } from '../err/missing-param-error'
import { IProfileModel } from '../interfaces/Model/IProfileModel'
import { IProfileService } from '../interfaces/Service/IProfileService'

export class ProfileService implements IProfileService {
  async getProfile (id: number | string): Promise<IProfileModel> {
    const user = await User.findByPk(id)

    if (!user) {
      throw new MissingParamError('O usuario não existe')
    }

    const account = await Account.findByPk(id)

    if (!account) {
      throw new MissingParamError('A conta não existe')
    }
    return { id: user.id, username: user.username, balance: account.balance }
  }
}
