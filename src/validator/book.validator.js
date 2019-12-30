import { error, nameValidator } from "./user.validator"

exports.validateBook = ctx => {
  const { title, author } = ctx.request.body
  if (typeof title !== "string" || typeof author !== "string")
    return { message: "title or author is not valid", field: "title or author" }
  if (!title) return { message: "title not found", field: "title" }
  if (!nameValidator.test(title)) return error("title is not valid", "title")
  if (!author) return { message: "title not found", field: "title" }
  if (!nameValidator.test(author)) return error("author is not valid", "author")
  return null
}

