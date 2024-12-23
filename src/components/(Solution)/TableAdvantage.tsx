import Image from 'next/image';
import React from 'react';

interface FeaturesData {
    messageSize: string;
    ogx: string;
    idp: string;
}
interface FeaturesProps {
    items: FeaturesData[];
}


const TableAdvantage: React.FC<FeaturesProps> = ({ items }) => {
    return (
        <section className="bg-white dark:bg-gray-900 mx-auto max-w-7xl p-6 lg:p-8 lg:pb-40">
            <h1 className="text-center text-3xl font-bold pb-6">OGx 위성서비스 특장점</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side: Icon and Text */}
                <div className="flex flex-col items-center lg:items-start">
                    {/* Icon */}
                    <div className="mb-4">
                        <Image
                            src="/images/icons/FastTime.png" // 아이콘 경로
                            alt="Icon Description"
                            width={100}
                            height={100}
                            className="object-contain" unoptimized
                        />
                    </div>
                    {/* Text */}
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Faster message delivery speeds
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        이전 세대의 위성보다 최대 40배 빠른 메시지 전송 속도로 향상된 위성 IoT 서비스를 지원합니다.
                    </p>
                </div>

                {/* Right Side: Table */}
                <div className="overflow-x-auto">
                    <table className="table-auto w-full h-full border-collapse border border-gray-300 dark:border-gray-700">
                        <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800">
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-md text-gray-700 dark:text-gray-300">
                                Message Size
                            </th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-md text-gray-700 dark:text-gray-300">
                                OGx
                            </th>
                            <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left text-md text-gray-700 dark:text-gray-300">
                                IDP
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item, index) => (
                            <tr
                                key={index}
                                className={`${
                                    index % 2 === 0
                                        ? 'bg-white dark:bg-gray-900'
                                        : 'bg-gray-50 dark:bg-gray-800'
                                }`}
                            >
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-md text-gray-700 dark:text-gray-300">
                                    {item.messageSize}
                                </td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-md text-gray-700 dark:text-gray-300">
                                    {item.ogx}
                                </td>
                                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-md text-gray-700 dark:text-gray-300">
                                    {item.idp}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}


export default TableAdvantage;