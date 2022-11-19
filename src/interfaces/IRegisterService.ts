import { IRegister } from '../services/RegisterService'

export interface IRegisterService {
  create (register: IRegister): any

}
