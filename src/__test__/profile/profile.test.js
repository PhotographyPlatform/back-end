const { json } = require("sequelize");
const { newSequlize, newPostCOll } = require("../../models");
const modules = require('../../models/index');
const { app } = require("../../server");
const supertest = require('supertest')
const req = supertest(app)


beforeAll(async connected  => {
    await newSequlize.sync();
    await modules.newUserCOll.create({ username: 'hamza', password: "123", email: "moh@getMaxListeners.com" })
    await modules.newUserCOll.create({ username: 'sham', password: "123", email: "moh@getMaxListeners.com" })
    await modules.newPostCOll.create({ imgurl: "moh@getMaxListeners.com", userid: "1", title: "nice photo" })
    await modules.bioCollection.create({ "contant": "welcome", userid: "1", })
    await modules.FollowersColl.create({ "following_id": 1, "me_id": 2 })
    await modules.FollowersColl.create({ "following_id": 2, "me_id": 1 })
    connected();
})
afterAll(async done => {
    await newSequlize.drop();
    done();
});


describe('GET /profile/:userid', () => {
    test('should return 200', async () => { 
        const response = await req.get('/profile/1');
        expect(response.status).toBe(200);
    })
    test('should return data', async () => {
        const response = await req.get('/profile/1');
        expect(response).not.toBeNull();
    })
    test('should return null if the user not exists', async () => {
        const response = await req.get('/profile/3');
        expect(response.status).toBe(500);
    })

    test("route should return data", async () => {
        let response = await req.get('/profile/1');
        console.log("_++++++++++++++++++++++++++++++++++")
        // console.log(response.text[user])
        console.log("=====================================")
        response = JSON.parse(response.text);
        expect(response).toHaveProperty("user");
        expect(response).toHaveProperty("Following");
        expect(response).toHaveProperty("Followers");
        expect(response).toHaveProperty("Bio");
        expect(response).toHaveProperty("UserPost");
    })

})
