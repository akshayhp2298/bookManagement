import mongoDB from "./index"
const db = "bookManagement"
const collection = "books"

exports.createBook = book =>
  mongoDB
    .db(db)
    .collection(collection)
    .insertOne(book)

exports.getBookById = bid =>
  mongoDB
    .db(db)
    .collection(collection)
    .findOne({ bid })

exports.getRoleCountOfBook = (bid, uid) =>
  mongoDB
    .db(db)
    .collection(collection)
    .countDocuments({ bid, "access.uid": uid })

exports.addAccessToBook = (bid, access) =>
  mongoDB
    .db(db)
    .collection(collection)
    .updateOne({ bid }, { $push: { access: access } })
