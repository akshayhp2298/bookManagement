import mongodb from "mongodb"
import 'dotenv/config'
const MongoClient = mongodb.MongoClient
const mongoDB = new MongoClient(process.env.DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  promiseLibrary: Promise
})
mongoDB.connect()
export default mongoDB