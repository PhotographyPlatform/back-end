const { newSequlize } = require("../models");
const { newUserCOll } = require('../models/index');
const { app } = require("../server");
const supertest = require('supertest')
const req = supertest(app)


beforeAll(async () => {
    await newSequlize.sync()
    await newUserCOll.create({ username: 'hamza', password: "123", email: 'ehab@gmail.com' })
    await newUserCOll.create({ username: 'sham', password: "123", email: 'ehab@gmail.com' })
})

afterAll(async () => {
    await newSequlize.drop()
})

describe('request photogrpher routes', () => {

    it('create post', async () => {
        const res = await req.post('/requestphotogrpher/R_PH_PostColl/1').send({
            imgurl: "i am available",
            content: "hello i am ehab"
        })

        console.log(JSON.parse(res.text).createPost.content);
        expect(res.statusCode).toBe(201)
        expect(JSON.parse(res.text).createPost.content).toBe('hello i am ehab')
    })

    it('create comment', async () => {
        const res = await req.post('/requestphotogrpher/req_ph_commentsColl/1/1').send({ content: 'i am available' })

        expect(res.statusCode).toBe(201)
        expect(JSON.parse(res.text).createPost.content).toBe('i am available')
    })

    it('create like', async () => {
        const res = await req.post('/requestphotogrpher/R_Ph_LikesColl/1/1')

        expect(res.statusCode).toBe(201)

        expect(JSON.parse(res.text).createPost.userid).toBe('1')
    })

    it('get post with it\'s comments and  it\'s likes', async () => {
        const res = await req.get('/requestphotogrpher/post/1')

        expect(res.statusCode).toBe(200)
        expect(JSON.parse(res.text).message).toBe('get post with its likes and comments')
    })


})


