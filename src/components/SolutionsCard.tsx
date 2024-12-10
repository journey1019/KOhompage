import Image from "next/image";
import { Solution } from "@/service/solutions";

type Props = { solution: Solution };
export default function SolutionsCard({
                                          solution: { title, subTitle, image, advantage, slug },
                                      }: Props) {
    return (
        <div className="relative isolate overflow-hidden bg-gray-900 py-10 sm:py-16 lg:py-20 min-h-[700px]">
            {/* Header */}
            <p className="w-full text-gray-400 font-semibold pb-16 text-center">
                Our Solutions
            </p>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 items-center">
                    {/* Text Section */}
                    <div className="max-w-xl lg:max-w-lg">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            {title}
                        </h2>
                        <p className="mt-4 text-sm leading-6 text-gray-500 sm:text-base md:text-lg lg:text-xl dark:text-gray-300 line-clamp-3">
                            {subTitle}
                        </p>
                        <div className="mt-8 flex justify-start">
                            <a
                                href={`/solutions/${slug}`}
                                type="button"
                                className="border focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm lg:text-md px-5 py-2.5 me-2 mb-2 bg-gray-800 text-white border-gray-600 hover:border-gray-600 hover:bg-gray-700"
                            >
                                Read More
                            </a>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="flex justify-center items-center">
                        <Image
                            src={image}
                            alt="Solution Image"
                            className="w-[700px] h-[400px] object-cover rounded-lg"
                            width={400}
                            height={400}
                            unoptimized
                        />
                    </div>
                </div>
            </div>

            {/* Advantage Section */}
            <div className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-6">
                {advantage.map((good) => (
                    <div
                        key={good.image}
                        className="flex flex-col items-center p-5 bg-gray-800 rounded-lg hover:shadow-lg transition-shadow duration-300"
                    >
                        <Image
                            src={good.image}
                            alt="Advantage Icon"
                            className="w-20 h-20 object-contain my-4 filter invert brightness-50"
                            width={80}
                            height={80}
                            unoptimized
                        />
                        <h2 className="text-base font-medium text-gray-400 dark:text-white text-center">
                            {good.title}
                        </h2>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center line-clamp-3">
                            {good.subTitle}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
