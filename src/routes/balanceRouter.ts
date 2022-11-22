import { Router } from 'express'
import { BalanceController } from '../controllers/BalanceController'
import { BalanceService } from '../services/BalanceService'

const balanceService = new BalanceService()
const balanceController = new BalanceController(balanceService)
const router = Router()

router
  .get('/balance/:id',
    (req, res) => balanceController.getBalance(req, res))

export { router as balanceRouter }
