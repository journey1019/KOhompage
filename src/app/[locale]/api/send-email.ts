// /pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Configure your SMTP transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Replace with your SMTP server
            port: 587, // or 465 for SSL
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER, // Your email
                pass: process.env.SMTP_PASS, // Your email password or app password
            },
        });

        // Send the email
        await transporter.sendMail({
            from: `"${name}" <${email}>`, // Sender's information
            to: 'sales@orbcomm.co.kr', // Your email
            subject: subject,
            text: message, // Plain text body
        });

        res.status(200).json({ message: 'Email sent successfully.' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email. Please try again later.' });
    }
}
