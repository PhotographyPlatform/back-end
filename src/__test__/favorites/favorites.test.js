"use strict";

const { app } = require("../../server");
const supertest = require("supertest");
const req = supertest(app);
const jwt = require("jsonwebtoken");

const token = jwt.sign({userId: 1}, process.env.SECRET || 2000);
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjkyMDI0NzYxfQ._kuAsG2EWmJsdrwzvSQ3OFONqSehei1AgQKZvQdIQnM";


const {
  newSequlize,
  newUserCOll,
  newPostCOll,
  favoritesCollection,
} = require("../../models/index");

beforeAll(async () => {

  await newSequlize.sync();

  //users
  await newUserCOll.create({

    id:1,
    username: "sham",
    password: "s123",
    email: "sham@email.com",
  });
  
    await newUserCOll.create({
      username: "blackangel",
      password: "s123",
      email: "blackangel@email.com",
    });

  //posts
  await newPostCOll.create({
    imgurl: "catsimge.png",
    userid: 1,
    title: "cats playing with a laser",
    contant: "i took photos of my cats while they were playing with a laser",
    category: "animal",
  });
  await newPostCOll.create({
    imgurl: "blackwatch.png",
    userid: 2,
    title: "my black car",
    contant: "a journey to Florida with my black car",
    category: "animal",
  });

});

afterAll(async () => {
  await newSequlize.drop();
});

describe("Favorites test", () => {

  it("users shoold be able to add a post to their favorites page", async () => {
    
    const obj ={
      userid: 1,
      postid: 2,
    }
    
    const response = await req.post("/favorites").send(obj).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(201);
    expect(JSON.parse(response.text)["data"]["userid"]).toBe(1);
    expect(JSON.parse(response.text)["data"]["postid"]).toBe(2);
  });
  
  it("check if the Favorites route working properly or not", async () => {
    const response = await req.get("/favorites")
    .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(JSON.parse(response.text).favorites[0].id).toBe(2);
  });
});