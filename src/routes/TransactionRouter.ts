import { Router } from 'express'
import { auth } from '../auth/auth'
import { TransactionController } from '../controllers/TransactionController'
import { TransactionService } from '../services/TransactionService'

const transactionService = new TransactionService()
const transactionController = new TransactionController(transactionService)
const router = Router()

router
  .post('/transaction', auth,
    (req, res) => transactionController.transaction(req, res))

export { router as transactionRouter }
