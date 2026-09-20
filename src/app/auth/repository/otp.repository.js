import{Otp} from "../model/otp.model.js";
export function createOtp(otpData)  {
    return  Otp.create(otpData)
}
export async function getOTPByEmail(email)  {
    return Otp.findOne({email:email});
}
export async function deleteOTP(email)  {
    return  Otp.deleteMany({email:email});
}