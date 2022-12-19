import { ILogin } from '../ILogin'
import { ILoginModel } from '../Model/ILoginModel'

export interface ILoginService {
  login (login: ILogin): Promise<ILoginModel>

}
