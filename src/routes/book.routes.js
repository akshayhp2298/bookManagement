import { checkRole } from "../middleware/checkRole.middleware"
export default Router => {
  const router = new Router({
    prefix: "/book"
  })
  router.post("/add", checkRole, ctx => {
    ctx.body = { done: true }
  })
  return router
}
