/** Service Layer
 * - 이메일 작성 및 전송
 * - SMTP 서버와 통신
 * */
import nodemailer from 'nodemailer';

export interface EmailData {
    name: string;    // 작성자 이름
    email: string;   // 작성자 이메일
    subject: string; // 이메일 제목
    message: string; // 이메일 내용
}

export async function sendEmail(data: EmailData): Promise<void> {
    const { name, email, subject, message } = data;

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.verify();
        console.log('SMTP server is ready to send emails');
    } catch (error) {
        console.error('Error connecting to SMTP server:', error);
        throw new Error('SMTP server connection failed');
    }

    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`, // 발신자는 SMTP 계정으로 고정
        to: process.env.EMAIL_TO,                     // 수신자는 고정된 이메일 주소
        replyTo: email,                               // 회신 주소를 사용자 입력 이메일로 설정
        subject: subject || 'No Subject',
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
}
