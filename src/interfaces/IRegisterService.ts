import { IRegister } from '../interfaces/IRegister'
import { IRegisterModel } from './IRegisterModel'

export interface IRegisterService {
  create (register: IRegister): Promise<IRegisterModel>

}
