import {User} from "../model/user.model.js";

export function updateUserByEmail(email ,userData)
{
    return User.findOneAndUpdate({email:email},userData,{returnDocument:'after'});
}