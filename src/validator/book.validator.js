import { error, nameValidator } from "./user.validator"
import { getRoleCountOfBook } from "../../DB/book.db"

//validate book's field title and author
exports.validateBook = ctx => {
  const { title, author } = ctx.request.body
  if (typeof title !== "string" || typeof author !== "string")
    return error("title or author is not valid", "title or author")
  if (!title) return error("title not found", "title")
  if (!nameValidator.test(title)) return error("title is not valid", "title")
  if (!author) return error("title not found", "title")
  if (!nameValidator.test(author)) return error("author is not valid", "author")
  return null
}

//validate user has access to book or not  
exports.validateBookAccessDetails = ctx => {
  const { bid, uid } = ctx.request.body
  const { role } = ctx.state.user
  if (role === "C" || role === "T") return error("access denied", "")
  if (typeof bid !== "string" || typeof uid !== "string")
    return error("bid or uid is not valid", "bid or uid")
  if (!bid) return error("bid not found", "bid")
  if (!uid) return error("uid is not valid", "uid")
  return null
}

//validate user has access to add access(admin and owner)
exports.validateRoleToAddAccess = async ctx => {
  const cnt = await getRoleCountOfBook(ctx.request.body.bid, ctx.state.user.uid)
  if (!cnt) {
    return error("access denied", "")
  }
  return null
}

//validate user has already access
exports.validateBookRoleExists = async ctx => {
  const cnt = await getRoleCountOfBook(
    ctx.request.body.bid,
    ctx.request.body.uid
  )
  if (cnt) {
    return error("roll already added", "")
  }
  return null
}
