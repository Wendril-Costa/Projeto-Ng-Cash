import jwt from 'jsonwebtoken'
import 'dotenv/config'
import bcrypt from 'bcrypt'
import User from '../database/models/user'
import { UnauthorizedError } from '../err/unauthorized-error'
import { ILogin } from '../interfaces/ILogin'
import { ILoginService } from '../interfaces/ILoginService'

const SECRET = process.env.DB_USER as string

export class LoginService implements ILoginService {
  checkPassword (userPassword: string, bodyPassword: string): boolean {
    const check = bcrypt.compare(bodyPassword, userPassword)
    if (!check) return false
    return true
  }

  async login (login: ILogin): Promise<string> {
    const userLogin = await User.findOne({ where: { username: login.username } })
    console.log(login.password)
    console.log(userLogin?.password)
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
