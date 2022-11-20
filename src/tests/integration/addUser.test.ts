import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { StatusCodes } from 'http-status-codes'
import { Model } from 'sequelize'
import sinon from 'sinon'
import { app } from '../../api/app'
import User from '../../database/models/user'

chai.use(chaiHttp)

describe('POST /register', () => {
  describe('Quando o campo "username" não é informado ', () => {
    it('Deve retornar um status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/register')
        .send({ password: 'any_password' })
      expect(httpResponse.status).to.equal(StatusCodes.BAD_REQUEST)
      expect(httpResponse.body).to.deep.equal({ error: 'O campo "username" é obrigatório' })
    })
  })

  describe('Quando o campo "username" é menor que 3 caracteres', () => {
    it('Deve retornar um status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/register')
        .send({ username: 'an', password: 'any_password' })
      expect(httpResponse.status).to.equal(StatusCodes.BAD_REQUEST)
      expect(httpResponse.body).to.deep.equal({ error: 'O campo "username" deve ter pelo menos 3 caracteres' })
    })
  })

  describe('Quando o campo "password" não é informado ', () => {
    it('Deve retornar um status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/register')
        .send({ username: 'any_username' })
      expect(httpResponse.status).to.equal(StatusCodes.BAD_REQUEST)
      expect(httpResponse.body).to.deep.equal({ error: 'O campo "password" é obrigatório' })
    })
  })

  describe('Quando o campo "password" é menor que 8 caracteres', () => {
    it('Deve retornar um status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/register')
        .send({ username: 'any_username', password: 'any_pa' })
      expect(httpResponse.status).to.equal(StatusCodes.BAD_REQUEST)
      expect(httpResponse.body).to.deep.equal({ error: 'O campo "password" deve ter pelo menos 8 caracteres' })
    })
  })

  describe('Quando o campo "password" não contém um numero', () => {
    it('Deve retornar um status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/register')
        .send({ username: 'any_username', password: 'any_password' })
      expect(httpResponse.status).to.equal(StatusCodes.BAD_REQUEST)
      expect(httpResponse.body).to.deep.equal({ error: 'O campo "password" deve ter um numero' })
    })
  })

  describe('Quando o campo "password" não contém uma letra maiuscula', () => {
    it('Deve retornar um status 400', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/register')
        .send({ username: 'any_username', password: 'any_password1' })
      expect(httpResponse.status).to.equal(StatusCodes.BAD_REQUEST)
      expect(httpResponse.body).to.deep.equal({ error: 'O campo "password" deve ter uma letra maiuscula' })
    })
  })

  describe('Quando o username já está cadastrado no banco de dados', () => {
    const user = { id: 1, username: 'any_username', password: 'Any_password1' }
    before(() => {
      sinon.stub(Model, 'findOne').resolves(user as User)
    })
    after(() => sinon.restore())

    it('Deve retornar um 409', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/register')
        .send({ username: 'any_username', password: 'Any_password1' })
      expect(httpResponse.status).to.equal(StatusCodes.CONFLICT)
      expect(httpResponse.body).to.deep.equal({ error: 'O username já existe' })
    })
  })

  describe('Quando a requisição é feita com sucesso', () => {
    const user = { id: 1, username: 'any_username', password: 'Any_password1' }
    before(() => {
      sinon.stub(Model, 'findOne').resolves(null)
      sinon.stub(Model, 'create').resolves(user as User)
    })
    after(() => sinon.restore())
    it('Deve retornar um status 201', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/register')
        .send({ username: 'any_username', password: 'Any_password1' })
      expect(httpResponse.status).to.equal(StatusCodes.CREATED)
    })
  })
})
