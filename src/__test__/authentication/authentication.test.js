const { app } = require("../../server");
const supertest = require("supertest");
const req = supertest(app);

describe("auth tests", () => {
  it("sign up  test ", async () => {
    const res = await req.post("/signup").send({
      username: "hamza",
      password: "123",
      email: "ehab@gmail.com",
    });
    console.log(res.test);
  });
});
