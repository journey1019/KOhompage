'use client';

import React, { useState } from 'react';

interface ContactUsPageProps {
    locale: string;
}

export default function ContactUsPage({ locale }: ContactUsPageProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async () => {
        const { name, email, subject, message } = formData;

        if (!name || !email || !subject || !message) {
            setErrorMessage('All fields are required.');
            return;
        }

        setIsLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

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
            setSuccessMessage(successData.message || 'Your email has been sent successfully!');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error: any) {
            setErrorMessage(error.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid md:grid-cols-2 lg:max-w-7xl lg:px-6 lg:py-28 items-start gap-16 p-4 mx-auto max-w-full bg-white">
            <div>
                <h1 className="text-gray-800 text-4xl lg:text-6xl font-extrabold text-start">
                    Contact KOREAORBCOMM
                </h1>
                <p className="text-sm text-gray-500 mt-4">
                    Have some big idea or brand to develop and need help? Then reach out we&apos;d love to hear about your project and provide help.
                </p>
            </div>

            <form className="ml-auto space-y-4" onSubmit={(e) => e.preventDefault()}>
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
                {successMessage && <p className="text-green-600">{successMessage}</p>}
                {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            </form>
        </div>
    );
}
