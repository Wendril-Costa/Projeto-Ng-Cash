// import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { IProfileService } from '../interfaces/Service/IProfileService'
import { IJWT } from '../interfaces/IJWT'

const SECRET = process.env.JWT_SECRET as string

export class ProfileController {
  private readonly profileService: IProfileService

  constructor (balanceService: IProfileService) {
    this.profileService = balanceService
  }

  async getProfile (req: Request, res: Response): Promise<Response> {
    const { authorization: token} = req.headers
    console.log(token)
    if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token não encontrado' })
    console.log(token)
    const aa = jwt.verify(token, SECRET) as IJWT
    console.log(aa)
    const { id } = req.params
    const balance = await this.profileService.getProfile(id)
    return res.status(StatusCodes.OK).json(balance)
  }
}
