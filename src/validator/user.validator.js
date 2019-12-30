import {
  getUserByEmail,
  getOwnerDetails,
  isTeamDetailsExists,
  getUserByUid
} from "../../DB/user.db"

export const error = (message, field) => {
  const err = new Error(message)
  err.field = field
  return err
}
const passwordValidator = new RegExp(
  "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
)
const emailValidator = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)
exports.nameValidator = new RegExp(/^[a-zA-Z ]{2,30}$/)

exports.validateName = ctx => {
  const { name } = ctx.request.body
  if (typeof name !== "string")
    return { message: "name is not valid", field: "name" }
  if (!name) return { message: "name not found", field: "name" }
  if (!nameValidator.test(name)) return error("name is not valid", "name")
  return null
}
exports.validatePassword = ctx => {
  const { password } = ctx.request.body
  if (typeof password !== "string")
    return { message: "password is not valid", field: "password" }
  if (!password) return { message: "password not found", field: "password" }
  if (!passwordValidator.test(password))
    return error("password is not valid", "password")
  return null
}
exports.validateEmail = ctx => {
  const { email } = ctx.request.body
  if (typeof email !== "string")
    return { message: "email is not valid", field: "email" }
  if (!email) return { message: "email not found", field: "email" }
  if (!emailValidator.test(email)) return error("email is not valid", "email")
  return null
}
exports.isEmailExists = async ctx => {
  const tmp = ctx.request.href.split("/")
  const login = tmp[tmp.length - 1]
  const { email } = ctx.request.body
  const user = await getUserByEmail(email)
  if (login === "login") {
    if (!user) return error("email is not exists", "email")
    ctx.state.user = user
    return null
  }
  if (user) return error("email is already exists", "email")
  ctx.state.user = user
  return null
}

exports.validateAddOwnerDetails = async ctx => {
  const { ownerId, role } = ctx.request.body
  if (!ownerId && !role) {
    return error("ownerId or role not found", "ownerId or role")
  }
  return null
}

exports.validateOwnerIdAndRole = async ctx => {
  const { ownerId, role } = ctx.request.body
  const user = await getUserByUid(ctx.state.user.uid)
  const bool = user.ownerDetails.filter(e => e.uid === ownerId)
  if (!bool) return error("ownerId not found")
  return null
}

exports.checkAlreadyAdded = async ctx => {
  const ownerDetails = await getOwnerDetails(
    ctx.state.user.uid,
    ctx.request.body.ownerId
  )
  if (ownerDetails) {
    return error("owner already added", "ownerDetails")
  }
  return null
}

exports.isOwner = async ctx => {
  let teamDetails = await isTeamDetailsExists(ctx.state.user.uid)
  if (teamDetails) {
    return error("you are owner, you cant be a member of others", "teamDetails")
  }
  return null
}
