import Account from '../database/models/account'
import { IBalanceService } from '../interfaces/IBalanceService'

export class BalanceService implements IBalanceService {
  async getBalance (id: number | string): Promise<any> {
    const balance = await Account.findByPk(id)
    return balance
  }
}
