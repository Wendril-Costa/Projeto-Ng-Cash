import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'
import { RegisterService } from '../services/RegisterService'

export class RegisterController {
  private readonly registerService: RegisterService

  constructor () {
    this.registerService = new RegisterService()
  }

  create (req: Request, res: Response): Response | void {
    const error = this.registerService.create(req.body)

    if (error) return res.status(StatusCodes.BAD_REQUEST).json(error)

    return res.sendStatus(StatusCodes.CREATED)
  }
}
