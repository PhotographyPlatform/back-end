"use strict";
const modules = require("../../models/index");
const db = modules.newSequlize;
const { app } = require("../../server");
const supertest = require("supertest");
const req = supertest(app);
const jwt = require("jsonwebtoken");
const token = jwt.sign({ userId: 1 }, process.env.SECRET || 2000);


const {
  newSequlize,
  newUserCOll,
  newPostCOll,
  FollowersColl

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
    email: "moh@email.com"
  });
  //posts

  await newPostCOll.create({
    imgurl: "catsimge.png",
    userid: 1,
    title: "cats playing with a laser",
    contant: "i took photos of my cats while they were playing with a laser",
  });
  FollowersColl.create({
    following_id: 1,
    me_id: 2
  });
  FollowersColl.create({
    following_id: 2,
    me_id: 1
  });

});
afterAll(async () => {
  await newSequlize.drop();
});

describe("GET /profile/userPost", () => {
  test("should return 200", async () => {
    const response = await req.get("/profile/userPost").set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  test("should return 500", async () => {
    const response = await req.get("/profile/userPost/1").set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(404);
  });
})
describe("GET /profile/followers", () => {
  test("should return 200", async () => {
    const response = await req.get("/profile/followers").set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
  });
})
describe("GET /profile/following", () => {
  test("should return 200", async () => {
    const response = await req.get("/profile/following").set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
  });
})


describe("GET /profile/userData", () => {
  test("should return 200", async () => {
    const response = await req.get("/profile/userData").set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
  });
})

describe("GET /profile/Bio", () => {
  test("should return 200", async () => {
    const response = await req.get("/profile/Bio").set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
})

describe("GET /profile/:userid", () => {
  test("should return 200", async () => {
    const response = await req.get("/profile").set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  test("should return data", async () => {
    const response = await req.get("/profile").set('Authorization', `Bearer ${token}`);
    expect(response).not.toBeNull();
  });
  test("should return null if the user not exists", async () => {
    const response = await req.get("/profile/3").set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(404);
  });

  test("route should return data", async () => {
    let response = await req.get("/profile").set('Authorization', `Bearer ${token}`);
    response = JSON.parse(response.text);
    expect(response).toHaveProperty("user");
    expect(response).toHaveProperty("Following");
    expect(response).toHaveProperty("Followers");
    expect(response).toHaveProperty("Bio");
    expect(response).toHaveProperty("UserPost");
  });
});
