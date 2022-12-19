import User from '../database/models/user'
import { IGetTransactionModel } from '../interfaces/Model/IGetTransactionModel'

const filterTransaction = async (array: object[], idToken: number): Promise<IGetTransactionModel[]> => {
  const result = array.map(async (e: any) => {
    console.log(typeof e)

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

export default filterTransaction
