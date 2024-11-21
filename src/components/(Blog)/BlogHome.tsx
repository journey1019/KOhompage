import Image from 'next/image';
import Link from 'next/link';

export default function BlogHome() {
    return(
        <section>
            <div className="group mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-black dark:text-white text-4xl items-start font-bold pt-5">블로그 홈</h1>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 pt-5">
                    <dl className="flex justify-center">
                        <Image
                            src="https://sendbird.imgix.net/cms/sms-vs-push_notification.png?auto=format,compress&crop=faces&w=1000"
                            className="w-full h-auto filter dark:brightness-75 object-cover rounded-lg"
                            alt="Solution Image"
                            width={500}
                            height={800}
                            unoptimized
                        />
                    </dl>
                    <div className="max-w-xl lg:max-w-lg">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            실시간 위성, 단말 상황을 모니터링 & 최고의 M2M 솔루션
                        </h2>
                        <p className="mt-4 text-md leading-8 text-gray-600 dark:text-gray-300 sm:text-lg md:text-xl lg:text-2xl">
                            우리는 위성통신을 기반으로 실시간으로 수집하는 데이터를 분석하고 통계합니다. 이를 통해 사용자에게 ...
                        </p>
                        <Link href="javascript:;" className="mt-12 cursor-pointer text-lg text-indigo-600 font-semibold">Read more..</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}