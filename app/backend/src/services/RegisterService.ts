import User from '../database/models/user'
import { IRegisterService } from '../interfaces/Service/IRegisterService'
import { ConflictError } from '../err/conflict-error'
import Account from '../database/models/account'
import bcrypt from 'bcrypt'
import { IRegisterModel } from '../interfaces/Model/IRegisterModel'
import { IRegister } from '../interfaces/IRegister'

export class RegisterService implements IRegisterService {
  async create (register: IRegister): Promise<IRegisterModel> {
    const passwordHash = await bcrypt.hash(register.password, 8)
    register.password = passwordHash

    const isUser = await User.findOne({ where: { username: register.username } })

    if (isUser) throw new ConflictError('O username já existe')

    const newAccount = await Account.create()

    const { id, username } = await User.create({ ...register, accountId: newAccount.id })

    return { id, username }
  }
}
