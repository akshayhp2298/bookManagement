import app from "./server"
import "dotenv/config"
const port = process.env.PORT
app.listen(port, () => console.log(`server running on ${port}`))
