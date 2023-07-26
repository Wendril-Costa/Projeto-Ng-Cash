import { Router } from 'express'
import { LoginController } from '../controllers/LoginController'
import { validateBody } from '../middlewares/validateBody'
import { LoginService } from '../services/LoginService'

const loginService = new LoginService()
const loginController = new LoginController(loginService)
const router = Router()

router
  .post('/login',
    validateBody(['username', 'password']),
    (req, res) => loginController.login(req, res))

export { router as loginRouter }
