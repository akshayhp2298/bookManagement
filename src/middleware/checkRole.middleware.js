import jwt from "../Auth"

//check user has access to book or not
exports.checkRole = (ctx, next) => {
  try {
    const token = ctx.req.headers.authorization
    let decoded = jwt.verify(token, process.env.SECRETKEY)
    if (decoded.role === "C") throw { message: "access denied" }
    ctx.state.user = decoded
    return next()
  } catch (err) {
    console.log(err)
    ctx.throw(401, err.message)
  }
}
