import { IRegister } from '../IRegister'
import { IRegisterModel } from '../Model/IRegisterModel'

export interface IRegisterService {
  create (register: IRegister): Promise<IRegisterModel>

}
