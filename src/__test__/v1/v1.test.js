const { newSequlize } = require("../../models");
const { newUserCOll } = require("../../models/index");
const { app } = require("../../server");
const supertest = require("supertest");
const req = supertest(app);

beforeAll(async () => {
  try {
    await newSequlize.sync();

    await newUserCOll.create({
      username: "hamza",
      password: "123",
      email: "hamza@gmail.com",
    });
    await newUserCOll.create({
      username: "sham",
      password: "123",
      email: "sham@gmail.com",
    });
    //     await likeCollection.create({
    //       postid: 1,
    //       userid: 1,
    //     });
    //     await newCOmCOll.create({
    //       contant: "nice",
    //       postid: 1,
    //       userid: 1,
    //     });
  } catch (err) {
    console.log(err);
  }
});

afterAll(async () => {
  await newSequlize.drop();
});

let obj = {
  title: "test 10",
  imgurl: "img.png",
  userid: 1,
  contant: "nice challenge",
  challengeName: 1,
};

let like = {
  postid: 1,
  userid: 2,
};

let comment = {
  contant: "nice",
  postid: 1,
  userid: 2,
};

describe("v1 testing ", () => {
  it("can add new post ", async () => {
    const res = await req.post("/v1/newPostCOll").send(obj);
    const res2 = await req.post("/v1/newPostCOll").send(obj);
    const res3 = await req.post("/v1/likeCollection").send(like);
    const res4 = await req.post("/v1/newCOmCOll").send(comment);

    expect(JSON.parse(res.text).data.title).toBe("test 10");
  });

  it("can get all post ", async () => {
    const res = await req.get("/v1/newPostCOll");

    expect(JSON.parse(res.text).length).toBe(2);
  });

  it("can get one post ", async () => {
    const res = await req.get("/v1/newPostCOll/1");

    expect(JSON.parse(res.text).data.title).toBe("test 10");
  });

  it("can update one post ", async () => {
    let obj = {
      title: "test 1",
      imgurl: "img.png",
      userid: 1,
      contant: "nice challenge",
      challengeName: 1,
    };

    const res = await req.put("/v1/newPostCOll/1").send(obj);

    expect(JSON.parse(res.text).data.title).toBe("test 1");
  });

  it("can update one post ", async () => {
    let obj = {
      title: "test 99",
      imgurl: "img.png",
      userid: 1,
      contant: "nice challenge",
      challengeName: 1,
    };

    const res = await req.patch("/v1/newPostCOll/1").send(obj);

    expect(JSON.parse(res.text).data.title).toBe("test 99");
  });

  it("can get all post with comments and likes", async () => {
    const res = await req.get("/getallPostUser/1");

    expect(JSON.parse(res.text).posts.length).toBe(2);
  });

  it("can get all post with comments and likes", async () => {
    const res = await req.get("/getAllPostData/1");

    console.log(JSON.parse(res.text)[0].likes.length);
    console.log(JSON.parse(res.text)[0].comments.length);
    expect(JSON.parse(res.text)[0].likes.length).toBe(1);
    expect(JSON.parse(res.text)[0].comments.length).toBe(1);
    //
  });

  it("can get all post with comments and likes", async () => {
    const res = await req.get("/getRelation/newUserCOll/posts/1");

    expect(JSON.parse(res.text).posts.length).toBe(2);
    //
  });

  it("can delete one post ", async () => {
    const res = await req.delete("/v1/newPostCOll/1");
    expect(res.statusCode).toBe(204);
  });
});
