import Koa from "koa"
import router from "./src/routes"
import bodyparser from "koa-bodyparser"
const app = new Koa()
app.use(bodyparser()).use(router.routes())
export default app
