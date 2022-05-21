import mongoose from "mongoose";

const {ObjectId} = mongoose.Schema.Types;

const karmaWallerSchema =  new mongoose.Schema({
    user:{
        type:ObjectId,
        ref:'User',
    },
    balance:{
        type:Number,
        default:0
    }
},{ timestamps:true });

const KarmaWallet =  mongoose.model('KarmaWallet', karmaWallerSchema);

export default KarmaWallet;