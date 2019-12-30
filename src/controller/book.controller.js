import { createBook } from "../../DB/book.db"
import uuid from "uuid/v1"
exports.addBook = async ctx => {
  const { title, author } = ctx.request.body
  const { user } = ctx.state
  const bid = uuid()
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
