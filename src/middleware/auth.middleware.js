import jwt from "../Auth"
exports.validateToken = (ctx, next) => {
  try {
    const token = ctx.req.headers.authorization
    let decoded = jwt.verify(token, process.env.SECRETKEY)
    ctx.state.user = decoded
    return next()
  } catch (err) {
    ctx.throw(401, "token not valid")
  }
}
