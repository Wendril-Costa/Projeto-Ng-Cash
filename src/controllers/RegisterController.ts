import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'
import { IRegisterService } from '../interfaces/IRegisterService'

export class RegisterController {
  private readonly registerService: IRegisterService

  constructor (registerService: IRegisterService) {
    this.registerService = registerService
  }

  create (req: Request, res: Response): Response | void {
    this.registerService.create(req.body)
    return res.sendStatus(StatusCodes.CREATED)
  }
}
