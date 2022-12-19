import { NextFunction, Request, Response } from 'express'
import { InvalidParamError } from '../err/invalid-param-error'
import { MissingParamError } from '../err/missing-param-error'
import { RequiredFields } from '../types/RequiredFields'

const validateBody = (requiredFields: RequiredFields) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const regexNumber = /[0-9]/
    const regexUpperCase = /[A-Z]/

    for (const field of requiredFields) {
      if (!req.body[field]) throw new MissingParamError(`O campo "${field}" é obrigatório`)
    }

    if (req.body.username.length < 3) {
      throw new InvalidParamError('O campo "username" deve ter pelo menos 3 caracteres')
    }

    if (req.body.password.length < 8) {
      throw new InvalidParamError('O campo "password" deve ter pelo menos 8 caracteres')
    }

    if (!regexNumber.test(req.body.password)) {
      throw new InvalidParamError('O campo "password" deve ter um numero')
    }

    if (!regexUpperCase.test(req.body.password)) {
      throw new InvalidParamError('O campo "password" deve ter uma letra maiuscula')
    }

    next()
  }

export { validateBody }
