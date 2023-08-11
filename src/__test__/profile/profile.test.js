'use strict';
const modules = require('../../models');
const db = modules.newSequlize;
const { app } = require("../../server");
const supertest = require('supertest')
const req = supertest(app)

// const io = require('socket.io-client');
// const port = process.env.PORT || 4001;
// const nameSpacehost = `http://localhost:4001/notification`;
// const nameSpaceSocket = io.connect(nameSpacehost);



beforeAll(async () => {
    await db.sync();
    await modules.newUserCOll.create({ username: 'hamza', password: "123", email: "moh@getMaxListeners.com" });
    await modules.newUserCOll.create({ username: 'sham', password: "123", email: "moh@getMaxListeners.com" });
    await modules.newPostCOll.create({ imgurl: "moh@getMaxListeners.com", userid: "1", title: "nice photo" });
    await modules.bioCollection.create({ "contant": "welcome", userid: "1", });
    await modules.FollowersColl.create({ "following_id": 1, "me_id": 2 });
    await modules.FollowersColl.create({ "following_id": 2, "me_id": 1 });
 

    //  nameSpaceSocket = io.connect(nameSpacehost);


})
afterAll(async () => {
    await db.drop();
 
    // if (nameSpaceSocket) {
    //     nameSpaceSocket.disconnect();
    // }
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
