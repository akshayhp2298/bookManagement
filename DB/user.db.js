import mongoDB from "./index"
exports.getUserByEmail = email => {
  mongoDB
    .db("bookManagement")
    .collection("user")
    .find({ email })
}
