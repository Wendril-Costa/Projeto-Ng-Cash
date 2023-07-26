import { TToken } from '../../types/Token'
import { ITransaction } from '../ITransaction'
import { ICredTransactionModel } from '../Model/ICredTransactionModel'
import { IDebTransactionModel } from '../Model/IDebTransactionModel'
import { IGetTransactionModel } from '../Model/IGetTransactionModel'
import { ITransactionModel } from '../Model/ITransactionModel'

export interface ITransactionService {
  transaction (transaction: ITransaction): Promise<ITransactionModel>
  getTransaction (token: TToken, date: number): Promise<IGetTransactionModel[]>
  creditedTransaction (token: TToken, date: number): Promise<ICredTransactionModel[]>
  debitedTransaction (token: TToken, date: number): Promise<IDebTransactionModel[]>
}
