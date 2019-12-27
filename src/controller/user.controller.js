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
exports.getSelf = async ctx => {
  const user = await getUserByUid(ctx.state.user.uid)
  ctx.body = { user }
}

exports.createUser = async ctx => {
  const { name, email, password } = ctx.request.body
  const uid = uuid()
  await createUser({ uid, name, email, password: md5(password) })
  ctx.body = { done: true, message: "user created", uid }
}

exports.validateLogin = async ctx => {
  const user = await getUserByEmail(ctx.request.body.email)
  const password = md5(ctx.request.body.password)
  password !== user.password && ctx.throw(401, "Authentication Error")
  const code = {
    uid: user.uid,
    ownerId: user.loginAs
      ? loginAs.ownerId
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
  let token = getToken(code)
  await updateUser(user.uid, { loginAs: code })
  ctx.body = { done: true, token }
}

exports.addOwner = async ctx => {
  const { role, ownerId } = ctx.request.body
  const ownerDetail = {
    uid: ownerId,
    role
  }
  const teamDetail = ctx.state.user.uid
  await addOwner(ctx.state.user.uid, ownerDetail)
  await addTeamMember(ownerId, teamDetail)
  ctx.body = { done: true, message: "owner added" }
}
