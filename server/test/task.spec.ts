const app = require("../server");
import request from "supertest";
import _ from "lodash";

let token = "";
// Add a new user
test("Add a User", async () => {
  await request(app)
    .post("/adduser")
    .send({
      username: "testuser",
      password: "testuser",
    })
    .expect(200);
});

// Login as user and get JWT token
test("Login as test user", async () => {
  const res = await request(app).post("/login").send({
    username: "testuser",
    password: "testuser",
  });
  token = _.get(res, "body.token", "");
  expect(res.status).toEqual(200);
});

test("Add task", async () => {
  const res = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Test task for testuser",
    })
    .expect(200);
});
