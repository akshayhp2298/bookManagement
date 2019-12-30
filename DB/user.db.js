import mongoDB from "./index"
const db = "bookManagement"
const collection = "user"

//get user by uid
exports.getUserByUid = uid =>
  mongoDB
    .db(db)
    .collection(collection)
    .findOne({ uid })

//get user by email
exports.getUserByEmail = email =>
  mongoDB
    .db(db)
    .collection(collection)
    .findOne({ email })

//create new user
exports.createUser = user =>
  mongoDB
    .db(db)
    .collection(collection)
    .insertOne(user)

//get count of ownerDetails and are not owner
exports.getOwnerDetails = (uid, ownerId) =>
  mongoDB
    .db(db)
    .collection(collection)
    .countDocuments({ uid, "ownerDetails.uid": ownerId })

//add owner to team member,client, admin
exports.addOwner = (uid, doc) =>
  mongoDB
    .db(db)
    .collection(collection)
    .updateOne({ uid }, { $push: { ownerDetails: doc } })

//add team member in owner
exports.addTeamMember = (uid, tUid) =>
  mongoDB
    .db(db)
    .collection(collection)
    .updateOne({ uid }, { $push: { teamDetails: tUid } })

//check user is owner or not by teamDetails field
exports.isTeamDetailsExists = uid =>
  mongoDB
    .db(db)
    .collection(collection)
    .countDocuments({ uid, teamDetails: { $exists: true } })

//update user 
exports.updateUser = (uid, doc) =>
  mongoDB
    .db(db)
    .collection(collection)
    .updateOne({ uid }, { $set: doc })

//get roles of user to particular owner
exports.getRoleAccess = (uid, ownerId) =>
  mongoDB
    .db(db)
    .collection(collection)
    .findOne(
      { uid, "ownerDetails.uid": ownerId },
      { projection: { _id: 0, "ownerDetails.role": 1, ownerDetails: { $elemMatch: { uid:ownerId } } } }
    )
