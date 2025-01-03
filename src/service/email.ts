/** Service Layer
 * - 이메일 작성 및 전송
 * - SMTP 서버와 통신
 * */
import nodemailer from 'nodemailer';

export interface EmailData {
    name: string;
    company: string;
    companyEmail: string;
    position: string;
    phone: string;
    inquiryType: string;
    message: string;
}

export async function sendEmail(data: EmailData): Promise<void> {
    const {
        name,
        company,
        companyEmail,
        position,
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
        from: `"${name}" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        replyTo: companyEmail,
        subject: `[HomePage] Customer Inquiry: ${inquiryType}`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; padding: 16px;">
                <h2 style="color: #0056b3; border-bottom: 2px solid #0056b3; padding-bottom: 8px;">Customer Inquiry</h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                    <tr>
                        <td style="padding: 8px; font-weight: bold; background: #f7f7f7; width: 30%;">Name</td>
                        <td style="padding: 8px; background: #f7f7f7;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; font-weight: bold;">Phone</td>
                        <td style="padding: 8px;">${phone}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; font-weight: bold; background: #f7f7f7;">Email</td>
                        <td style="padding: 8px; background: #f7f7f7;">${companyEmail}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; font-weight: bold;">Company</td>
                        <td style="padding: 8px;">${company}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; font-weight: bold; background: #f7f7f7;">Position</td>
                        <td style="padding: 8px; background: #f7f7f7;">${position}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; font-weight: bold;">Inquiry Type</td>
                        <td style="padding: 8px;">${inquiryType}</td>
                    </tr>
                </table>
                <div style="margin-top: 16px; padding: 16px; background: #f1f1f1; border-radius: 8px;">
                    <h3 style="margin: 0; color: #0056b3;">Message</h3>
                    <p style="margin-top: 8px;">${message}</p>
                </div>
                <footer style="margin-top: 24px; text-align: center; font-size: 12px; color: #888;">
                    <p>This email was generated from the HomePage contact form.</p>
                </footer>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);
}
