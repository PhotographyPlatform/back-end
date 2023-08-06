const { json } = require("sequelize");
const { newSequlize } = require("../../models");
const { newUserCOll } = require('../../models/index');
const { app } = require("../../server");
const supertest = require('supertest')
const req = supertest(app)




beforeAll(async () => {
     await newSequlize.sync();
     await newUserCOll.create({ username: 'hamza', password: "123", email: "hamza@gmail.com" })
     await newUserCOll.create({ username: 'sham', password: "123", email: "sham@gmail.com" })

})

afterAll(async () => {
     await newSequlize.drop();
});


describe('chat test', () => {

     it('test 1', () => {

          expect(true).toBe(true)
     })

     it('add messages ', async () => {
          let data = await req.post('/chat/1/2').send({ content: "5 hi from sham to hamza by socket " })
          let res = JSON.parse(data.text).data.content
          expect(res).toBe('5 hi from sham to hamza by socket ')
     })

     it('get sender and reciver messages ', async () => {
          let data = await req.get('/chat/1/2')

          let res = JSON.parse(data.text).sendData[0].content
          expect(res).toBe('5 hi from sham to hamza by socket ')
     })

     it('get sender and reciver messages ', async () => {
          let data = await req.put('/chat/1/1/2').send({ content: "hi from sham to hamza by socket " })
          let res = JSON.parse(data.text).data.content

          expect(res).toBe('hi from sham to hamza by socket ')
          expect(data.statusCode).toBe(203)
     })

     it('get sender and reciver messages ', async () => {
          let data = await req.delete('/chat/1/1/2')

          expect(data.statusCode).toBe(204)
     })

})



