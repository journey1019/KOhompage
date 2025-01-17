'use client';

import React, { useState } from "react";
import Banner from './Banner';
import PDFButton from '@/components/(Header)/PDFButton';

interface ContactFormProps {
    locale: string;
}

export default function ContactForm({ locale }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        companyEmail: '',
        position: '',
        phone: '',
        inquiryType: '',
        message: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        company: '',
        companyEmail: '',
        inquiryType: '',
        message: '',
    });

    const [isAgreed, setIsAgreed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [banner, setBanner] = useState<{ message: string; state: 'success' | 'error' } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        // 실시간 에러 제거
        if (value.trim() !== '') {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: Partial<typeof errors> = {};
        let isValid = true;

        // 필수 필드만 유효성 검사
        ['name', 'company', 'companyEmail', 'inquiryType', 'message'].forEach((key) => {
            if (formData[key as keyof typeof formData].trim() === '') {
                newErrors[key as keyof typeof errors] = 'This field is required.';
                isValid = false;
            }
        });

        setErrors(newErrors as typeof errors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (!validateForm() || !isAgreed) return;

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
                name: '',
                company: '',
                companyEmail: '',
                position: '',
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
                {/* Name */}
                <div className="col-span-1">
                    <label className="block mb-2 text-sm 2xl:text-xl font-medium text-gray-900 dark:text-white">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Full Name"
                        className="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 h-[52px]"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div className="col-span-1">
                    <label className="block mb-2 text-sm 2xl:text-xl font-medium text-gray-900 dark:text-white">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g., 010-0000-0000"
                        className="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 h-[52px]"
                    />
                </div>

                {/* Company */}
                <div className="col-span-1">
                    <label className="block mb-2 text-sm 2xl:text-xl font-medium text-gray-900 dark:text-white">
                        Company <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company"
                        className="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 h-[52px]"
                    />
                    {errors.company && (
                        <p className="text-red-500 text-xs mt-1">{errors.company}</p>
                    )}
                </div>

                {/* Position */}
                <div className="col-span-1">
                    <label className="block mb-2 text-sm 2xl:text-xl font-medium text-gray-900 dark:text-white">
                        Position
                    </label>
                    <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        placeholder="Manager"
                        className="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 h-[52px]"
                    />
                </div>

                {/* Company Email */}
                <div className="col-span-1">
                    <label className="block mb-2 text-sm 2xl:text-xl font-medium text-gray-900 dark:text-white">
                        Email <span className="text-red-500">*</span>
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
            </div>

            {/* Inquiry Type */}
            <div>
                <label className="block mb-2 text-sm 2xl:text-base font-medium text-gray-900 dark:text-white">
                    Inquiry Type <span className="text-red-500">*</span>
                </label>
                <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-auto rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-base 2xl:text-xl"
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
                <label className="block mb-2 text-sm 2xl:text-xl font-medium text-gray-900 dark:text-white">
                    Additional Comments <span className="text-red-500">*</span>
                </label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Additional Comments"
                    rows={6}
                    className="w-full rounded-md px-4 bg-gray-100 text-gray-800 pt-4"
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>

            {/* Legal Notice */}
            <div className="flex items-start space-x-2">
                <input
                    type="checkbox"
                    id="legal-notice"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    className="w-5 h-5"
                />
                <label htmlFor="legal-notice" className="text-sm 2xl:text-xl font-medium text-gray-700">
                    I agree to KOREA ORBCOMM&apos;s{' '}
                    <a href="/support" className="text-blue-600 underline">
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <PDFButton path="/pdf/support/PrivacyPolicy.pdf" label="Privacy Policy"
                               className="text-blue-600 underline" />
                    , which includes my consent to receive marketing information. I can unsubscribe at any time.
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="button"
                onClick={handleSubmit}
                className={`bg-blue-500 text-white text-base 2xl:text-xl px-4 py-3 rounded-md ${!isAgreed ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!isAgreed || isLoading}
            >
                {isLoading ? 'Sending...' : 'Send'}
            </button>
            {banner && <Banner banner={banner} />}
        </form>
    );
}
