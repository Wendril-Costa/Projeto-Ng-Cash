import jwt from 'jsonwebtoken'
import { ILoginModel } from '../interfaces/Model/ILoginModel'
const SECRET = process.env.JWT_SECRET as string

const creatToken = async (data: object): Promise<ILoginModel> => {
  const token = jwt.sign(data, SECRET, {
    expiresIn: '1d',
    algorithm: 'HS256'
  })

  return { token }
}

export default creatToken
