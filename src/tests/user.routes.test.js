import request from "./request"
import { getToken } from "../Auth"
import userDb from "../../DB/user.db"
import uuid from "uuid/v1"
const user = {
  uid: uuid(),
  name: "test",
  email: "test@123.com",
  password: "root@123"
}
const returnUser = {
  uid: user.uid,
  name: "test",
  email: "test@123.com",
  password: "9a69e50114a30c4c5c1d455a2cfb87d1"
}
const jwt = getToken(user)
describe("user route test", () => {
  userDb.createUser = jest.fn()
  userDb.getUserByUid = jest.fn(() => returnUser)
  userDb.getUserByEmail = jest.fn(() => returnUser)
  userDb.updateUser = jest.fn()

  it("should return received", async () => {
    const res = await request.get("/api")
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty("message")
  })

  it("should create user", async () => {
    userDb.getUserByEmail = jest.fn(() => undefined)
    const res = await request.post("/api/user").send(user)
    expect(res.status).toBe(200)
    expect(res.body.done).toBe(true)
    expect(res.body.message).toBe("user created")
    expect(res.body).toHaveProperty("uid")
  })

  it("should return validation failed for user create", async () => {
    const res = await request
      .post("/api/user")
      .send({ name: true, password: true })
    expect(res.status).toBe(401)
    expect(res.body.message).toBe("validation failed")
    expect(res.body).toHaveProperty("reasons")
  })

  it("should return validation failed for user create", async () => {
    const res = await request
      .post("/api/user")
      .send({ name: true, password: "true" })
    expect(res.status).toBe(401)
    expect(res.body.message).toBe("validation failed")
    expect(res.body).toHaveProperty("reasons")
  })

  it("should return unauthorized for get user self", async () => {
    const res = await request.get("/api/user/self").send({})
    expect(res.status).toBe(401)
  })

  it("should return user", async () => {
    const res = await request.get("/api/user/self").set("Authorization", jwt)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty("user")
  })

  it("should return validation failed for login", async () => {
    const res = await request
      .post("/api/user/login")
      .send({ email: "", password: "" })
    expect(res.status).toBe(401)
    expect(res.body).toMatchSnapshot()
  })

  it("should return token for login", async () => {
    userDb.getUserByEmail = jest.fn(() => returnUser)
    const res = await request
      .post("/api/user/login")
      .send({ email: user.email, password: user.password })
    expect(res.status).toBe(200)
    expect(res.body.done).toBe(true)
    expect(res.body).toHaveProperty("token")
  })

  it("should return validation failed for add owner", async () => {
    userDb.getOwnerDetails = jest.fn(() => 1)
    userDb.isTeamDetailsExists = jest.fn(() => 1)
    const res = await request
      .post("/api/user/add/owner")
      .set("Authorization", jwt)
    expect(res.status).toBe(401)
    expect(res.body.message).toBe("validation failed")
    expect(res.body).toHaveProperty("reasons")
  })

  it("should add owner", async () => {
    userDb.getOwnerDetails = jest.fn(() => 0)
    userDb.isTeamDetailsExists = jest.fn(() => 0)
    const res = await request
      .post("/api/user/add/owner")
      .set("Authorization", jwt)
      .send({ ownerId: uuid(), role: "A" })
    console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body.done).toBe(true)
    expect(res.body.message).toBe("owner added")
  })

  it("should return token with given owner", async () => {
    const ownerId = uuid()
    userDb.getUserByUid = jest.fn(() => ({
      ownerDetails: [{ uid: ownerId, role: "A" }],
      ...returnUser
    }))
    const res = await request
      .post("/api/user/switch")
      .set("Authorization", jwt)
      .send({ ownerId, role: "A" })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty("token")
  })
})
