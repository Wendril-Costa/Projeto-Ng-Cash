import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { StatusCodes } from 'http-status-codes'
import { app } from '../../api/app'

chai.use(chaiHttp)

describe('Teste da rota basíca', () => {
  describe('Quando a requisição é feita com sucesso', () => {
    it('Deve retornar um status 200', async () => {
      const httpResponse = await chai.request(app).get('/')
      expect(httpResponse.status).to.equal(StatusCodes.OK)
      expect(httpResponse.body).to.deep.equal({ message: 'Ok' })
    })
  })
})
