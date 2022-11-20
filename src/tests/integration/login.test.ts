import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { StatusCodes } from 'http-status-codes'
import { app } from '../../api/app'

chai.use(chaiHttp)

describe('POST /login', () => {
  describe('Quando o campo "username" não é informado ', () => {
    it('Deve retornar um status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ password: 'any_password' })
      expect(httpResponse.status).to.equal(StatusCodes.BAD_REQUEST)
      expect(httpResponse.body).to.deep.equal({ error: 'O campo "username" é obrigatório' })
    })
  })

  describe('Quando o campo "password" não é informado ', () => {
    it('Deve retornar um status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ username: 'any_username' })
      expect(httpResponse.status).to.equal(StatusCodes.BAD_REQUEST)
      expect(httpResponse.body).to.deep.equal({ error: 'O campo "password" é obrigatório' })
    })
  })
})
