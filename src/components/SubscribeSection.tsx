// app/components/SubscribeSection.tsx

import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline';

export default function SubscribeSection() {
    return (
        <div className="relative isolate overflow-hidden dark:bg-gray-900 py-16 sm:py-24 lg:pt-10 lg:pb-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                    <div className="max-w-xl lg:max-w-lg">
                        <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
                            Subscribe to our newsletter.
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
                            Sign up to receive our latest news, updates and more.
                        </p>
                        <div className="mt-6 flex max-w-md gap-x-4">
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                placeholder="Enter your email"
                                autoComplete="email"
                                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-black dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                            <button
                                type="submit"
                                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                        <div className="flex flex-col items-start">
                            <div className="rounded-md bg-gray-200 dark:bg-white/5 p-2 ring-1 ring-gray-300 dark:ring-white/10">
                                <CalendarDaysIcon aria-hidden="true" className="h-6 w-6 text-black dark:text-white" />
                            </div>
                            <dt className="mt-4 font-semibold text-black dark:text-white">Weekly articles</dt>
                            <dd className="mt-2 leading-7 text-gray-600 dark:text-gray-400">
                                Non laboris consequat cupidatat laborum magna. Eiusmod non irure cupidatat duis commodo amet.
                            </dd>
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="rounded-md bg-gray-200 dark:bg-white/5 p-2 ring-1 ring-gray-300 dark:ring-white/10">
                                <HandRaisedIcon aria-hidden="true" className="h-6 w-6 text-black dark:text-white" />
                            </div>
                            <dt className="mt-4 font-semibold text-black dark:text-white">No spam</dt>
                            <dd className="mt-2 leading-7 text-gray-600 dark:text-gray-400">
                                Officia excepteur ullamco ut sint duis proident non adipisicing. Voluptate incididunt anim.
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

        </div>
    );
};