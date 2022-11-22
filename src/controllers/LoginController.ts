import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ILoginService } from '../interfaces/ILoginService'

export class LoginController {
  private readonly loginService: ILoginService

  constructor (loginService: ILoginService) {
    this.loginService = loginService
  }

  async login (req: Request, res: Response): Promise<Response | void> {
    const token = await this.loginService.login(req.body)
    return res.status(StatusCodes.OK).json({ token })
  }
}
