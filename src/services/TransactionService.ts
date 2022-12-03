import { propToken } from '../auth/auth'
import Account from '../database/models/account'
import User from '../database/models/user'
import { NotFoundError } from '../err/not-found'
import { ITransaction } from '../interfaces/ITransaction'
import { ITransactionService } from '../interfaces/Service/ITransactionService'

export class TransactionService implements ITransactionService {
  async transaction (transaction: ITransaction): Promise<any> {
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

    return { data: 'Balance updated!' }
  }
}
