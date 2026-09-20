* User

- name [String, required, minlength:3, maxlength:20, trim]✅
- email [String, required, unique, lowercase, trim] todo:check email format [zod]✅
- password [String, required] >> required in case login local✅
- provider [String] enum:['facebook','google','local']✅
- profilePic:[String] ✅
- isVerified[ Boolean] default:false✅
- createdAt [date]✅
- updatedAt [date]✅
- dob [date]✅
- gender[String] enum:['male','female']✅
- isDeleted [Boolean] default:false [soft delete]✅

===========================

* Message

- content [String,required,minlength:1,maxlength:200]✅
- receiver [ObjectId,required,ref:User]✅
- sender [ObjectId,ref:User]--optional✅
- isDeleted [Boolean] default:false [soft delete]✅
- createdAt [date]✅

=======================

* OTP[one time password]

delete OTP after 10 min.
or
delete OTP after usage.

store OTP temporarily: [time to live]:

database using mongodb support TTL. [HDD]

into cache redis support TTL. [ram] x50 faster more DB

- value [String,required,length:6] must be string because if  we store as num and value 0001  db store it as 1 and this corner case ✅
- email [String,required]✅
- expiredAt [date] 2026-09-13T07:15:00✅
- createdAt [date] 2026-09-13T07:05:00✅
