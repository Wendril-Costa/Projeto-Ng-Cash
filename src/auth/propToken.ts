import { IJWT } from '../interfaces/IJWT'
import { token } from '../types/Token'
import jwt from 'jsonwebtoken'

const propToken = async (token: token): Promise<number> => {
  const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as IJWT

  return id
}

export default propToken
