import mongoDB from "./index"
const db = "bookManagement"
const collection = "user"

exports.getUserByUid = uid =>
  mongoDB
    .db(db)
    .collection(collection)
    .findOne({ uid })
exports.getUserByEmail = email =>
  mongoDB
    .db(db)
    .collection(collection)
    .findOne({ email })

exports.createUser = user =>
  mongoDB
    .db(db)
    .collection(collection)
    .insertOne(user)

exports.getOwnerDetails = (uid, ownerId) =>
  mongoDB
    .db(db)
    .collection(collection)
    .countDocuments({ uid, "ownerDetails.uid": ownerId })

exports.addOwner = (uid, doc) =>
  mongoDB
    .db(db)
    .collection(collection)
    .updateOne({ uid }, { $push: { ownerDetails: doc } })

exports.addTeamMember = (uid, tUid) =>
  mongoDB
    .db(db)
    .collection(collection)
    .updateOne({ uid }, { $push: { teamDetails: tUid } })

exports.isTeamDetailsExists = uid =>
  mongoDB
    .db(db)
    .collection(collection)
    .countDocuments({ uid, teamDetails: { $exists: true } })

exports.updateUser = (uid, doc) =>
  mongoDB
    .db(db)
    .collection(collection)
    .updateOne({ uid }, { $set: doc })

exports.getRoleAccess = (uid, ownerId) =>
  mongoDB
    .db(db)
    .collection(collection)
    .findOne(
      { uid, "ownerDetails.uid": ownerId },
      { projection: { _id: 0, "ownerDetails.role": 1, ownerDetails: { $elemMatch: { uid:ownerId } } } }
    )
