import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { StatusCodes } from 'http-status-codes'
import { app } from '../../api/app'

chai.use(chaiHttp)

describe('POST /users', () => {
  describe('Quando o campo "username" não é informado ', () => {
    it('Deve retornar um status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/users')
        .send({ password: 'any_password' })
      expect(httpResponse.status).to.equal(StatusCodes.BAD_REQUEST)
      expect(httpResponse.body).to.deep.equal({ error: 'O campo "username" é obrigatório' })
    })
  })
})
