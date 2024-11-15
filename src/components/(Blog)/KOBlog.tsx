import Image from 'next/image';

export default function KOBlog() {
    return (
        <div className="py-12">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="w-full h-0.5 bg-gray-500" />
                <h1 className="text-black dark:text-white text-4xl items-start font-bold pt-5">가장 최근</h1>
                <div className="flex justify-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8 pt-5">
                    <div
                        className="flex justify-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8 pt-5">
                        <div className="group w-full max-lg:max-w-xl lg:w-1/2 border border-gray-300 rounded-2xl">
                            <div className="flex items-center">
                                <Image
                                    src="https://sendbird.imgix.net/cms/Push-notification-examples.jpg?auto=format,compress&crop=faces&w=1000"
                                    alt="blog_message"
                                    className="rounded-t-2xl w-full object-cover"
                                    width={500} height={400} unoptimized
                                />
                            </div>
                            <div
                                className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
                                <span
                                    className="bg-indigo-600 text-white rounded-full px-3 py-1 mb-3 w-max">blog</span>
                                <h4 className="text-xl text-gray-900 dark:text-white font-medium leading-8 mb-5">코리아오브컴
                                    NMS 메세징
                                    알림 기능 도입</h4>
                                <p className="text-gray-500 leading-6 mb-10">옴니버스 메시징 전략을 활용하여, 사용자를 NMS 서비스로 유입중인
                                    코리아오브컴. 중요한
                                    정보를 전달하며 단말과 위성 상태에 대해서 실시간으로 정보를 수집할 수 있다는 점에 특화되어있다. 효과적인 알람을 통해 우리 서비스가 더욱 많은
                                    사용자들에게 도움이
                                    될 수 있을 것이라고 본다.</p>
                                <a href="javascript:;"
                                   className="cursor-pointer text-lg text-indigo-600 font-semibold">Read
                                    more..</a>
                            </div>
                        </div>
                        <div className="group w-full max-lg:max-w-xl lg:w-1/2 border border-gray-300 rounded-2xl">
                            <div className="flex items-center">
                                <Image
                                    src="https://sendbird.imgix.net/cms/Push-notification-examples.jpg?auto=format,compress&crop=faces&w=1000"
                                    alt="blog_message"
                                    className="rounded-t-2xl w-full object-cover"
                                    width={500} height={400} unoptimized
                                />
                            </div>
                            <div
                                className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
                                <span
                                    className="bg-indigo-600 text-white rounded-full px-3 py-1 mb-3 w-max">blog</span>
                                <h4 className="text-xl text-gray-900 dark:text-white font-medium leading-8 mb-5">코리아오브컴
                                    NMS 메세징
                                    알림 기능 도입</h4>
                                <p className="text-gray-500 leading-6 mb-10">옴니버스 메시징 전략을 활용하여, 사용자를 NMS 서비스로 유입중인
                                    코리아오브컴. 중요한
                                    정보를 전달하며 단말과 위성 상태에 대해서 실시간으로 정보를 수집할 수 있다는 점에 특화되어있다. 효과적인 알람을 통해 우리 서비스가 더욱 많은
                                    사용자들에게 도움이
                                    될 수 있을 것이라고 본다.</p>
                                <a href="javascript:;"
                                   className="cursor-pointer text-lg text-indigo-600 font-semibold">Read
                                    more..</a>
                            </div>
                        </div>
                        <div className="group w-full max-lg:max-w-xl lg:w-1/2 border border-gray-300 rounded-2xl">
                            <div className="flex items-center">
                                <Image
                                    src="https://sendbird.imgix.net/cms/Push-notification-examples.jpg?auto=format,compress&crop=faces&w=1000"
                                    alt="blog_message"
                                    className="rounded-t-2xl w-full object-cover"
                                    width={500} height={400} unoptimized
                                />
                            </div>
                            <div
                                className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
                                <span
                                    className="bg-indigo-600 text-white rounded-full px-3 py-1 mb-3 w-max">blog</span>
                                <h4 className="text-xl text-gray-900 dark:text-white font-medium leading-8 mb-5">코리아오브컴
                                    NMS 메세징
                                    알림 기능 도입</h4>
                                <p className="text-gray-500 leading-6 mb-10">옴니버스 메시징 전략을 활용하여, 사용자를 NMS 서비스로 유입중인
                                    코리아오브컴. 중요한
                                    정보를 전달하며 단말과 위성 상태에 대해서 실시간으로 정보를 수집할 수 있다는 점에 특화되어있다. 효과적인 알람을 통해 우리 서비스가 더욱 많은
                                    사용자들에게 도움이
                                    될 수 있을 것이라고 본다.</p>
                                <a href="javascript:;"
                                   className="cursor-pointer text-lg text-indigo-600 font-semibold">Read
                                    more..</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}