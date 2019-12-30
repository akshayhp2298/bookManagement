import mongoDB from "./index"
const db = "bookManagement"
const collection = "books"

exports.createBook = book =>
  mongoDB
    .db(db)
    .collection(collection)
    .insertOne(book)
