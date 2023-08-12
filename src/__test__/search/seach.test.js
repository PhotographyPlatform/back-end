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

  it("get both users and posts based on the search word", async () => {
    const searchWord = "black";

    let data = await req.get("/search").send({
      searchWord: searchWord,
    });

    let usersResults = JSON.parse(data.text).users[0].username;
    expect(usersResults).toContain(searchWord);

    let postsResults = JSON.parse(data.text).posts[0].title;
    expect(postsResults).toContain(searchWord);
  });

  it("get both users and posts based on the search word", async () => {
    let data = await req.get("/search1111");

    expect(data.statusCode).toBe(404);
  });
});
