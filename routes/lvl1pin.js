import Express from "express";
import Pin from "../models/pin.js";
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';

const router = Express.Router()

passport.use(new LocalStrategy(Pin.authenticate()));


router.get("/",(req,res)=>{
    if(req.session.userReg.l1reg === true){
        res.render("mainPin")
        delete req.session.userReg.l1reg
    } 
    else res.send("something went wrong during pin setup")
   
  })
  
//   router.post("/",async(req,res)=>{
//     const newPin = new Pin({
//       username: req.session.userReg.regMail
//     });
//     let a = req.body.one+req.body.two+req.body.three+req.body.four+req.body.five+req.body.six
//     Pin.register(newPin, a ,(err)=>{
//         if(err){
//           console.log(err)
//           res.redirect("/")
//         }
//         else{
//             //req.session.destroy()
//             passport.authenticate('local')(req,res,function(){
//               res.send("ok")
//             })
//             }
//     })
//   })

router.post("/", async (req, res) => {
  const newPin = new Pin({ username: req.session.userReg.regMail });

  let pinValue =
    req.body.one +
    req.body.two +
    req.body.three +
    req.body.four +
    req.body.five +
    req.body.six;

  // Use setPassword method provided by passport-local-mongoose to set the password for the user
  newPin.setPassword(pinValue, async (err) => {
    if (err) {
      console.error(err);
      res.redirect("/");
    } else {
      // Save the newPin to the database
      try {
        const savedPin = await newPin.save();
        req.login(savedPin, (loginErr) => {
          if (loginErr) {
            console.error(loginErr);
            res.redirect("/");
          } else {
            res.send("ok");
          }
        });
      } catch (saveErr) {
        console.error(saveErr);
        res.redirect("/");
      }
    }
  });
});


export default router