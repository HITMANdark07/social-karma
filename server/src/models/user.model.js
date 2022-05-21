import mongoose from "mongoose";
import KarmaWallet from "./karmaWallet.js";

const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    activated:{
        type:Number,
        default:1,
        emun:[0,1]
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    photo:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        enum:[0,1], // 0 -> server //  1-> user
        default:0
    },
    otp:{
        type:Number,
    },
    verified:{
        type:Number,
        enum:[0,1],
        default:0,
    }
},{ timestamps:true });

userSchema.pre('save', async function() {
    const karmaWallet = new KarmaWallet({
        user: this._id
    })
    await karmaWallet.save();
})

const User =  mongoose.model('User', userSchema);

export default User;