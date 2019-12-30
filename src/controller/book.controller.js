import { createBook, addAccessToBook } from "../../DB/book.db"
import { getRoleAccess } from "../../DB/user.db"

import uuid from "uuid/v1"

//add book
exports.addBook = async ctx => {
  const { title, author } = ctx.request.body
  const { user } = ctx.state
  const bid = uuid()
  //accessType according to role of user
  const accessType =
    user.role === "A" || user.role === "O"
      ? "O"
      : user.role === "C"
      ? "R"
      : user.role === "T"
      ? "W"
      : "-"
  const access = { uid: user.uid, accessType }
  await createBook({ bid, title, author, access })
  ctx.body = { message: "book created", book: { bid, title, author, access } }
}

//add access for user to book
exports.addAccessToBook = async ctx => {
  const { bid, uid } = ctx.request.body
  //get role of user given by owner or admin
  let userRole = await getRoleAccess(uid, ctx.state.user.uid)
  userRole = userRole.ownerDetails[0]
  //accessType according to user
  const accessType =
    userRole.role === "A"
      ? "O"
      : userRole.role === "O"
      ? "O"
      : userRole.role === "T"
      ? "W"
      : userRole.role === "C"
      ? "R"
      : "asasas"
  await addAccessToBook(bid, { uid, accessType })
  ctx.body = { done: true }
}
