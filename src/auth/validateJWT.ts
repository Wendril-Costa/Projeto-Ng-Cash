import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { StatusCodes } from 'http-status-codes'
import { IJWT } from '../interfaces/IJWT'

const SECRET = process.env.JWT_SECRET as string

export async function auth (req: Request, res: Response, next: NextFunction): Promise<any> {
  const token = req.headers.authorization
  console.log(token)
  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token não encontrado' })

  try {
    jwt.verify(token, SECRET) as IJWT
    next()
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'O token deve ser um token válido' })
  }
}
