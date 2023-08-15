"use strict";

const { app } = require("../../server");
const supertest = require("supertest");
const req = supertest(app);
const { newSequlize, newUserCOll, newPostCOll, report, comment } = require("../../models/index");
const jwt = require("jsonwebtoken");

beforeAll(async () => {
  try {
    await newSequlize.sync();

    //admin
    await newUserCOll.create({
      username: "sham",
      password: "s123",
      email: "test@gmail.com",
      role: "admin",
    });

    //user2
    await newUserCOll.create({
      username: "moh",
      password: "s123",
      email: "sham@email.com",
    });

    //user3
    await newUserCOll.create({
      username: "blackangel",
      password: "s123",
      email: "blackangel@email.com",
    });
    
    //user4
    await newUserCOll.create({
      username: "liam",
      password: "s123",
      email: "liam432@gmail.com",
    });

    //user3 post
    await newPostCOll.create( {
      imgurl: "catsimge.png",
      userid: 3,
      title: "cats playing with a laser",
      contant: "i took photos of my cats while they were playing with a laser"
    });
    
    //user4 comment
    await comment.create( {
      contant: "#$@#*",
      userid: 2,
      postid: 1
    });

    //user2 post report
    await report.create({
      userId: 2,
      actionId: 1,
      actionType: "post"
    });

    //user2 comment report
    await report.create({
      userId: 2,
      actionId: 1,
      actionType: "comment"
    });
    
  } catch (err) {
    console.log(err);
  }
});

afterAll(async () => {
  await newSequlize.drop();
});

describe("search test", () => {
  const token = jwt.sign({ userId: 1, role: "admin" },process.env.SECRET || 2000);

  //challenges :--------------
  it("publish a challenge by an admin", async () => {
    const obj = {
      title: "test 3",
      brief: "also test",
      prize: "arms",
      startDate: "2023-08-03T12:00:00Z",
      endDate: "2023-08-03T12:00:00Z",
      rules: ["rule1 , rule2"],
      imgurl: "img.png",
    };

    let data = await req
      .post("/admin/challenge")
      .send(obj)
      .set("Authorization", `Bearer ${token}`);
    let res = JSON.parse(data.text).title;

    expect(res).toBe("test 3");
    expect(data.status).toBe(201);
  });

  it("the admin can get a specific challenge with its posts", async () => {

    //user3 created another post but this post is for challenge with ID of 1
    await newPostCOll.create( {
      imgurl: "roma081232.png",
      userid: 3,
      title: "I went to Rome",
      contant: "Iwent to Rome and it was the firsts time..",
      challengeID: 1
    });
    
    const response = await req.get("/admin/getRelation/challenagesCollection/posts/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)["id"]).toEqual(1);
    expect(JSON.parse(response.text)["posts"].length).toBe(1);
  });
  
  //reports:--------------
  it("the admin can get all the reports", async () => {
    
    const response = await req.get("/admin/report").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(JSON.parse(response.text).length).toEqual(2);
  });

  it("the admin can get a specific report", async () => {
    
    const response = await req.get("/admin/report/1").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)["id"]).toEqual(1);
  });
  
  it("the admin can delete a report", async () => {
    
    const response = await req.delete("/admin/report/2").set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(204);
  });
  
  //get all the posts, along with the comments, likes and replies:--------------
  it("the admin can get all the posts along with their comments, likes and replies", async () => {
    
    const response = await req.get("/admin/getAllPostDataWithReplies").set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)[0]).toHaveProperty("comments");
    expect(JSON.parse(response.text)[0]).toHaveProperty("likes");
    expect(JSON.parse(response.text)[0]["comments"][0]).toHaveProperty("replys");
  });
  
  //get a specific user along with all their posts, comments and likes:--------------
  it("the admin can get a specific user details along with their posts, comments and likes", async () => {
    
    const response = await req.get("/admin/getallPostUser/3").set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)).toHaveProperty("posts");
    expect(JSON.parse(response.text)["posts"][0]).toHaveProperty("comments");
    expect(JSON.parse(response.text)["posts"][0]).toHaveProperty("likes");
  });

  //add, get, delete and update users, posts, comments, likes and replies.. etc
  // !! for example here the admin will deal with posts !!
  it("the admin can add a post", async () => {

    const obj = {
      imgurl: "image09483932.png",
      userid: 1,
      title: "important announcement",
      contant: "important announcement..."
    }
    
    const response = await req.post("/admin/newPostCOll").set("Authorization", `Bearer ${token}`).send(obj);
        
    expect(response.status).toBe(201);
    expect(JSON.parse(response.text)["data"]["title"]).toBe("important announcement");
  });

  it("the admin can get all the posts", async () => {

    const response = await req.get("/admin/newPostCOll").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)["data"].length).toBe(3);
  });

  it("the admin can update a post", async () => {

    const obj = {
      imgurl: "image09483932.png",
      userid: 1,
      title: "important announcement for all users",
      contant: "important announcement..."
    }
    
    const response = await req.put("/admin/newPostCOll/3").set("Authorization", `Bearer ${token}`).send(obj);
    
    expect(response.status).toBe(203);
    expect(JSON.parse(response.text)["data"]["title"]).toBe("important announcement for all users");
  });
  
  it("the admin can delete a certain post", async () => {

    const response = await req.delete("/admin/newPostCOll/2").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});

