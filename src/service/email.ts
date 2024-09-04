import nodemailer from 'nodemailer';

export type EmailData = {
    from: string;
    subject: string;
    message: string;
};

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS,
    },
})

// 외부 즉, route 에서 호출하는 함수
export async function sendEmail({ from, subject, message }: EmailData) {
    const mailData = {
        to: process.env.AUTH_USER,
        subject: `[BLOG] ${subject}`,
        from,
        html: `
        <h1>${subject}</h1>
        <div>${message}</div>
        <br/>
        <p>보낸 사람: ${from}</p>
        `
    }
    return transporter.sendMail(mailData);
}