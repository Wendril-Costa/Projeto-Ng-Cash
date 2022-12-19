import { ErrorRequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).json({ error: err.message })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
}
