const Sequelize = require("sequelize")
let sequelize = new Sequelize("4ReV3WPZQD", "4ReV3WPZQD", "57m6yB3b1t", {
  host: "remotemysql.com",
  dialect: "mysql"
})
sequelize
  .authenticate()
  .then(function(err) {
    console.log("Connection has been established successfully.")
  })
  .catch(function(err) {
    console.log("Unable to connect to the database:", err)
  })
const Model = Sequelize.Model
class User extends Model {}
User.init(
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING
    }
  },
  {
    sequelize,
    modelName: "user"
  }
)
// User.sync().then(() => {
//   // Now the `users` table in the database corresponds to the model definition
//   // return User.create({
//   //   firstName: 'John',
//   //   lastName: 'Hancock'
//   // });
// })
const add = async (firstName,lastName) =>
  await User.create({ firstName, lastName }).then(data =>
    console.log(data)
  )
const get =  async () =>
    await User.findAll({ raw: true })
// add()
async function show() {
    await add("a","b")
    const data = await get()
    console.log(data)
}
show()
