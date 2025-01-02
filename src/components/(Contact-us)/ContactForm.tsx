'use client';

import React, { useState } from 'react';
import Banner from './Banner';

interface ContactFormProps {
    locale: string;
}

export default function ContactForm({ locale }: ContactFormProps) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        company: '',
        companyEmail: '',
        position: '',
        country: '',
        phone: '',
        inquiryType: '',
        message: '',
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        company: '',
        companyEmail: '',
        position: '',
        country: '',
        phone: '',
        inquiryType: '',
        message: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [banner, setBanner] = useState<{ message: string; state: 'success' | 'error' } | null>(null);

    const countryCodes = [
        { code: '+82', name: 'South Korea' },
        { code: '+1', name: 'United States' },
        { code: '+81', name: 'Japan' },
        { code: '+86', name: 'China' },
        { code: '+44', name: 'United Kingdom' },
        { code: '+91', name: 'India' },
        // Add more countries as needed
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        // 실시간 에러 제거
        if (value.trim() !== '') {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = { ...errors };
        let isValid = true;

        Object.keys(formData).forEach((key) => {
            if (formData[key as keyof typeof formData].trim() === '') {
                newErrors[key as keyof typeof newErrors] = 'This field is required.';
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

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
            setFormData({
                firstName: '',
                lastName: '',
                company: '',
                companyEmail: '',
                position: '',
                country: '',
                phone: '',
                inquiryType: '',
                message: '',
            });
        } catch (error: any) {
            setBanner({ message: error.message || 'Something went wrong. Please try again.', state: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-2">
                {/* First Name & Last Name */}
                <div className="col-span-1 grid grid-cols-2 gap-2">
                    {/* First Name */}
                    <div className="col-span-1">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            className="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 h-[52px]" // 높이를 input과 동일하게 설정
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div className="col-span-1">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            className="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 h-[52px]" // 높이를 input과 동일하게 설정
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                        )}
                    </div>
                </div>

                {/* Country & Phone */}
                <div className="col-span-1 grid grid-cols-3 gap-2">
                    {/* Country */}
                    <div className="col-span-1">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Country <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 h-[52px]" // 높이를 input과 동일하게 설정
                        >
                            <option value="" disabled>
                                Select Country
                            </option>
                            {countryCodes.map((country) => (
                                <option key={country.code} value={country.code}>
                                    {country.name} ({country.code})
                                </option>
                            ))}
                        </select>
                        {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                    </div>

                    {/* Phone Number */}
                    <div className="col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="e.g., 010-0000-0000"
                            className="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 h-[52px]" // 높이를 동일하게 설정
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                </div>


                {/* Company */}
                <div className="col-span-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Company <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company"
                        className="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 h-[52px]" // 높이를 input과 동일하게 설정
                    />
                    {errors.company && (
                        <p className="text-red-500 text-xs mt-1">{errors.company}</p>
                    )}
                </div>

                {/* Position */}
                <div className="col-span-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Position <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        placeholder="Position"
                        className="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 h-[52px]" // 높이를 input과 동일하게 설정
                    />
                    {errors.position && (
                        <p className="text-red-500 text-xs mt-1">{errors.position}</p>
                    )}
                </div>
            </div>

            {/* Company Email */}
            <div className="col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Company Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    name="companyEmail"
                    value={formData.companyEmail}
                    onChange={(e) => {
                        handleChange(e);

                        const emailValue = e.target.value;
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 간단한 이메일 형식 검증

                        if (!emailRegex.test(emailValue)) {
                            setErrors((prevErrors) => ({
                                ...prevErrors,
                                companyEmail: 'Please enter a valid email address.',
                            }));
                        } else {
                            setErrors((prevErrors) => ({
                                ...prevErrors,
                                companyEmail: '', // 에러 제거
                            }));
                        }
                    }}
                    placeholder="example@company.com"
                    className="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 h-[52px]" // 높이를 input과 동일하게 설정
                />
                {errors.companyEmail && (
                    <p className="text-red-500 text-xs mt-1">{errors.companyEmail}</p>
                )}
            </div>

            {/* Inquiry Type */}
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Inquiry Type <span className="text-red-500">*</span>
                </label>
                <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-auto rounded-md py-3 px-4 bg-gray-100 text-gray-800"
                >
                    <option value="" disabled>
                        Select Inquiry Type
                    </option>
                    <option value="Product Inquiry">Product Inquiry</option>
                    <option value="Demo Request">Demo Request</option>
                    <option value="Quotation Request">Quotation Request</option>
                    <option value="Information Request">Information Request</option>
                    <option value="Other">Other</option>
                </select>
                {errors.inquiryType && <p className="text-red-500 text-xs mt-1">{errors.inquiryType}</p>}
            </div>

            {/* Additional Comments */}
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Additional Comments <span className="text-red-500">*</span>
                </label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Additional Comments"
                    rows={6}
                    className="w-full rounded-md px-4 bg-gray-100 text-gray-800"
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>

            <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-3 rounded-md"
                disabled={isLoading}
            >
                {isLoading ? 'Sending...' : 'Send'}
            </button>
            {banner && <Banner banner={banner} />}
        </form>
    );
}
