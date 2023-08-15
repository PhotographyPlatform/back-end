"use strict";

const { app } = require("../../server");
const supertest = require("supertest");
const req = supertest(app);
const jwt = require("jsonwebtoken");
const token = jwt.sign({ userId: 1 }, process.env.SECRET || 2000);

const {
    newSequlize,
    newUserCOll,
    newPostCOll,

} = require("../../models/index");

beforeAll(async () => {

    await newSequlize.sync();

    //users
    await newUserCOll.create({
        username: "omar",
        password: "123",
        email: "sham@email.com"
    });

    await newUserCOll.create({
        username: "moh",
        password: "123",
        email: "blackangel@email.com",
    });

    //posts
    await newPostCOll.create({
        imgurl: "catsimge.png",
        userid: 1,
        title: "cats playing with a laser",
        contant: "i took photos of my cats while they were playing with a laser",
    });

});
afterAll(async () => {
    await newSequlize.drop();
});
describe("Add like and sent Notification", () => {

    it("Create new like (201)", async () => {
        const response = await req.post("/notification/likes")
            .set('Authorization', `Bearer ${token}`).send({
                "postid": 1
            });
        expect(response.status).toBe(201);
        expect(response.body).not.toBeNull();
    });
    it("you already liked this post before", async () => {
        const response = await req.post("/notification/likes")
            .set('Authorization', `Bearer ${token}`).send({
                "postid": 1
            });
        expect(response.body).toBe("you already liked this post");
        expect(response.status).toBe(400);
    });
    it("Error Added new like on Anonymous post (500)", async () => {
        const response = await req.post("/notification/likes")
            .set('Authorization', `Bearer ${token}`).send({
                "postid": 100
            });
        expect(response.status).toBe(500);

    });
});



describe("Added Comment and sent Notification", () => {

    it("Create new Comment (201)", async () => {
        const response = await req.post("/notification/comment")
            .set('Authorization', `Bearer ${token}`).send({
                "postid": 1,
                "contant": "Nice Pic"
            });
        expect(response.status).toBe(201);
        expect(response.body).not.toBeNull();
    });
    it("Error creating new Comment on Anonymous post (500)", async () => {
        const response = await req.post("/notification/comment")
            .set('Authorization', `Bearer ${token}`).send({
                "postid": 100,
                "contant": "Nice Pic"
            });
        expect(response.status).toBe(500);

    });
});


describe("Added Comment and sent Notification", () => {

    it("user 1 Following user 2 (201)", async () => {
        const response = await req.post("/notification/follow")
            .set('Authorization', `Bearer ${token}`).send({
                "following_id": 2
            });
        expect(response.status).toBe(201);
        expect(response.body).not.toBeNull();
    });
    it("Error try Following my self ", async () => {
        const response = await req.post("/notification/follow")
            .set('Authorization', `Bearer ${token}`).send({
                "following_id": 1
            });
        expect(response.status).toBe(400);
        expect(response.body).toBe("you cant follow yourself");

    });
    it("Error try Following Anonymous user ", async () => {
        const response = await req.post("/notification/follow")
            .set('Authorization', `Bearer ${token}`).send({
                "following_id": 100
            });
        expect(response.status).toBe(500);
        expect(response.body).not.toBeNull();
    });
});


describe("Added new Reoprt ", () => {

    it("Added new Reoprt on post 1 (201)", async () => {
        const response = await req.post("/report")
            .set('Authorization', `Bearer ${token}`).send({
                "actionId": 1,
                "actionType": "post",
                "categories": "Spam"
            });
        expect(response.status).toBe(201);
        expect(response.body).not.toBeNull();
    });
    it("Add another report for the same post from the same user (400)", async () => {
        const response = await req.post("/notification/follow")
            .set('Authorization', `Bearer ${token}`).send({
                "actionId": 1,
                "actionType": "post",
                "categories": "Spam"
            });
        expect(response.status).toBe(500);
    });
    it("Add a report for the anonymous post 400 ", async () => {
        const response = await req.post("/notification/follow")
            .set('Authorization', `Bearer ${token}`).send({
                "actionId": 100,
                "actionType": "post",
                "categories": "Spam"
            });
        expect(response.status).toBe(500);
    });
});

