import Express from "express"
import L1_person from "../models/lvl-1.js"
import bcrypt from "bcrypt"

const router = Express.Router()

const saltRounds = 10



router.get("/",(req,res)=>{
    res.render("b")
})

router.post("/",async (req,res)=>{
    const data = new L1_person({
        email : req.body.floating_email,
        password : await bcrypt.hash(req.body.floating_password,saltRounds),
        fName : req.body.floating_first_name,
        lName : req.body.floating_last_name,
        phoneNo : req.body.floating_phone,
        company : req.body.floating_company
    })
    const existingUser = await L1_person.findOne({ email: data.email });

    if (existingUser) {
      res.render("exists")
    } else {
      await data.save();
      req.session.userReg = {
        l1reg : true,
        regMail : data.email,
        creation : Date.now()
      }
      res.redirect("/level-1/setPin")
    }
})


export default router