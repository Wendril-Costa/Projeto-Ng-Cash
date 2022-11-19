import { IRegister } from '../services/RegisterService'

export interface IRegisterService {
  create (register: IRegister): Promise<any>

}
