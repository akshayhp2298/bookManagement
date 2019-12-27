import jwt from "jsonwebtoken"

exports.getToken = user => {
  return jwt.sign(user, process.env.SECRETKEY)
}
export default jwt
