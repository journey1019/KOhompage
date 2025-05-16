'use client'; // 파일 상단에 추가

import Image from 'next/image';

export default function History() {
    const milestones = [
        {
            image: '/images/icons/color/Company.png',
            title: '1999년 9월 법인 설립',
            description: 'Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.',
            alt: 'Company Icon',
            path: '/pdf/support/PrivacyPolicy.pdf'
        },
        {
            image: '/images/icons/color/Satellite2.png',
            title: '기간통신사업자',
            description: 'Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.',
            alt: 'Satellite Icon',
            path: '/pdf/support/TermsOfUse_v1.pdf'
        },
        {
            image: '/images/icons/color/Handshake.png',
            title: 'Orbcomm Inc. 라이선스 체결',
            description: 'Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.',
            path: '/pdf/support/PrivacyPolicy.pdf'
        },
        {
            image: '/images/icons/color/Rotation.png',
            title: '안정적이고 빠른 통신서비스',
            description: 'Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.',
            alt: 'Exchange Icon',
            path: '/pdf/support/TermsOfUse_v1.pdf'
        },
    ];

    const handleOpenPDF = (path: string) => {
        window.open(path, '_blank', 'noopener,noreferrer');
    };

    return (
        <section className="mx-auto max-w-screen-xl py-12">
            <div className="mt-16 grid divide-x divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-3xl border border-gray-100 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
                {milestones.map((milestone, index) => (
                    <div
                        key={index}
                        className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10"
                    >
                        <div className="relative space-y-8 py-12 p-8">
                            <Image
                                src={milestone.image}
                                className="w-12"
                                width={512}
                                height={512}
                                alt={milestone.alt || 'Image description missing'}
                                unoptimized
                            />
                            <div className="space-y-2">
                                <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                                    {milestone.title}
                                </h5>
                                <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                            </div>
                            <button
                                onClick={() => handleOpenPDF(milestone.path)}
                                className="flex items-center justify-between group-hover:text-secondary"
                            >
                                <span className="text-sm">Read more</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
