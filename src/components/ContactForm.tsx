'use client'
import { ChangeEvent, FormEvent, useState } from 'react';
import { BannerData } from '@/components/Banner';
import Banner from '@/components/Banner';
import { sendContactEmail } from '@/service/contact';

type Form = {
    from: string;
    subject: string;
    message: string;
}
const DEFAULT_DATA = {
    from: '',
    subject: '',
    message: ''
}
export default function ContactForm() {
    const [form, setForm] = useState<Form>(DEFAULT_DATA);
    const [banner, setBanner] = useState<BannerData | null>(null);
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 페이지가 다시 로딩되지 않도록 막기
        sendContactEmail(form)
            .then(() => {
                setBanner({
                    message: '메일을 성공적으로 보냈습니다.',
                    state: 'success'
                });
                setForm(DEFAULT_DATA);
            })
            .catch(() => {
                setBanner({
                    message: '메일전송에 실패했습니다. 다시 시도해 주세요',
                    state: 'error'
                });
            })
            .finally(() => {
                setTimeout(() => {
                    setBanner(null);
                }, 3000);
            })
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 w-full">
            <div className='flex flex-col py-4'>{banner && <Banner banner={banner} />}</div>
            <form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md" onSubmit={onSubmit}>
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Contact Us</h2>

                {/* Email Field */}
                <div className="mb-4">
                    <label htmlFor="from" className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="from"
                        name="from"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                        required
                        autoFocus
                        value={form.from}
                        onChange={onChange}
                    />
                </div>

                {/* Subject Field */}
                <div className="mb-4">
                    <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">
                        Subject
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter the subject"
                        required
                        value={form.subject}
                        onChange={onChange}
                    />
                </div>

                {/* Message Field */}
                <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                        Message
                    </label>
                    <textarea
                        rows={10}
                        id="message"
                        name="message"
                        className="w-full h-40 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Write your message"
                        required
                        value={form.message}
                        onChange={onChange}
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    );
}