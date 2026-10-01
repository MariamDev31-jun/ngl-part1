import {AppError} from '../../common/error/error.js';
export const  userNotFound= new AppError("User Not Found",404);
export const userAlreadyVerified= new AppError("User Already Verified",400);
export const userNotVerified= new AppError("User Not Verified",403);
export const userAlreadyExist= new AppError("User Already Exist",409);