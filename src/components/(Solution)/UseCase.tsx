import React from 'react';
import Image from 'next/image';

const Case: React.FC<{ direction: string; title1: string; title2:string; description: string; image: string; }> = ({ direction, title1, title2, description, image }) => {
    return (
        <div className="flex justify-center flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between gap-8 pb-72">
            {direction === 'left' ? (
                <>
                    <div className="w-full lg:w-2/5">
                        <div className="block lg:text-left text-center">
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-200 leading-[3.25rem] mb-5">
                                {title1} <span className="text-red-700">{title2}</span>
                            </h2>
                            <p className="text-gray-500 mb-10 max-lg:max-w-xl max-lg:mx-auto">
                                {description}
                            </p>
                            <div>
                                <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                    View More
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-3/5">
                        <div
                            className="flex justify-center gap-y-2 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
                            <div className="group w-full border border-gray-300 rounded-2xl">
                                <div className="flex items-center">
                                    <Image
                                        src={image}
                                        alt="blogs tailwind section" className="rounded-2xl w-full object-cover"
                                        width={500} height={300} unoptimized
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="w-full lg:w-3/5">
                        <div
                            className="flex justify-center gap-y-2 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
                            <div className="group w-full border border-gray-300 rounded-2xl">
                                <div className="flex items-center">
                                    <Image
                                        src={image}
                                        alt="blogs tailwind section" className="rounded-2xl w-full object-cover"
                                        width={500} height={300} unoptimized
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-2/5">
                        <div className="block lg:text-right text-center">
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-200 leading-[3.25rem] mb-5">
                                {title1} <span className="text-red-700">{title2}</span>
                            </h2>
                            <p className="text-gray-500 mb-10 max-lg:max-w-xl max-lg:mx-auto">
                                {description}
                            </p>
                            <div>
                                <button type="button"
                                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                    View More
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default function UseCase() {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Case
                        direction="left"
                        title1="Reefer"
                        title2="Connect"
                        description="You can monitor the location and status of all refrigerated container units and remotely adjust settings such as temperature. With automatic alarm notifications, you can quickly respond to critical situations such as equipment malfunctions or power outages in reefers. Installed on over 600,000 refrigerated containers worldwide, it helps transport lines, multimodal carriers, and shippers achieve verified ROI."
                        image="https://www.orbcomm.co.kr/resources/img/solution/reeferconnect/reffer1.PNG"
                    />
                    <Case
                        direction="right"
                        title1="NMS"
                        title2=""
                        description="You can monitor the location and status of all refrigerated container units and remotely adjust settings such as temperature. With automatic alarm notifications, you can quickly respond to critical situations such as equipment malfunctions or power outages in reefers. Installed on over 600,000 refrigerated containers worldwide, it helps transport lines, multimodal carriers, and shippers achieve verified ROI."
                        image="/images/solutions/nms_main.png"
                    />
                    <Case
                        direction="left"
                        title1=""
                        title2="VMS"
                        description="You can monitor the location and status of all refrigerated container units and remotely adjust settings such as temperature. With automatic alarm notifications, you can quickly respond to critical situations such as equipment malfunctions or power outages in reefers. Installed on over 600,000 refrigerated containers worldwide, it helps transport lines, multimodal carriers, and shippers achieve verified ROI."
                        image="https://www.orbcomm.co.kr/resources/img/solution/orbcommplatform/orbcommplatform_2.jpg"
                    />
                </div>
            </div>
        </section>
    )
}