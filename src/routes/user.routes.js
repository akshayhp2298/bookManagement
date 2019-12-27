import {
  getSelf,
  createUser,
  validateLogin,
  addOwner,
  switchToken
} from "../controller/user.controller"
import validate from "../middleware/validate"
import {
  validateEmail,
  validatePassword,
  isEmailExists,
  validateAddOwnerDetails,
  checkAlreadyAdded,
  isOwner,
  validateOwnerIdAndRole
} from "../validator/user.validator"
import { validateToken } from "../middleware/auth.middleware"
export default Router => {
  const router = new Router({
    prefix: "/user"
  })
  router
    .get("/self", validateToken, getSelf)
    .post(
      "/",
      validate([validateEmail, validatePassword, isEmailExists]),
      createUser
    )
    .post(
      "/login",
      validate([validateEmail, validatePassword, isEmailExists]),
      validateLogin
    )
    .post(
      "/add/owner",
      validateToken,
      validate([validateAddOwnerDetails, isOwner, checkAlreadyAdded]),
      addOwner
    )
    .post(
      "/switch",
      validateToken,
      validate([validateAddOwnerDetails, validateOwnerIdAndRole]),
      switchToken
    )
  return router
}
