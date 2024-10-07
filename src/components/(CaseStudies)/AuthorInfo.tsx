export default function AuthorInfo() {
    return(
        <section>
            <address className="flex items-center mb-6 not-italic">
                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    <img
                        className="mr-4 w-16 h-16 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        alt="Jese Leos"
                    />
                    <div>
                        <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">
                            Jese Leos
                        </a>
                        <p className="text-base text-gray-500 dark:text-gray-400">
                            Graphic Designer, educator & CEO Flowbite
                        </p>
                        <p className="text-base text-gray-500 dark:text-gray-400">
                            <time dateTime="2022-02-08" title="February 8th, 2022">
                                Feb. 8, 2022
                            </time>
                        </p>
                    </div>
                </div>
            </address>
        </section>
    )
}