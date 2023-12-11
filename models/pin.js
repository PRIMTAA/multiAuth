import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose"

const pinSchema = new mongoose.Schema({
    username : String,
})

pinSchema.plugin(passportLocalMongoose)

const Pin = new mongoose.model("Pin", pinSchema)

export default Pin