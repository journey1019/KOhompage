import React from 'react';
import ContactForm from '@/components/(Contact-us)/ContactForm';

export default function Page({ params }: { params: { locale: string } }) {
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
            <ContactForm locale={params.locale} />
        </div>
    );
}
