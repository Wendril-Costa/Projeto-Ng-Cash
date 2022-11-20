import User from '../database/models/user'
import { MissingParamError } from '../err/missing-param-error'
import { InvalidParamError } from '../err/invalid-param-error'
import { IRegisterService } from '../interfaces/IRegisterService'
import { ConflictError } from '../err/conflict-error'
import Account from '../database/models/account'
import bcrypt from 'bcrypt'

export interface IRegister {
  username: string
  password: string
}

type RequiredFields = ['username', 'password']

export class RegisterService implements IRegisterService {
  async create (register: IRegister): Promise<any> {
    const requiredFields: RequiredFields = ['username', 'password']
    const regexNumber = /[0-9]/
    const regexUpperCase = /[A-Z]/

    for (const field of requiredFields) {
      if (!register[field]) {
        throw new MissingParamError(`O campo "${field}" é obrigatório`)
      }
    }

    if (register.username.length < 3) {
      throw new InvalidParamError('O campo "username" deve ter pelo menos 3 caracteres')
    }

    if (register.password.length < 8) {
      throw new InvalidParamError('O campo "password" deve ter pelo menos 8 caracteres')
    }

    if (!regexNumber.test(register.password)) {
      throw new InvalidParamError('O campo "password" deve ter um numero')
    }

    if (!regexUpperCase.test(register.password)) {
      throw new InvalidParamError('O campo "password" deve ter uma letra maiuscula')
    }
    console.log(register.password)

    const passwordHash = await bcrypt.hash(register.password, 8)
    register.password = passwordHash

    console.log(register.password)

    const isUser = await User.findOne({ where: { username: register.username } })

    if (isUser) {
      throw new ConflictError('O username já existe')
    }

    const newAccount = await Account.create()

    const newUser = await User.create({ ...register, accountId: newAccount.id })
    console.log(newUser)
    const { id, username, accountId } = newUser

    return { id, username, accountId }
  }
}
