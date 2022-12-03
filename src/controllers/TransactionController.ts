import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'
import { ITransactionService } from '../interfaces/Service/ITransactionService'

export class TransactionController {
  private readonly transactionService: ITransactionService

  constructor (transactionService: ITransactionService) {
    this.transactionService = transactionService
  }

  async transaction (req: Request, res: Response): Promise<Response> {
    const { authorization: token } = req.headers
    const { username, value } = req.body
    const transaction = await this.transactionService.transaction({ username, value, token })

    return res.status(StatusCodes.OK).json(transaction)
  }
}
