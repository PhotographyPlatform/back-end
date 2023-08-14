// const { json } = require("sequelize");
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

     describe('request photogrpher routes' , () =>{

     it('create post' ,async  () =>{
          const res = await req.post('/requestphotogrpher/R_PH_PostColl/1').send({
               imgurl : "i am available",
               content : "hello i am ehab"
           })

           console.log(JSON.parse(res.text).createPost.content );
           expect(res.statusCode).toBe(201)
           expect(JSON.parse(res.text).createPost.content).toBe('hello i am ehab')
     })

     it('create comment' ,async  () =>{
          const res = await req.post('/requestphotogrpher/req_ph_commentsColl/1/1').send({content : 'i am available'})

           expect(res.statusCode).toBe(201)
           expect(JSON.parse(res.text).createPost.content).toBe('i am available')
     })

     it('create like' ,async  () =>{
          const res = await req.post('/requestphotogrpher/R_Ph_LikesColl/1/1')

           expect(res.statusCode).toBe(201)

           expect(JSON.parse(res.text).createPost.userid ).toBe('1')
     })

     it('get post with it\'s comments and  it\'s likes' ,async  () =>{
          const res = await req.get('/requestphotogrpher/post/1')

           expect(res.statusCode).toBe(200)
           expect(JSON.parse(res.text).message).toBe('get post with its likes and comments')
     })
})

})






