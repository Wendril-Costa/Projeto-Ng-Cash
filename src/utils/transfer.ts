
import propToken from '../auth/propToken'
import Account from '../database/models/account'
import Transaction from '../database/models/transaction'
import User from '../database/models/user'
import { ITransactionModel } from '../interfaces/Model/ITransactionModel'

const transfer = async (username: string, value: number, token: string): Promise<ITransactionModel> => {
  const idToken = await propToken(token)

  const loginUser = await User.findByPk(idToken)

  const loginAccount = await Account.findOne({ where: { id: idToken } })

  const loginBalance = loginAccount?.dataValues.balance

  const destUser = await User.findOne({ where: { username } })

  const destUserId = destUser?.dataValues.id

  const destAccount = await Account.findByPk(destUserId)

  const destBalance = destAccount?.dataValues.balance

  const debited = Number(loginBalance) - value

  const credited = Number(destBalance) + value

  await Account.upsert({ id: idToken, balance: debited })
  await Account.upsert({ id: destUserId, balance: credited })
  await Transaction.create({ debitedAccountId: idToken, creditedAccountId: destUserId, value })

  const data = { debitedAccount: loginUser?.dataValues.username, creditedAccount: username, value }

  return data
}

export default transfer
