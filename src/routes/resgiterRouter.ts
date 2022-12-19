import { Router } from 'express'
import { RegisterController } from '../controllers/RegisterController'
import { validateBody } from '../middlewares/validateBody'
import { RegisterService } from '../services/RegisterService'

const registerService = new RegisterService()
const registerController = new RegisterController(registerService)
const router = Router()

router
  .post('/register',
    validateBody(['username', 'password']),
    (req, res) => registerController.create(req, res))

export { router as registerRouter }
