import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { StatusCodes } from 'http-status-codes'
import { Model } from 'sequelize'
import sinon from 'sinon'
import { app } from '../../api/app'
import Account from '../../database/models/account'
// import { LoginService } from '../../services/LoginService'

chai.use(chaiHttp)

describe('GET /balance/:id', () => {
  describe('Quando a requisição é feita com sucesso', () => {
    const account = { id: 1, balance: 100 }
    before(() => sinon.stub(Model, 'findByPk').resolves(account as Account))
    after(() => sinon.restore())
    it('Deve retornar um status 200', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/balance/:id')
      expect(httpResponse.status).to.equal(StatusCodes.OK)
      expect(httpResponse.body).to.be.a('object')
      expect(httpResponse.body).to.have.key('balance')
    })
  })
})
