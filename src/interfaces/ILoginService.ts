import { ILogin } from '../interfaces/ILogin'

export interface ILoginService {
  login (login: ILogin): Promise<string>

}
