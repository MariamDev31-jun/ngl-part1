* NGL APP
* send anonymous messages or public messages.
* view a profile with related messages.
* handle manage messages.

- tech stack:
    - express.js
    - node.js
    - mongodb
    - redis/cache
    - jwt
    - bcrypt
    - rate limiter
    - load balancer
    - nginx
    - login with Google. [Social-App]
    - error handling [app error]


- features:

1. authentication flow:
    - register.
    - send verification email. [otp,link]
    - verify email using. [otp,link]
    - login.
    - forgot password.
    - reset password.
    - login with Google.

2. user flow:
    - update profile.
    - view profile.
    - view all users.

3. messages flow:
    - send message.
    - view incoming messages.
    - delete a specific message.
guard:
    - authentication-check token
    - authorization-check role not in this app

* no SQL

1. high availability. [view]
2. eventual consistency.[]


* OTP [one-time password]

- generate OTP.[register,reset-password,vodafone-cash,place-order]
- save OTP into DB within the register.
- delete OTP after usage verify an account.
- or
- delete OTP after 10 minutes.[TTL] >> time to live.


* modules :

1. commonJs → ES5 → const require() >> module.exports = fn;
2. moduleJs → ES6 → import fn from 'module-name' >> export fn;

============================

* todo session2:

1. refactor folder structure.✅
2. register.✅
3. verify email using otp.
4. login how to send token in res.[cookie]

[//]: # (=============================)

[//]: # ()
[//]: # (* todo session3:)

[//]: # ()
[//]: # (1. send otp.)

[//]: # (2. reset password.)

[//]: # (3. send a message)

[//]: # (4. how to access the token from req.)

[//]: # (5. customize error handler)