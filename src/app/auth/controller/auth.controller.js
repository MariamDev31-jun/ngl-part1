import * as authService from "../service/auth.service.js";
import {toMS} from "../../../common/utils/time.js";
import {validateBody} from "../../../common/validation/validation.js";
import {loginDTO, registerDTO, resetPasswordDTO, sendOtpDTO, verifyAccountDTO} from "../dto/auth.dto.js";

export const register=async (req,res,next) => {
    try{
        const data =validateBody(registerDTO,req.body)
       const user= await authService.register(data);
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
       const data=validateBody(verifyAccountDTO,req.body);
        const { email,code } = data;
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
        const data=validateBody(loginDTO,req.body);
        const {email,password} = data;
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
        const data=validateBody(sendOtpDTO,req.body);
        const {email} = data;
        await authService.sendOTP(email);
        res.status(200).json({
            message:"otp sent successfully",
            success:true,
        })
    }catch(err){
        next(err);
    }
}
export async function resetPassword(req,res,next){
try{
    const data=validateBody(resetPasswordDTO,req.body);
    const {email,code,newPassword} = data;
    const user=await authService.resetPassword(email,code,newPassword);
    res.status(200).json({
        message:"user reset successfully",
        success:true,
        user:user
    })
    }catch (err){
    next(err);
}

}
export async function   loginWithGoogle(req,res,next){
    try{
        const token= await authService.loginWithGoogle(req.body.idToken);
        res.cookie('access-token',token,{httpOnly:true,maxAge:toMS(1, 'hours')});
        res.status(200).json({
            message:"user login successfully",
            success:true,
        })
    }catch(err){
        next(err);
    }
}