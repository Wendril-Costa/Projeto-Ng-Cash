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
    const body = req.body
    const value = parseFloat(body.value)
    const username = body.username
    const transaction = await this.transactionService.transaction({ username, value, token })

    return res.status(StatusCodes.OK).json(transaction)
  }

  async getTransaction (req: Request, res: Response): Promise<Response> {
    const { authorization: token } = req.headers
    const { date } = req.body

    const transaction = await this.transactionService.getTransaction(token, date)

    return res.status(StatusCodes.OK).json(transaction)
  }

  async creditedTransaction (req: Request, res: Response): Promise<Response> {
    const { authorization: token } = req.headers
    const { date } = req.body

    const transaction = await this.transactionService.creditedTransaction(token, date)

    return res.status(StatusCodes.OK).json(transaction)
  }

  async debitedTransaction (req: Request, res: Response): Promise<Response> {
    const { authorization: token } = req.headers
    const { date } = req.body

    const transaction = await this.transactionService.debitedTransaction(token, date)

    return res.status(StatusCodes.OK).json(transaction)
  }
}
