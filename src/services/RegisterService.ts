import User from '../database/models/user'
import { MissingParamError } from '../err/missing-param-error'
import { IRegisterService } from '../interfaces/IRegisterService'
import { ConflictError } from '../err/conflict-error'

export interface IRegister {
  username: string
  password: string
}

type RequiredFields = ['username', 'password']

export class RegisterService implements IRegisterService {
  async create (register: IRegister): Promise<any> {
    const requiredFields: RequiredFields = ['username', 'password']
    for (const field of requiredFields) {
      if (!register[field]) {
        throw new MissingParamError(`O campo "${field}" é obrigatório`)
      }
    }

    if (register.username.length < 3) {
      throw new MissingParamError('O campo "username" deve ter pelo menos 3 caracteres')
    }

    const isUser = await User.findOne({ where: { username: register.username } })
    console.log(isUser)
    if (isUser) {
      throw new ConflictError('O username já existe')
    }

    const newUser = await User.create({ ...register })
    console.log(newUser)
    return newUser
  }
}
