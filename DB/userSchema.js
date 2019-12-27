module.exports = mongoDB.createCollection("user", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id", "emailAddress", "name"],
      properties: {
        id: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        emailAddress: {
          bsonType: "string",
          description: "must be a email and is required"
        }
      }
    }
  }
})
