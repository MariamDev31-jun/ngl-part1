import{config}from"dotenv";
config();
import'./common/db/mongoose.js';
import express from 'express';
import userRouter from "./app/user/user.route.js";
import authRouter from "./app/auth/auth.route.js";
import messageRouter from "./app/message/message.route.js";
import cors from "cors"
const app = express();
app.use(express.json());
app.use(cors({origin: "http://localhost:4200"}));
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/message', messageRouter);
import {logger} from './common/logger/logger.js'
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});
app.use((error, req, res, next) => {
     logger.error(error.message)
    if(error.isOperational===true)
{
   return  res.status(error.statusCode).json({
        message: error.message,
        success: false
    })
}
res.status(500).json({
    message: 'Something went wrong',
    success: false
})
});
app.listen(process.env.SERVER_PORT,()=>{
    logger.info('server started');
})