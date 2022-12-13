import { Op } from 'sequelize'
import propToken from '../auth/propToken'
import Transaction from '../database/models/transaction'
import { NotFoundError } from '../err/not-found'
import { ITransaction } from '../interfaces/ITransaction'
import { ICredTransactionModel } from '../interfaces/Model/ICredTransactionModel'
import { IDebTransactionModel } from '../interfaces/Model/IDebTransactionModel'
import { IGetTransactionModel } from '../interfaces/Model/IGetTransactionModel'
import { ITransactionModel } from '../interfaces/Model/ITransactionModel'
import { ITransactionService } from '../interfaces/Service/ITransactionService'
import { TToken } from '../types/Token'
import filterTransaction from '../utils/filterTransaction'
import transfer from '../utils/transfer'

export class TransactionService implements ITransactionService {
  async transaction ({ username, value, token }: ITransaction): Promise<ITransactionModel> {
    if (!token) throw new NotFoundError('Token não encontrado')

    const result = transfer(username, value, token)

    return await result
  }

  async getTransaction (token: TToken, date: number): Promise<IGetTransactionModel[]> {
    if (!token) throw new NotFoundError('Token não encontrado')

    const idToken = await propToken(token)

    const transaction = await Transaction.findAll({
      where: {
        [Op.or]: [{ debitedAccountId: idToken }, { creditedAccountId: idToken }]
      }
    })

    if (date) {
      const filterDate = transaction.filter((e) => e.createdAt === date)

      const result = filterTransaction(filterDate, idToken)

      return await result
    }

    const result = filterTransaction(transaction, idToken)

    return await result
  }

  async creditedTransaction (token: TToken, date: number): Promise<ICredTransactionModel[]> {
    if (!token) throw new NotFoundError('Token não encontrado')

    const idToken = await propToken(token)

    const transaction = await Transaction.findAll({
      where: { creditedAccountId: idToken }
    })

    if (date) {
      const filterDate = transaction.filter((e) => e.createdAt === date)

      const result = filterTransaction(filterDate, idToken)

      return await result
    }

    const result = filterTransaction(transaction, idToken)

    return await result
  }

  async debitedTransaction (token: TToken, date: number): Promise<IDebTransactionModel[]> {
    if (!token) throw new NotFoundError('Token não encontrado')

    const idToken = await propToken(token)

    const transaction = await Transaction.findAll({
      where: { debitedAccountId: idToken }
    })

    if (date) {
      const filterDate = transaction.filter((e) => e.createdAt === date)

      const result = filterTransaction(filterDate, idToken)

      return await result
    }

    const result = filterTransaction(transaction, idToken)

    return await result
  }
}
