import{config}from"dotenv";
config();
import'./common/db/mongoose.js';
import express from 'express';
import userRouter from "./app/user/user.route.js";
import authRouter from "./app/auth/auth.route.js";
import messageRouter from "./app/message/message.route.js";
const app = express();
app.use(express.json());
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/message', messageRouter);
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        message: error.message,
        success: false
    });

});
app.listen(process.env.SERVER_PORT)