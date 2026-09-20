import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: false,
    port: 587,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
    }
});
export  async function sendMail(to,subject,html) {
   await transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: to,
        subject: subject,
        html: html

    })
}