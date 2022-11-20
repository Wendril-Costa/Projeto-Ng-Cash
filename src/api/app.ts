import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import { StatusCodes } from 'http-status-codes'
import { registerRouter } from '../routes/resgiterRouter'
import { errorMiddleware } from '../middlewares/errorMiddleware'
import { loginRouter } from '../routes/loginRouter'

class App {
  public app: express.Express

  constructor () {
    this.app = express()
    this.config()
    this.routes()
  }

  private config (): void {
    this.app.use(express.json())
    this.app.use(cors())
  }

  private routes (): void {
    this.app.get('/', (req, res) => res.status(StatusCodes.OK).json({ message: 'Ok' }))
    this.app.use(registerRouter, loginRouter)
    this.app.use(errorMiddleware)
  }

  public start (PORT: number | string): void {
    this.app.listen(PORT, () => console.log(`Server is runing at http://localhost:${PORT}`))
  }
}

export { App }

export const { app } = new App()
