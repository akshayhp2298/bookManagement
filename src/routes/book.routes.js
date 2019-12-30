import { checkRole } from "../middleware/checkRole.middleware"
import validate from "../middleware/validate"
import {
  validateBook,
  validateBookAccessDetails,
  validateRoleToAddAccess,
  validateBookRoleExists
} from "../validator/book.validator"
import { addBook, addAccessToBook } from "../controller/book.controller"
export default Router => {
  const router = new Router({
    prefix: "/book"
  })

  router.post("/add", checkRole, validate([validateBook]), addBook)

  router.post(
    "/add/access",
    checkRole,
    validate([
      validateBookAccessDetails,
      validateBookRoleExists,
      validateRoleToAddAccess
    ]),
    addAccessToBook
  )
  return router
}
