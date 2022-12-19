import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { Model } from 'sequelize'
import { StatusCodes } from 'http-status-codes'
import sinon from 'sinon'
import { app } from '../../api/app'
import User from '../../database/models/user'
import { LoginService } from '../../services/LoginService'

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

  describe('Quando o username não consta no banco de dados', () => {
    before(() => sinon.stub(Model, 'findOne').resolves(null))
    after(() => sinon.restore())
    it('Deve retornar um status 403', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ username: 'any_username', password: 'Any_passwor1' })
      expect(httpResponse.status).to.equal(403)
      expect(httpResponse.body).to.deep.equal({ error: 'Username ou Password são inválidos' })
    })
  })

  describe('Quando o username é encontrado mas a senha é incorreta', () => {
    const user = { id: 1, username: 'any_username', password: 'Any_password1' }
    before(() => sinon.stub(Model, 'findOne').resolves(user as User))
    before(() => sinon.stub(LoginService.prototype, 'checkPassword').returns(false))
    after(() => sinon.restore())
    it('Deve retornar um status 403', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ username: 'any_username', password: 'Wrong_password1' })
      expect(httpResponse.status).to.equal(403)
      expect(httpResponse.body).to.deep.equal({ error: 'Username ou Password são inválidos' })
    })
  })

  describe('Quando as credenciais estão corretas', () => {
    const passowrdBcrypt = '$2b$08$J4HUMRJS0yKI.qqhMUVzYur5JsinVFIdShoXW/UaiDjK6XZANxYFq'
    const user = { id: 1, username: 'any_username', password: passowrdBcrypt }
    before(() => sinon.stub(Model, 'findOne').resolves(user as User))
    before(() => sinon.stub(LoginService.prototype, 'checkPassword').returns(true))
    after(() => sinon.restore())
    it('Deve retornar um status 200', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ username: 'any_username', password: 'Any_password1' })
      expect(httpResponse.status).to.equal(StatusCodes.OK)
      expect(httpResponse.body).to.have.key('token')
      expect(httpResponse.body.token).to.be.a('string')
    })
  })
})
