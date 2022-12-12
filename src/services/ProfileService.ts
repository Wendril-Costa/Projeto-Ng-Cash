import { propToken } from '../auth/auth'
import Account from '../database/models/account'
import User from '../database/models/user'
import { MissingParamError } from '../err/missing-param-error'
import { NotFoundError } from '../err/not-found'
import { IProfileModel } from '../interfaces/Model/IProfileModel'
import { IProfileService } from '../interfaces/Service/IProfileService'
import { TToken } from '../types/Token'

export class ProfileService implements IProfileService {
  async getProfile (token: TToken): Promise<IProfileModel> {
    if (!token) throw new NotFoundError('Token não encontrado')

    const id = await propToken(token)

    const user = await User.findByPk(id)

    const account = await Account.findByPk(id)

    if (!user || !account) throw new MissingParamError('O usuario não existe')

    return { id: user.id, username: user.username, balance: account.balance }
  }
}
