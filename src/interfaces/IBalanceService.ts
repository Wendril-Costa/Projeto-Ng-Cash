// import { IBalance } from './IBalance'

export interface IBalanceService {
  getBalance (getBalance: number | string): Promise<any>

}
