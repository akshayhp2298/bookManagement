import mongoDB from "./index"
const db = "bookManagement"
const collection = "books"

//create new book
exports.createBook = book =>
  mongoDB
    .db(db)
    .collection(collection)
    .insertOne(book)

//get book by bid
exports.getBookById = bid =>
  mongoDB
    .db(db)
    .collection(collection)
    .findOne({ bid })

//get count of roll which match bid and uid
exports.getRoleCountOfBook = (bid, uid) =>
  mongoDB
    .db(db)
    .collection(collection)
    .countDocuments({ bid, "access.uid": uid })

//add access to book
exports.addAccessToBook = (bid, access) =>
  mongoDB
    .db(db)
    .collection(collection)
    .updateOne({ bid }, { $push: { access: access } })
