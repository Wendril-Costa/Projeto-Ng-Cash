import { ITransaction } from '../ITransaction'
import { IGetTransactionModel } from '../Model/IGetTransactionModel'
import { ITransactionModel } from '../Model/ITransactionModel'

export interface ITransactionService {
  transaction (transaction: ITransaction): Promise<ITransactionModel>
  getTransaction (token: string | undefined): Promise<IGetTransactionModel[]>
  creditedTransaction (creditedTransaction: any): Promise<any>
  // debitedTransaction (debitedTransaction: any): Promise<any>

}
