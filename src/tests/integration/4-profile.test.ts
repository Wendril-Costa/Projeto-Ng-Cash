import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { StatusCodes } from 'http-status-codes'
import { Model } from 'sequelize'
import sinon from 'sinon'
import { app } from '../../api/app'
import Account from '../../database/models/account'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const SECRET = process.env.JWT_SECRET as string

chai.use(chaiHttp)

describe('GET /profile/:id', () => {
  describe('Quando a requisição é feita com sucesso', () => {
    const account = { id: 1, balance: 100 }
    const user = { id: 1, username: 'any_username' }
    const token = jwt.sign(user, SECRET, {
      expiresIn: '1d',
      algorithm: 'HS256'
    })
    before(() => sinon.stub(Model, 'findByPk').resolves(account as Account))
    before(() => sinon.stub(jwt, 'verify').resolves(token))
    after(() => sinon.restore())
    it('Deve retornar um status 200', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/profile/:id')
        .send({ username: 'any_username', password: 'Any_password1' })
        .set('Authorization', `Bearer ${token}`)
      expect(httpResponse.status).to.equal(StatusCodes.OK)
      expect(httpResponse.body).to.be.a('object')
      expect(httpResponse.body.id).to.be.a('number')
      expect(httpResponse.body.balance).to.be.a('number')
    })
  })
})
