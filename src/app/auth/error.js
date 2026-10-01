import {AppError} from "../../common/error/error.js";

export const otpExpired=new AppError("OTP expired, please resend OTP",404);
export const invalidOtp= new AppError("invalid OTP",403);
export const invalidPassword= new AppError("invalid password",403);