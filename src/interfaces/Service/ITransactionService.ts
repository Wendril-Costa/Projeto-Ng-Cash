import { ITransaction } from '../ITransaction'

export interface ITransactionService {
  transaction (transaction: ITransaction): Promise<any>

}
