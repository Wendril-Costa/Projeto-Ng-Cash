// import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'
import { ILoginService } from '../interfaces/ILoginService'

export class LoginController {
  private readonly loginService: ILoginService

  constructor (loginService: ILoginService) {
    this.loginService = loginService
  }

  async login (req: Request, res: Response): Promise<Response | void> {
    await this.loginService.login(req.body)
  }
}
