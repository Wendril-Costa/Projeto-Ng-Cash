import jwt from 'jsonwebtoken'
import 'dotenv/config'
import User from '../database/models/user'
import { UnauthorizedError } from '../err/unauthorized-error'
import { ILogin } from '../interfaces/ILogin'
import { ILoginService } from '../interfaces/ILoginService'

const SECRET = process.env.DB_USER as string

export class LoginService implements ILoginService {
  checkPassword (userPassword: string | undefined, bodyPassword: string): boolean {
    return userPassword === bodyPassword
  }

  async login (login: ILogin): Promise<string> {
    const userLogin = await User.findOne({ where: { username: login.username } })

    if (!userLogin || !this.checkPassword(userLogin.password, login.password)) {
      throw new UnauthorizedError('Username ou Password são inválidos')
    }

    const { id, username } = userLogin
    const token = jwt.sign({ id, username }, SECRET, {
      expiresIn: '1d',
      algorithm: 'HS256'
    })

    return token
  }
}
