import Express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";

import Pin from "./models/pin.js";

import lvl0Router from "./routes/lvl0.js";
import lvl1Router from "./routes/lvl1form.js";
import lvl1PinRouter from "./routes/lvl1pin.js";
import lvl1LogRouter from "./routes/lvl1log.js";



const app = Express()

app.set("view engine","ejs")

app.use(session({
    saveUninitialized:false,
    resave:false,
    secret:"authenticationprojectsecretkeyforsessionencryption"
}))
app.use(Express.static("public"))
app.use(Express.json())
app.use(Express.urlencoded({extended:true}))

app.use(passport.initialize())
app.use(passport.session())


mongoose.connect("mongodb://localhost:27017/auth")
.then(console.log("local mongo connected"))


passport.use(Pin.createStrategy());
passport.serializeUser(Pin.serializeUser());
passport.deserializeUser(Pin.deserializeUser());

app.use("/",lvl0Router)
app.use("/level-1",lvl1Router)
app.use("/level-1/setPin",lvl1PinRouter)
app.use("/level-1/login",lvl1LogRouter)

app.listen(3000,()=>{
    console.log("running")
})