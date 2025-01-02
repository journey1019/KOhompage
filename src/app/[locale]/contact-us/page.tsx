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
                    Have some big idea or brand to develop and need help? Then reach out we&apos;d love to hear about
                    your project and provide help.
                </p>

                <div className="mt-12 space-y-12">
                    {/* Email Section */}
                    <div>
                        <h2 className="text-gray-800 text-base font-bold">Email</h2>
                        <ul className="mt-4">
                            <li className="flex items-center space-x-4">
                                {/* Icon Container */}
                                <div
                                    className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center shrink-0"
                                    aria-hidden="true"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="#007bff"
                                        viewBox="0 0 479.058 479.058"
                                    >
                                        <path
                                            d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                                        />
                                    </svg>
                                </div>
                                {/* Email Info */}
                                <div>
                                    <small className="text-gray-600 block">Mail</small>
                                    <a
                                        href="mailto:sales@orbcomm.co.kr"
                                        className="text-blue-600 text-sm font-semibold hover:underline"
                                    >
                                        sales@orbcomm.co.kr
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Us Section */}
                    <div>
                        <h2 className="text-gray-800 text-base font-bold">Contact Us</h2>
                        <div className="flex flex-row gap-x-16 mt-4">
                            {/* Phone Info */}
                            <ul>
                                <li className="flex items-center space-x-4">
                                    {/* Icon Container */}
                                    <div
                                        className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center shrink-0"
                                        aria-hidden="true"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="#007bff"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M6.62 10.79a15.48 15.48 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.24 11.36 11.36 0 0 0 3.59.61 1 1 0 0 1 1 1v3.57a1 1 0 0 1-1 1A17 17 0 0 1 3 4.43a1 1 0 0 1 1-1H7.6a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .61 3.59 1 1 0 0 1-.25 1.11z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <small className="text-gray-600 block">Call</small>
                                        <a
                                            href="tel:02-3444-7311"
                                            className="text-blue-600 text-sm font-semibold hover:underline"
                                        >
                                            02-3444-7311
                                        </a>
                                    </div>
                                </li>
                            </ul>

                            {/* Fax Info */}
                            <ul>
                                <li className="flex items-center space-x-4">
                                    {/* Icon Container */}
                                    <div
                                        className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center shrink-0"
                                        aria-hidden="true"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="#007bff"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M19 2H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V4c0-1.1-.9-2-2-2zM7 6h10v2H7V6zM7 9h10v9H7V9zm2 2v2H8v-2h1zm5 0v2h-4v-2h4zm0 3v2h-4v-2h4z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <small className="text-gray-600 block">Fax</small>
                                        <a
                                            href="fax:02-3444-7312"
                                            className="text-blue-600 text-sm font-semibold hover:underline"
                                        >
                                            02-3444-7312
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>
            <ContactForm locale={params.locale} />
        </div>
    );
}
