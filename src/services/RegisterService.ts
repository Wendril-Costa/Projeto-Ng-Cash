import { MissingParamError } from '../err/missing-param-error'
import { IRegisterService } from '../interfaces/IRegisterService'

export interface IRegister {
  username: string
  password: string
}

type RequiredFields = ['username', 'password']

export class RegisterService implements IRegisterService {
  create (register: IRegister): any {
    const requiredFields: RequiredFields = ['username', 'password']
    for (const field of requiredFields) {
      if (!register[field]) {
        throw new MissingParamError(`O campo "${field}" é obrigatório`)
      }
    }
  }
}
