import { Op } from 'sequelize'
import { propToken } from '../auth/auth'
import Account from '../database/models/account'
import Transaction from '../database/models/transaction'
import User from '../database/models/user'
import { NotFoundError } from '../err/not-found'
import { ITransaction } from '../interfaces/ITransaction'
import { IGetTransactionModel } from '../interfaces/Model/IGetTransactionModel'
import { ITransactionModel } from '../interfaces/Model/ITransactionModel'
import { ITransactionService } from '../interfaces/Service/ITransactionService'

export class TransactionService implements ITransactionService {
  async transaction (transaction: ITransaction): Promise<ITransactionModel> {
    const token = transaction.token
    if (!token) throw new NotFoundError('Token não encontrado')

    const idToken = await propToken(token) // id do usuario logado

    const dataOne = await Account.findOne({ where: { id: idToken } })

    const myAccount = dataOne?.dataValues.balance // saldo da conta logada

    const dataUser = await User.findOne({ where: { username: transaction.username } })

    const usernameId = dataUser?.dataValues.id // id do usuario digitado

    const dataTwo = await Account.findByPk(usernameId)

    const outerAccount = dataTwo?.dataValues.balance // saldo da conta digitada

    const value = Number(transaction.value)

    const debited = Number(myAccount) - value

    const credited = Number(outerAccount) + value

    await Account.upsert({ id: idToken, balance: debited })
    await Account.upsert({ id: usernameId, balance: credited })
    const data = await Transaction.create({ debitedAccountId: idToken, creditedAccountId: usernameId, value })
    console.log(data)
    return data
  }

  async getTransaction (token: string | undefined): Promise<IGetTransactionModel[]> {
    if (!token) throw new NotFoundError('Token não encontrado')

    const idToken = await propToken(token)

    const transaction = await Transaction.findAll({
      where: {
        [Op.or]: [{ debitedAccountId: idToken }, { creditedAccountId: idToken }]
      }
    })

    const result = transaction.map(async (e) => {
      const userCredit = await User.findByPk(Number(e.creditedAccountId))
      const usernameCredit = userCredit?.username

      const userDebit = await User.findByPk(Number(e.debitedAccountId))
      const usernameDebit = userDebit?.username

      const object = {
        credited: usernameCredit,
        debited: usernameDebit,
        value: Number(e.value),
        date: e.createdAt
      }

      if (Number(e.debitedAccountId) === idToken) {
        object.value = e.value * -1
        return object
      }
      return object
    })

    return await Promise.all(result)
  }

  async creditedTransaction (token: string | undefined): Promise<any> {
    if (!token) throw new NotFoundError('Token não encontrado')

    const idToken = await propToken(token)

    const transaction = await Transaction.findAll({
      where: { creditedAccountId: idToken }
    })

    return transaction.map(({ value }) => Number(value))
  }

  async debitedTransaction (token: string | undefined): Promise<any> {
    if (!token) throw new NotFoundError('Token não encontrado')

    const idToken = await propToken(token)

    const transaction = await Transaction.findAll({
      where: { debitedAccountId: idToken }
    })

    return transaction.map(({ value }) => Number(value) * -1)
  }
}
