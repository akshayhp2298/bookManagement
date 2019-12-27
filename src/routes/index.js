import Router from "koa-router"
const router = new Router({ prefix: `/api` })
import userRouter from "./user.routes"
const routers = [userRouter]

router.get("/", () => console.log("hello go"))
routers.forEach(route => router.use(route(Router).routes()))
export default router
