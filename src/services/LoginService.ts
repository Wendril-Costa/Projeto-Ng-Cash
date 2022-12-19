import 'dotenv/config'
import User from '../database/models/user'
import { UnauthorizedError } from '../err/unauthorized-error'
import { ILogin } from '../interfaces/ILogin'
import { ILoginService } from '../interfaces/Service/ILoginService'
import { ILoginModel } from '../interfaces/Model/ILoginModel'
import checkPassword from '../utils/checkPassword'
import creatToken from '../auth/creatToken'

export class LoginService implements ILoginService {
  async login (login: ILogin): Promise<ILoginModel> {
    const userLogin = await User.findOne({ where: { username: login.username } })

    if (!userLogin || !checkPassword(userLogin.password, login.password)) {
      throw new UnauthorizedError('Username ou Password são inválidos')
    }

    const { id, username } = userLogin

    const token = creatToken({ id, username })

    return await token
  }
}
