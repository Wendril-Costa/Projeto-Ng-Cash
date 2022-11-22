// import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { IBalanceService } from '../interfaces/IBalanceService'

export class BalanceController {
  private readonly balanceService: IBalanceService

  constructor (balanceService: IBalanceService) {
    this.balanceService = balanceService
  }

  async getBalance (req: Request, res: Response): Promise<any> {
    const { id } = req.params
    const { balance } = await this.balanceService.getBalance(id)
    return res.status(StatusCodes.OK).json({ balance })
  }
}
