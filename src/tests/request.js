import supertest from "supertest"
import app from "../../server"
export default supertest.agent(app.listen())
