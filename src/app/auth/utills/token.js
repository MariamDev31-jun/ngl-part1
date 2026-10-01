import {toMS} from "../../../common/utils/time.js";
import jwt from "jsonwebtoken";

export function generateToken(payload){
    return jwt.sign(payload,process.env.JWT_SECRET, {expiresIn: toMS('1','hours')});
}