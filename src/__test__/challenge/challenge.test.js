// const { newSequlize } = require("../models");
const {newUserCOll,newSequlize,newPostCOll,challenagesCollection,} = require("../../models/index");
const { app } = require("../../server");
const supertest = require("supertest");
const req = supertest(app);
try {
  beforeAll(async () => {
    await newSequlize.sync();

    await newUserCOll.create({
      username: "hamza",
      password: "123",
      email: "ehab@gmail.com",
    });
    await newUserCOll.create({
      username: "sham",
      password: "123",
      email: "ehab@gmail.com",
    });

    await challenagesCollection.create({
      imgurl: "img.png",
      title: " challenge 1",
      brief: "  any thing",
      startDate: null,
      endDate: null,
      rules: ["rule 1", "rule 2"],
    });
    await challenagesCollection.create({
      imgurl: "img.png",
      title: " challenge 2",
      brief: "  any thing",
      startDate: null,
      endDate: null,
      rules: ["rule 1", "rule 2"],
    });

    await newPostCOll.create({
      imgurl: "img.png",
      userid: 1,
      title: "any thing",
      contant: "for challenge 1",
      category: null,
      challengeName: null,
      challengeID: 1,
    });
  });
} catch (err) {
  console.log(err, "====================================");
}

afterAll(async () => {
  await newSequlize.drop();
});

describe("challenge test ", () => {
  it("check if the challenge created", async () => {
    const res = await req.get("/v1/challenagesCollection");

    console.log(JSON.parse(res.text).data[0].title); //' challenge 1'

    expect(JSON.parse(res.text).data[0].title).toBe(" challenge 1");
  });
  it("check if the challenge created", async () => {
    const res = await req.get("/getRelation/challenagesCollection/posts/1");

    console.log(JSON.parse(res.text).posts[0].contant); // 'for challenge 1'

    expect(JSON.parse(res.text).posts[0].contant).toBe("for challenge 1");
  });
});
