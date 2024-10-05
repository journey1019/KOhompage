import React from 'react';

const BlogPost: React.FC<{ date: string; title: string; description: string; image: string; }> = ({ date, title, description, image }) => {
    return (
        <div className="group w-full border border-gray-300 rounded-2xl">
            <div className="flex items-center">
                <img src={image} alt="blogs tailwind section" className="rounded-t-2xl w-full object-cover" />
            </div>
            <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
                <span className="text-indigo-600 font-medium mb-3 block">{date}</span>
                <h4 className="text-xl text-gray-900 dark:text-white dark:hover:text-gray-900 font-medium leading-8 mb-5">{title}</h4>
                <p className="text-gray-500 leading-6 mb-10">{description}</p>
                <a href="javascript:;" className="cursor-pointer text-lg text-indigo-600 font-semibold">Read more..</a>
            </div>
        </div>
    );
};

const ContactForm: React.FC = () => {
    return (
        <section className='w-full dark:bg-gray-900'>
            <div className="py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className="flex justify-center flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between gap-8">
                        <div className="w-full lg:w-2/5">
                            <div className="block lg:text-left text-center">
                                <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-200 leading-[3.25rem] mb-5">
                                    USE <span className="text-indigo-600">CASE</span>
                                </h2>
                                <p className="text-gray-500 mb-10 max-lg:max-w-xl max-lg:mx-auto">
                                    Let me introduce KoreaORBCOMM&apos;s representative solution, the use case of Global
                                    IoT
                                </p>
                            </div>
                        </div>
                        <div className="w-full lg:w-3/5">
                            <div
                                className="flex justify-center gap-y-2 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
                                <BlogPost
                                    date="Jan 01, 2023"
                                    title="Clever ways to invest in product to organize your portfolio"
                                    description="Discover smart investment strategies to streamline and organize your portfolio.."
                                    image="https://pagedone.io/asset/uploads/1696244317.png"
                                />
                                <BlogPost
                                    date="Feb 01, 2023"
                                    title="How to grow your profit through systematic investment with us"
                                    description="Unlock the power of systematic investment with us and watch your profits soar. Our.."
                                    image="https://pagedone.io/asset/uploads/1696244340.png"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
