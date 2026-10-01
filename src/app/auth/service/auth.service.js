import * as authRepository from "../repository/auth.repository.js";
import * as otpRepository from "../repository/otp.repository.js";
import * as userRepository from "../../user/repository/user.repository.js";
import {generateOtp} from "../../../common/utils/otp.js";
import {toMS} from "../../../common/utils/time.js";
import {sendMail} from "../../../common/email/nodemailer.js";
import {userAlreadyExist, userAlreadyVerified, userNotFound, userNotVerified} from "../../user/error.js";
import {invalidOtp, invalidPassword, otpExpired} from "../error.js";
import {comparePassword, hashPassword} from "../utills/hash.js";
import {generateToken} from "../utills/token.js";
import {verifyIdToken} from "../../../common/utils/google.auth.js";
import {email} from "zod";

export const register = async (userData) => {

    // 2. Check if user already exists
    const userExist = await authRepository.findUserByEmail(userData.email);

    if (userExist) {
        throw userAlreadyExist;
    }

    // 3. Hash password
    userData.password = await hashPassword(userData.password);

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
export const verifyAccount = async (email, code) => {
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
        throw userNotFound
    }
    if (user.isVerified === true) {
        throw userAlreadyVerified;
    }
    const otp = await otpRepository.getOTPByEmail(user.email);
    if (!otp) {
        throw otpExpired
    }
    if (code !== otp.value) {
        throw invalidOtp;
    }
    const updatedUser = await userRepository.updateUserByEmail(email, {isVerified: true});
    otpRepository.deleteOTP(email);
    return updatedUser;
}
export const login = async (email, password) => {
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
        throw userNotFound
    }
    if (user.isVerified === false) {
        throw userNotVerified
    }
    const match = await comparePassword(password, user.password)
    if (!match) {
        throw invalidPassword;
    }
    const token = generateToken({id: user._id, email: user.email, name: user.name});

    return token;
}
export const sendOTP = async (email) => {
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
        throw userNotFound
    }
    await otpRepository.deleteOTP(email);
    const otp = generateOtp();
    await otpRepository.createOtp({email: email, value: otp, expiresAt: new Date(Date.now() + toMS(5, "minutes"))});
    await sendMail(email, "verification Code", `<h1>Your verification code is ${otp}</h1>`);
}
export const resetPassword = async (email, code, newPassword) => {
    const otp = await otpRepository.getOTPByEmail(email);
    if (!otp) throw otpExpired;
    if (otp.value !== code) throw invalidOtp;
    const hashedPassword = await hashPassword(newPassword);
    const updatedUser = await userRepository.updateUserByEmail(email, {password: hashedPassword});
    await otpRepository.deleteOTP(email);
    return updatedUser;
}

export async function loginWithGoogle(idToken) {
    const payload = await verifyIdToken(idToken);
    const user = await authRepository.findUserByEmail(payload.email);
    if (user) {
        return generateToken({id: user._id, email: user.email, name: user.name});
    }
    const createdUser = await authRepository.createUser({
        name: payload.name
        , email: payload.email,
        provider: 'google', isVerified: true
    });
    return generateToken({
        id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email
    })
}