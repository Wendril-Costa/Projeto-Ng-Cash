import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { StatusCodes } from 'http-status-codes'
import { Model } from 'sequelize'
import sinon from 'sinon'
import { app } from '../../api/app'
import Account from '../../database/models/account'

chai.use(chaiHttp)

describe('GET /profile/:id', () => {
  describe('Quando a requisição é feita com sucesso', () => {
    const account = { id: 1, balance: 100 }
    before(() => sinon.stub(Model, 'findByPk').resolves(account as Account))
    after(() => sinon.restore())
    it('Deve retornar um status 200', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/profile/:id')
      expect(httpResponse.status).to.equal(StatusCodes.OK)
      expect(httpResponse.body).to.be.a('object')
      expect(httpResponse.body.id).to.be.a('number')
      expect(httpResponse.body.balance).to.be.a('number')
    })
  })
})
