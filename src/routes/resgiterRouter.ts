import { Router } from 'express'
import { RegisterController } from '../controllers/RegisterController'
import { RegisterService } from '../services/RegisterService'

const registerService = new RegisterService()
const registerController = new RegisterController(registerService)
const router = Router()

router.post('/register', (req, res) => registerController.create(req, res))

export { router as registerRouter }
