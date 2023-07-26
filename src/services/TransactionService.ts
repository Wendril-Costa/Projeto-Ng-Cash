import { Op } from 'sequelize'
import { propToken } from '../auth/auth'
import Account from '../database/models/account'
import Transaction from '../database/models/transaction'
import User from '../database/models/user'
import { NotFoundError } from '../err/not-found'
import { ITransaction } from '../interfaces/ITransaction'
import { ICredTransactionModel } from '../interfaces/Model/ICredTransactionModel'
import { IDebTransactionModel } from '../interfaces/Model/IDebTransactionModel'
import { IGetTransactionModel } from '../interfaces/Model/IGetTransactionModel'
import { ITransactionModel } from '../interfaces/Model/ITransactionModel'
import { ITransactionService } from '../interfaces/Service/ITransactionService'
import { TToken } from '../types/Token'
import filterTransaction from '../utils/filterTransaction'

export class TransactionService implements ITransactionService {
  [x: string]: any
  async transaction (transaction: ITransaction): Promise<ITransactionModel> {
    const token = transaction.token
    if (!token) throw new NotFoundError('Token não encontrado')

    const idToken = await propToken(token)

    const dataOne = await Account.findOne({ where: { id: idToken } })

    const myAccount = dataOne?.dataValues.balance

    const dataUser = await User.findOne({ where: { username: transaction.username } })

    const usernameId = dataUser?.dataValues.id

    const dataTwo = await Account.findByPk(usernameId)

    const outerAccount = dataTwo?.dataValues.balance

    const value = Number(transaction.value)

    const debited = Number(myAccount) - value

    const credited = Number(outerAccount) + value

    await Account.upsert({ id: idToken, balance: debited })
    await Account.upsert({ id: usernameId, balance: credited })
    const data = await Transaction.create({ debitedAccountId: idToken, creditedAccountId: usernameId, value })

    return data
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
