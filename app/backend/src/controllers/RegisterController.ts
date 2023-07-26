import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'
import { IRegisterService } from '../interfaces/Service/IRegisterService'

export class RegisterController {
  private readonly registerService: IRegisterService

  constructor (registerService: IRegisterService) {
    this.registerService = registerService
  }

  async create (req: Request, res: Response): Promise<Response> {
    const user = await this.registerService.create(req.body)

    return res.status(StatusCodes.CREATED).json(user)
  }
}
