/** API Endpoint
 * - 데이터 유효성 검사
 * - 이메일 서비스 호출
 * */
import { sendEmail, EmailData } from '@/service/email';

export async function POST(req: Request) {
    try {
        const body = await req.json();
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
        } = body as EmailData;

        // 필수 필드 검증
        if (
            !firstName ||
            !lastName ||
            !company ||
            !companyEmail ||
            !position ||
            !country ||
            !phone ||
            !inquiryType ||
            !message
        ) {
            return new Response(
                JSON.stringify({ message: 'All fields are required.' }),
                { status: 400 }
            );
        }

        // 이메일 전송
        await sendEmail({
            firstName,
            lastName,
            company,
            companyEmail,
            position,
            country,
            phone,
            inquiryType,
            message,
        });

        return new Response(
            JSON.stringify({ message: 'Email sent successfully!' }),
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error sending email:', error);
        return new Response(
            JSON.stringify({ message: error.message || 'Error sending email.' }),
            { status: 500 }
        );
    }
}
