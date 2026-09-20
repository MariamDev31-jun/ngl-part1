import validateEmail from "../validate/auth.validate.js";
import * as authRepository from "../repository/auth.repository.js";
import * as otpRepository from "../repository/otp.repository.js";
import * as userRepository from "../../user/repository/user.repository.js";
import bcrypt from "bcrypt";
import { generateOtp } from "../../../common/utils/otp.js";
import { toMS } from "../../../common/utils/time.js";
import { sendMail } from "../../../common/email/nodemailer.js";
import {userAlreadyVerified, userNotFound, userNotVerified} from "../../user/error.js";
import {invalidOtp, invalidPassword, otpExpired} from "../error.js";
import jwt from "jsonwebtoken";
import {Otp} from "../model/otp.model.js";

export const register = async (userData) => {

    // 1. Validate email
    const valid = validateEmail.safeParse({
        email: userData.email
    });

    if (!valid.success) {
        throw valid.error;
    }

    // 2. Check if user already exists
    const userExist = await authRepository.findUserByEmail(userData.email);

    if (userExist) {
        const error = new Error("user already exists");
        error.statusCode = 400;
        throw error;    }

    // 3. Hash password
    userData.password = await bcrypt.hash(userData.password, 10);

    // 4. Create user
    const createdUser = await authRepository.createUser(userData);

    // 5. Generate OTP
    const otp = generateOtp();

    // 6. Save OTP
    await otpRepository.createOtp({
        value: otp,
        email: userData.email,
        expiresAt: new Date(Date.now() + toMS(5, "minutes"))
    });

    // 7. Send OTP by email
    await sendMail(
        userData.email,
        "Verification Code",
        `<h1>Your verification code is ${otp}</h1>`
    );

    // 8. Return created user
    return createdUser;
};
export const verifyAccount = async (email,code) => {
    const user=await authRepository.findUserByEmail(email);
    if (!user) {
throw userNotFound
    }
    if (user.isVerified===true) {
        throw userAlreadyVerified;
    }
    const otp=await otpRepository.getOTPByEmail(user.email);
    if(!otp)
    {
        throw otpExpired
    }
    if(code!==otp.value)
    {
        throw invalidOtp;
    }
const updatedUser = await userRepository.updateUserByEmail(email,{isVerified:true});
    otpRepository.deleteOTP(email);
    return updatedUser;
}
export const login = async (email,password) => {
    const user=await authRepository.findUserByEmail(email);
    if (!user)
    {
        throw userNotFound
    }
    if (user.isVerified===false) {
     throw userNotVerified
    }
    const match=await bcrypt.compare(password, user.password);
    if(!match)
    {
        throw invalidPassword;
    }
    const token =jwt.sign({id:user._id,name:user.name,email:user.email},process.env.JWT_SECRET,{
        expiresIn: toMS('1', "hours")
    })
    return token;
}
export const sendOTP = async (email) => {
    const user=await authRepository.findUserByEmail(email);
    if (!user)
    {
        throw userNotFound
    }
    await otpRepository.deleteOTP(email);
    const otp = generateOtp();
    await otpRepository.createOtp({email:email,value:otp,expiresAt:new Date(Date.now() + toMS(5, "minutes"))});
   await sendMail(email,"verification Code",`<h1>Your verification code is ${otp}</h1>`);
}