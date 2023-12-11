import Express from "express";
import L1_person from "../models/lvl-1.js";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import Pin from "../models/pin.js";

const router = Express()

//passport.use(new LocalStrategy(Pin.authenticate()));


router.get("/",(req,res)=>{
    res.render("b1")
})

// router.post("/",(req,res)=>{
//     // const user = await L1_person.findOne({email:req.body.mail})
//     // if(user){
//     //     if(await bcrypt.compare(req.body.pass,user.password)){
//     //         res.send(user)
//     //     }else {
//     //         res.send("wrong password")
//     //     }
//     // }else{
//     //     res.send("user not found")
//     // }
//     passport.authenticate("local", function (err, Pin) { 
//         if (err) { 
//             res.json({ success: false, message: err }); 
//         } 
//         else { 
//             if (!Pin) { 
//                 res.json({ success: false, message: "username or password incorrect" }); 
//             } 
//             else { 
//                 res.send("logged inn")    
//             } 
//         } 
//     }),(req, res)

// })
// router.post("/",function (req, res) { 
//     if (!req.body.name) { 
//         res.json({ success: false, message: "Username was not given" }) 
//     } 
//     else if (!req.body.pass) { 
//         res.json({ success: false, message: "Password was not given" }) 
//     } 
//     else { 
//         passport.authenticate("local", function (err, user, info) { 
//             if (err) { 
//                 res.json({ success: false, message: err }); 
//             } 
//             else { 
//                 if (!user) { 
//                     res.json({ success: false, message: "username or password incorrect" }); 
//                 } 
//                 else { 
//                     const token = jwt.sign({ userId: user._id, username: user.username }, secretkey, { expiresIn: "24h" }); 
//                     res.json({ success: true, message: "Authentication successful", token: token }); 
//                 } 
//             } 
//         })(req, res); 
//     } 
// }); 

router.post('/', passport.authenticate('local', {
    successRedirect: '/in',
    failureRedirect: '/level-1/login',
  }), (req, res) => {
  });

export default router