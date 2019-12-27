import Koa from "koa"
import router from './src/routes'
const app = new Koa()
app.use(router.routes())
export default app
