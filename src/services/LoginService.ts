import jwt from 'jsonwebtoken'
import 'dotenv/config'
import bcrypt from 'bcrypt'
import User from '../database/models/user'
import { UnauthorizedError } from '../err/unauthorized-error'
import { ILogin } from '../interfaces/ILogin'
import { ILoginService } from '../interfaces/Service/ILoginService'
import { ILoginModel } from '../interfaces/Model/ILoginModel'

const SECRET = process.env.JWT_SECRET as string

export class LoginService implements ILoginService {
  checkPassword (userPassword: string, bodyPassword: string): boolean {
    const check = bcrypt.compare(bodyPassword, userPassword)

    if (!check) return false

    return true
  }

  async login (login: ILogin): Promise<ILoginModel> {
    const userLogin = await User.findOne({ where: { username: login.username } })

    if (!userLogin || !this.checkPassword(userLogin.password, login.password)) {
      throw new UnauthorizedError('Username ou Password são inválidos')
    }

    const { id, username } = userLogin

    const token = jwt.sign({ id, username }, SECRET, {
      expiresIn: '1d',
      algorithm: 'HS256'
    })

    return { token }
  }
}
