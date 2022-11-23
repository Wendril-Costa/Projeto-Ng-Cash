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
    const { id } = req.params
    const balance = await this.profileService.getProfile(id)
    return res.status(StatusCodes.OK).json(balance)
  }
}
