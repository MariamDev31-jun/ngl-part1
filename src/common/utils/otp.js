import crypto from 'crypto';
export function generateOtp(length=6){
const max=10**length;
return crypto.randomInt(0,max).toString().padStart(length,'0');
}