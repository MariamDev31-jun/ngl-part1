import {z} from "zod";
export const registerDTO=z.object({
email:z.email().toLowerCase(),
    name:z.string().min(2).max(20).trim(),
    password:z.string().min(8).max(16).trim(),
    provider:z.enum(['local', 'google','facebook']).default('local'),
    dob:z.date().optional(),
    gender:z.enum(['female','male']).optional(),
});
export const verifyAccountDTO=z.object({
    email:z.email().toLowerCase(),
value:z.string().trim().length(6)
})
export const loginDTO=z.object({
    email:z.email().toLowerCase(),
    password:z.string().trim().min(8).max(16).trim(),
})
export const sendOtpDTO=    z.object({
    email:z.email().toLowerCase()
})
export const resetPasswordDTO=z.object({
    email:z.email().toLowerCase(),
    newPassword:z.string().trim().min(8).max(16),
    code:z.string().trim().length(6)
})