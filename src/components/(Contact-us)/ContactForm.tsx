'use client';

import React, { useState } from 'react';
import Banner from './Banner';

interface ContactFormProps {
    locale: string;
}

export default function ContactForm({ locale }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [banner, setBanner] = useState<{ message: string; state: 'success' | 'error' } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async () => {
        const { name, email, subject, message } = formData;

        if (!name || !email || !subject || !message) {
            setBanner({ message: 'All fields are required.', state: 'error' });
            return;
        }

        setIsLoading(true);
        setBanner(null);

        try {
            const response = await fetch(`/${locale}/api/contact-us/send-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to send email.');
            }

            const successData = await response.json();
            setBanner({ message: successData.message || 'Your email has been sent successfully!', state: 'success' });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error: any) {
            setBanner({ message: error.message || 'Something went wrong. Please try again.', state: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800"
                required
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800"
                required
            />
            <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800"
                required
            />
            <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows={6}
                className="w-full rounded-md px-4 bg-gray-100 text-gray-800"
                required
            ></textarea>
            <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-3 rounded-md"
                disabled={isLoading}
            >
                {isLoading ? 'Sending...' : 'Send'}
            </button>
            {banner && (
                <Banner banner={banner} />
            )}
        </form>
    );
}
