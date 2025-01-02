import nodemailer from 'nodemailer';

// EmailData 인터페이스 정의
export interface EmailData {
    name: string;    // 발신자 이름
    email: string;   // 발신자 이메일
    subject: string; // 이메일 제목
    message: string; // 이메일 내용
}

export async function sendEmail(data: EmailData): Promise<void> {
    const { name, email, subject, message } = data;

    // Nodemailer SMTP 설정
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587', 10), // STARTTLS는 587 포트
        secure: process.env.SMTP_SECURE === 'true', // SSL 사용 여부
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // SMTP 서버 연결 확인
    try {
        await transporter.verify();
        console.log('SMTP server is ready to send emails');
    } catch (error) {
        console.error('Error connecting to SMTP server:', error);
        throw new Error('SMTP server connection failed');
    }

    // 이메일 전송
    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_FROM}>`, // 발신자
        to: process.env.EMAIL_TO, // 수신자
        replyTo: email, // 회신 주소
        subject: subject || 'No Subject',             // 제목
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`, // 본문
    };

    await transporter.sendMail(mailOptions);
}
