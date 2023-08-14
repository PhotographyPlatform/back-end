"use strict";

const { app } = require("../../server");
const supertest = require("supertest");
const req = supertest(app);
const { newSequlize, newUserCOll, newPostCOll } = require("../../models/index");

beforeAll(async () => {
  await newSequlize.sync();

  await newUserCOll.create({
    username: "sham",
    password: "s123",
    email: "test@gmail.com",
  });
  await newUserCOll.create({
    username: "black angel",
    password: "s123",
    email: "test@gmail.com",
  });

  await newPostCOll.create({
    title : "cats",
    brief : "also test",
    prize:"50",
    startDate : "2023-08-03T12:00:00Z",
    endDate : "2023-08-03T12:00:00Z",
    rules : ["rule1 , rule2"],
    imgurl : "img.png",
    category : ["animals", "cats"],
    userid : 1
  });

  await newPostCOll.create({
    title : "dogs",
    brief : "also test",
    prize:"50",
    startDate : "2023-08-03T12:00:00Z",
    endDate : "2023-08-03T12:00:00Z",
    rules : ["rule1 , rule2"],
    imgurl : "img.png",
    category : ["animals", "dogs"],
    userid : 1
  });
});

afterAll(async () => {
  await newSequlize.drop();
});

describe("search test", () => {
  it("get a users based on the search word", async () => {
    const searchWord = "sham";

    let data = await req.get("/search").send({
      searchWord: searchWord,
    });

    let res = JSON.parse(data.text).users[0].username;
    expect(res).toContain(searchWord);
  });

  it("get a posts based on the search word", async () => {
    const searchWord = "cats";

    let data = await req.get("/search").send({
      searchWord: searchWord,
    });

    let res = JSON.parse(data.text).posts[0].title;
    expect(res).toContain(searchWord);
  });

  it.skip("get both users and posts based on the search word", async () => {
    const searchWord = "black";

    let data = await req.get("/search").send({
      searchWord: searchWord,
    });

    let usersResults = JSON.parse(data.text).users[0].username;
    expect(usersResults).toContain(searchWord);

    let postsResults = JSON.parse(data.text).posts[0].title;
    expect(postsResults).toContain(searchWord);
  });

  it("get both useWWrs and posts based on the search word", async () => {
    let data = await req.get("/search1111");
    expect(data.statusCode).toBe(404);
  });

  it.skip("get all the posts based on a certain word", async () => {
    const searchWord = "animals";
    let data = await req.get(`/searchCategory/${searchWord}`);
    expect(JSON.parse(data.text).length).toBe(2);
  });
});
