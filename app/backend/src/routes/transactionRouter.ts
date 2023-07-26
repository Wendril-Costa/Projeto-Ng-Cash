import { Router } from 'express'
import auth from '../auth/auth'
import { TransactionController } from '../controllers/TransactionController'
import { validateTransaction } from '../middlewares/validateTransaction'
import { TransactionService } from '../services/TransactionService'

const transactionService = new TransactionService()
const transactionController = new TransactionController(transactionService)
const router = Router()

router
  .post('/transaction', auth, validateTransaction(['username', 'value']),
    (req, res) => transactionController.transaction(req, res))

router
  .get('/transaction', auth,
    (req, res) => transactionController.getTransaction(req, res))

router
  .get('/transaction/credited', auth,
    (req, res) => transactionController.creditedTransaction(req, res))

router
  .get('/transaction/debited', auth,
    (req, res) => transactionController.debitedTransaction(req, res))

export { router as transactionRouter }
