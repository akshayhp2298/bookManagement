export default Router =>{
    const router = new Router({
        prefix:"/user"
    })
    router.get("/",()=>console.log("in user"))
    return router
}