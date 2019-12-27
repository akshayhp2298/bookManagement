import mongodb from 'mongodb'
const MongoClient = mongodb.mongoClient
const mongoDB = new MongoClient(process.env.DBURL,{useNewUrlParser:true})
mongoDB.connect()
export default mongoDB