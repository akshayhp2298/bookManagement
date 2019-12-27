import Router from "koa-router"
const router = new Router({ prefix: `/api` })
import userRouter from "./user.routes"
import bookRouter from "./book.routes"

const routers = [userRouter,bookRouter]

router.get("/", () => console.log("hello go"))
routers.forEach(route => router.use(route(Router).routes()))
export default router
