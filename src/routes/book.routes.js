import { checkRole } from "../middleware/checkRole.middleware"
import validate from "../middleware/validate"
import { validateBook } from "../validator/book.validator"
import { addBook } from "../controller/book.controller"
export default Router => {
  const router = new Router({
    prefix: "/book"
  })
  router.post("/add", checkRole, validate([validateBook]), addBook)
  return router
}
