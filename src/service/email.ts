/** Service Layer
 * - 이메일 작성 및 전송
 * - SMTP 서버와 통신
 * */
import nodemailer from 'nodemailer';

export interface EmailData {
    firstName: string;
    lastName: string;
    company: string;
    companyEmail: string;
    position: string;
    country: string;
    phone: string;
    inquiryType: string;
    message: string;
}

export async function sendEmail(data: EmailData): Promise<void> {
    const {
        firstName,
        lastName,
        company,
        companyEmail,
        position,
        country,
        phone,
        inquiryType,
        message,
    } = data;

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
        from: `"${firstName} ${lastName}" <${process.env.EMAIL_USER}>`, // 발신자는 SMTP 계정으로 고정
        to: process.env.EMAIL_TO,                                     // 수신자는 고정된 이메일 주소
        replyTo: companyEmail,                                        // 회신 주소를 사용자 입력 이메일로 설정
        subject: `[HomePage] 고객 문의: ${inquiryType}`,
        text: `
        First Name: ${firstName}
        Last Name: ${lastName}
        Phone: (${country}) ${phone}
        Email: ${companyEmail}
        Company: ${company}
        Position: ${position}
        
        Inquiry Type: ${inquiryType}

        Message:
        ${message}
        `,
    };

    await transporter.sendMail(mailOptions);
}
