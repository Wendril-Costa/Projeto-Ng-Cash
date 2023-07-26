import 'dotenv/config'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { IProfileService } from '../interfaces/Service/IProfileService'

export class ProfileController {
  private readonly profileService: IProfileService

  constructor (balanceService: IProfileService) {
    this.profileService = balanceService
  }

  async getProfile (req: Request, res: Response): Promise<Response> {
    const { authorization: token } = req.headers

    const balance = await this.profileService.getProfile(token)

    return res.status(StatusCodes.OK).json(balance)
  }
}
