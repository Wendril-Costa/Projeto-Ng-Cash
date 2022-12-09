import { NextFunction, Request, Response } from 'express'
import { propToken } from '../auth/auth'
import Account from '../database/models/account'
import User from '../database/models/user'
import { ConflictError } from '../err/conflict-error'
import { MissingParamError } from '../err/missing-param-error'
import { NotFoundError } from '../err/not-found'
import { RequiredTransactions } from '../types/RequiredTransactions'

const validateTransaction = (requiredTransactions: RequiredTransactions) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { authorization: token } = req.headers
    const { username, value } = req.body

    if (!token) throw new NotFoundError('Token não encontrado')

    const idToken = await propToken(token)

    const dataUser = await User.findOne({ where: { id: idToken } })
    const dataAccount = await Account.findOne({ where: { id: idToken } })

    const loginUsername = dataUser?.dataValues.username

    const loginBalance = dataAccount?.dataValues.balance

    for (const field of requiredTransactions) {
      if (!req.body[field]) throw new MissingParamError(`O campo "${field}" é obrigatório`)
    }

    if (!username) throw new MissingParamError('O usuario não existe')

    if (loginUsername === username) throw new ConflictError('Não é possivel realizar uma transferencia para você mesmo')

    if (value > loginBalance) throw new ConflictError('Saldo Insuficiente')

    next()
  }

export { validateTransaction }
