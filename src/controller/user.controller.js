import uuid from "uuid/v1"
import md5 from "md5"
import { getToken } from "../../Auth"
import {
  getUserByEmail,
  createUser,
  addOwner,
  addTeamMember,
  getUserByUid,
  updateUser
} from "../../DB/user.db"

//switch token to change owner
exports.switchToken = async ctx => {
  const { ownerId, role } = ctx.request.body
  const { uid } = ctx.state.user
  const code = {
    uid,
    ownerId,
    role
  }
  let token = getToken(code)
  ctx.body = { response: { token } }
}

//get user data
exports.getSelf = async ctx => {
  const user = await getUserByUid(ctx.state.user.uid)
  ctx.body = { user }
}

//create new user
exports.createUser = async ctx => {
  const { name, email, password } = ctx.request.body
  const uid = uuid()
  await createUser({ uid, name, email, password: md5(password) })
  ctx.body = { done: true, message: "user created", uid }
}

//validate login
exports.validateLogin = async ctx => {
  const user = await getUserByEmail(ctx.request.body.email)
  const password = md5(ctx.request.body.password)
  password !== user.password && ctx.throw(401, "Authentication Error")
  //login details with loginAs field that provides ownerDetails and role 
  const loginDetails = {
    uid: user.uid,
    ownerId: user.loginAs
      ? user.loginAs.uid
      : user.teamDetails
      ? user.uid
      : user.ownerDetails
      ? user.ownerDetails[0].ownerId
      : "",
    role: user.loginAs
      ? user.loginAs.role
      : user.teamDetails
      ? "O"
      : user.ownerDetails
      ? user.ownerDetails[0].role
      : ""
  }
  let token = getToken(loginDetails)
  await updateUser(user.uid, { loginAs: loginDetails })
  ctx.body = { done: true, token }
}

//add owner to user
exports.addOwner = async ctx => {
  const { role, ownerId } = ctx.request.body
  const ownerDetail = {
    uid: ownerId,
    role: role.toUpperCase()
  }
  const teamDetail = ctx.state.user.uid
  //add ownerDetails in current loggedIn user
  await addOwner(ctx.state.user.uid, ownerDetail)
  //add teamDetails in owner
  await addTeamMember(ownerId, teamDetail)
  ctx.body = { done: true, message: "owner added" }
}
