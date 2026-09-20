import * as authService from "../service/auth.service.js";
import {toMS} from "../../../common/utils/time.js";
export const register=async (req,res,next) => {
    try{
       const user= await authService.register(req.body);
       res.status(201).json({
           message:"user registered successfully",
           success:true,
           data:user,
       })
    }catch(err){
        next(err);
    }
}
export async function verifyAccount(req,res,next){
    try{
       const { email,code } = req.body;
       const user= await authService.verifyAccount(email,code);
       res.status(201).json({
           message:"user verified successfully",
           success:true,
           data:user,
       })
    }catch(err){
        next(err);
    }
}
export async function login(req,res,next){
    try{
        const {email,password} = req.body;
        const token= await authService.login(email,password);
        res.cookie("access-token",token,{httpOnly:true,maxAge:toMS(1, 'hours')});
        res.status(200).json({
            message:"user login successfully",
            success:true,
        })
    }catch(err){
        next(err);
    }
}
export async function sendOTP(req,res,next){
    try{
        const {email} = req.body;
        await authService.sendOTP(email);
        res.status(200).json({
            message:"otp sent successfully",
            success:true,
        })
    }catch(err){
        next(err);
    }
}