import mongoose, {Schema,model} from "mongoose";
const otpSchema = new Schema({
    value:{
        type:String,
        required:true,
        length:6
    },
    email:{
        type:String,
        required:true,
    },
    expiresAt:{
        type:Date,
        expires:0
    }
},{
    timestamps: {createdAt:true},
});
export const Otp=mongoose.model("Otp",otpSchema);