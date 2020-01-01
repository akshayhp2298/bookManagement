const blueBird = require("bluebird")

module.exports = validators => async (ctx, next) => {
  const errors = []
  const results = await blueBird.map(validators, async validator => {
    return await validator(ctx, next)
  })
  results.forEach(
    result =>
      result && errors.push({ message: result.message, field: result.field })
  )
  const properties = {
    reasons: errors.map(err => ({
      message: err.message,
      field: err.field
    }))
  }
  if (errors.length !== 0) {
    // ctx.type = 'json'
    // ctx.throw(400, "validation failed", JSON.stringify(properties))
    ctx.status = 401
    const res = {
      status: ctx.status,
      message: "validation failed",
      reasons: properties.reasons
    }
    ctx.body = res
    return
  }
  return next()
}