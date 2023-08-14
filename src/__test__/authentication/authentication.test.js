const { app } = require("../../server");
const supertest = require("supertest");
const req = supertest(app);
const jwt = require('jsonwebtoken')
const { newSequlize, newUserCOll, newPostCOll, likeCollection, newCOmCOll } = require('../../models/index')
const token = jwt.sign({ userId: 1 }, process.env.SECRET || 'hamza');
beforeAll(async () => {
  await newSequlize.sync();
  await newUserCOll.create({ username: 'hamza', password: '123', email: "hamza@gmail.com" })
  await newUserCOll.create({ username: 'mohammed', password: '123', email: "khaled@gmail.com" })
  await newPostCOll.create({ imgurl: "user1 post.png", userid: 1 })
  await newPostCOll.create({ imgurl: "user2 post.png", userid: 2 })
  await newCOmCOll.create({ contant: "test the comment", postid: 1, userid: 1 })
  await likeCollection.create({ postid: 1, userid: 1 })
});

afterAll(async () => {
  await newSequlize.drop();
});
describe("auth tests", () => {
  it("sign up  test ", async () => {
    const res = await req.post("/signup").send({
      username: "khaled",
      password: "123",
      email: "ehab@gmail.com",
    });
    expect(res.status).toBe(200)
  });
  it("login test ", async () => {
    let user = { username: 'hamza', password: '123', email: "hamza@gmail.com" }
    const res = await req.post("/login").auth(user.username, user.password);
    expect(res.status).toBe(200)
  });
  it("home auth test ", async () => {
    const res = await req.get("/v2/home").set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200)
  });
  it("profile dashboard get data auth test ", async () => {
    const res = await req.get("/v2/profile").set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200)
  });
  it("follow auth test ", async () => {
    const res = await req.post("/v2/follow").set('Authorization', `Bearer ${token}`).send({ "following_id": 2 })
    expect(res.status).toBe(201)
  });
  it("unlike auth test ", async () => {
    const res = await req.delete("/likes").set('Authorization', `Bearer ${token}`).send({ postid: 1 })
    expect(res.status).toBe(204)
  });
  it("delete comment auth test ", async () => {
    const res = await req.delete("/comment").set('Authorization', `Bearer ${token}`).send({ postid: 1, commentid: 1 })
    expect(res.status).toBe(204)
  });
  it("delete post auth test ", async () => {
    const res = await req.delete("/post").set('Authorization', `Bearer ${token}`).send({ postid: 1 })
    expect(res.status).toBe(204)
  });
});
