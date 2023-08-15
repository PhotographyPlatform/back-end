"use strict";

const { app } = require("../../server");
const supertest = require("supertest");
const req = supertest(app);
const { newSequlize, newUserCOll, newPostCOll } = require("../../models/index");

beforeAll(async () => {
  try {
    
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
      imgurl: "cats.png",
      userid: 2,
      title: "cats",
      contant: "for challenge 1", 
      category: "animals"
    });
  
    await newPostCOll.create({
      imgurl: "dogs.png",
      userid: 2,
      title: "black dogs",
      contant: "for challenge 1", 
      category: "animals"
    });
  } catch (err) {
    console.log(err);
  }
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

  it("get both useWWrs and posts based on the search word", async () => {
    let data = await req.get("/search1111");
    expect(data.statusCode).toBe(404);
  });

});
