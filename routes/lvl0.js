import Express from "express"

const router = Express.Router()

router.get("/",(req,res)=>{
    res.render("a")
})

router.get("/in",(req,res)=>{
    if(req.isAuthenticated()){
        res.render("welcome")
    }else{
        res.render("a")
    }
})

export default router