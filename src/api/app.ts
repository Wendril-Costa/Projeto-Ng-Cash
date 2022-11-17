import express from 'express'
import 'express-async-errors'
import { StatusCodes } from 'http-status-codes'

class App {
  public app: express.Express

  constructor () {
    this.app = express()
    this.config()
    this.routes()
  }

  private config (): void {
    this.app.use(express.json())
  }

  private routes (): void {
    this.app.get('/', (req, res) => res.status(StatusCodes.OK).json({ message: 'Ok' }))
    this.app.post('/users', (req, res) => res.status(StatusCodes.BAD_REQUEST).json({ error: 'O campo "username" é obrigatório' }))
  }

  public start (PORT: number | string): void {
    this.app.listen(PORT, () => console.log(`Server is runing at http://localhost:${PORT}`))
  }
}

export { App }

export const { app } = new App()
