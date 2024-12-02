import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface PointProps {
    items: { text:string }[]
}
const Point: React.FC<PointProps> = ({ items }) => {
    return (
        <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                    {/* Left Section: Image */}
                    <div className="max-w-xl lg:max-w-lg">
                        <Image
                            src="/images/solutions/container-iot/Advantage.png" // 절대 경로 수정
                            className="object-cover w-full h-full"
                            alt="Advantage"
                            width={300}
                            height={500}
                            unoptimized
                        />
                    </div>

                    {/* Right Section: Points */}
                    <dl className="grid grid-cols-1 gap-x-1 gap-y-0 lg:pt-2"> {/* 간격 조정 */}
                        <div className="text-white text-4xl font-bold py-4">
                            Container Management
                        </div>
                        {items.map((item, index) => (
                            <div key={index} className="flex flex-row items-center">
                                <div className="rounded-md bg-white/5 p-2 ring-1 ring-gray-300 ring-white/10">
                                    <CheckCircleIcon aria-hidden="true" className="h-6 w-6 text-white" />
                                </div>
                                <p className="font-semibold text-white pl-3 text-xl m-0">{item.text}</p> {/* 여백 제거 */}
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
};
export default Point;