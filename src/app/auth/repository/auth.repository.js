import {User} from "../../user/model/user.model.js";
export function findUserByEmail (email)  {
    return  User.findOne({email:email});
}

export async function createUser(userData) {
    return await User.create(userData);
}