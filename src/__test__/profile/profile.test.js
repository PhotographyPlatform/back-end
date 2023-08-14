'use strict';
const modules = require('../../models');
const db = modules.newSequlize;
const { app } = require("../../server");
const supertest = require('supertest')
const req = supertest(app)


beforeAll(async () => {
    await db.sync();
})

beforeAll(async () => {
    // Create records and sync database
    await modules.newUserCOll.create({ username: 'hamza', password: "123", email: "moh@getMaxListeners.com" });
    await modules.newUserCOll.create({ username: 'sham', password: "123", email: "moh@getMaxListeners.com" });
    await modules.newPostCOll.create({ imgurl: "moh@getMaxListeners.com", userid: "1", title: "nice photo" });
    await modules.bioCollection.create({ "contant": "welcome", userid: "1" });
    await modules.FollowersColl.create({ "following_id": 1, "me_id": 2 });
    await modules.FollowersColl.create({ "following_id": 2, "me_id": 1 });
    // Await the sync operation
});

afterAll(async () => {
    await db.drop(); // Await the drop operation
});

describe('GET /profile/:userid', () => {
    test('should return 200', async () => {
        const response = await req.get('/profile/1'); // Await the request
        expect(response.status).toBe(200);
    });

    test('should return data', async () => {
        const response = await req.get('/profile/1'); // Await the request
        expect(response).not.toBeNull();
    });

    test('should return null if the user does not exist', async () => {
        const response = await req.get('/profile/3'); // Await the request
        expect(response.status).toBe(500);
    });

    test("route should return data", async () => {
        let response = await req.get('/profile/1'); // Await the request
        response = JSON.parse(response.text);
        expect(response).toHaveProperty("user");
        expect(response).toHaveProperty("Following");
        expect(response).toHaveProperty("Followers");
        expect(response).toHaveProperty("Bio");
        expect(response).toHaveProperty("UserPost");
    });
});
