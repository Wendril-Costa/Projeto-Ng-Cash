import { ILogin } from '../interfaces/ILogin'
import { ILoginService } from '../interfaces/ILoginService'

export class LoginService implements ILoginService {
  async login (login: ILogin): Promise<any> {

  }
}
