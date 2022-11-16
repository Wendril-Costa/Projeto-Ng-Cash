import express from 'express'
import 'express-async-errors'

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

  }

  public start (PORT: number | string): void {
    this.app.listen(PORT, () => console.log(`Server is runing at http://localhost:${PORT}`))
  }
}

export { App }

export const { app } = new App()
