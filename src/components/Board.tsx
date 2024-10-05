'use client';

import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // React Router를 가져옵니다.
import blogData from '../../data/blogData.json';

export default function Board() {
    const [latestPost, setLatestPost] = useState(null);
    const [otherPosts, setOtherPosts] = useState([]);

    useEffect(() => {
        // 최신순으로 데이터 정렬
        const sortedData = blogData.sort((a, b) => new Date(b.date) - new Date(a.date));

        // 상단에 가장 최신 데이터, 그 다음 3개를 저장
        setLatestPost(sortedData[0]);
        setOtherPosts(sortedData.slice(1, 4));  // 세 개의 다른 항목을 배열로 저장
    }, []);

    if (!latestPost || otherPosts.length === 0) return <p>Loading...</p>;

    // const handleReadMore = () => {
    //     navigate(`/board/${latestPost.category}/${latestPost.id}`); // navigate를 사용하여 경로 이동
    // };
    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="font-manrope text-4xl font-bold text-gray-900 text-center mb-8">Resources</h2>
                <div className="flex justify-center">
                    <p className="font-manrope text-lg max-w-lg text-gray-500 dark:text-gray-400 mb-16 text-center">
                        Read all the latest KOREAORBCOMM news from press releases to company announcements and more.
                    </p>
                </div>

                {/* 상단의 최신 데이터 */}
                <div className="border border-gray-300 rounded-lg p-4 lg:p-6 flex flex-col lg:flex-row justify-between">
                    <div className="flex flex-col lg:w-1/2">
                        <span
                            className="bg-indigo-600 text-white rounded-full px-3 py-1 mb-3 w-max">{latestPost.category}</span>
                        <h4 className="text-xl text-gray-900 font-medium leading-8 mb-5">{latestPost.title}</h4>
                        <p className="text-gray-500 leading-6 mb-10">{latestPost.content}</p>
                        <button type="button"
                                className="w-1/3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                            Read More
                        </button>
                        {/*<button*/}
                        {/*    type="button"*/}
                        {/*    onClick={handleReadMore} // 클릭 시 핸들러 호출*/}
                        {/*    className="w-1/3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700">*/}
                        {/*    Read More*/}
                        {/*</button>*/}
                    </div>
                    <img
                        className="h-64 w-full lg:h-1/3 lg:w-1/2 rounded-lg mt-5 lg:mt-0"
                        src={latestPost.thumbnail}
                        alt={latestPost.title}
                    />
                </div>

                {/* 나머지 세 개의 컴포넌트 */}
                <div
                    className="flex justify-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8 pt-5">
                    {otherPosts.map((post) => (
                        <div key={post.id}
                             className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl">
                            <div className="flex items-center">
                                <img src={post.thumbnail} alt={post.title}
                                     className="rounded-t-2xl w-full object-cover" />
                            </div>
                            <div
                                className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
                                <span
                                    className={`bg-${post.category === 'BLOG' ? 'blue' : post.category === 'NOTICE' ? 'green' : 'red'}-500 text-white rounded-full px-3 py-1 mb-3 w-max`}>{post.category}</span>
                                <h4 className="text-xl text-gray-900 font-medium leading-8 mb-5">{post.title}</h4>
                                <p className="text-gray-500 leading-6 mb-10">{post.content}</p>
                                <a href="javascript:;" className="cursor-pointer text-lg text-indigo-600 font-semibold">Read
                                    more..</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// export default function Board() {
//     return(
//         <section className="py-24">
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                 <h2 className="font-manrope text-4xl font-bold text-gray-900 text-center mb-16">Our latest blog</h2>
//
//                 <div className="border border-gray-300 rounded-lg p-4 lg:p-6 flex flex-col lg:flex-row justify-between">
//                     <div className="flex flex-col lg:w-1/2">
//                         {/* Badge for Category */}
//                         <span className="bg-indigo-600 text-white rounded-full px-3 py-1 mb-3 w-max">NEWS</span>
//                         <h4 className="text-xl text-gray-900 font-medium leading-8 mb-5">
//                             Clever ways to invest in product to organize your portfolio
//                         </h4>
//                         <p className="text-gray-500 leading-6 mb-10">
//                             Discover smart investment strategies to streamline and organize your portfolio..
//                         </p>
//                         <button type="button" className="w-1/3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
//                             Read More
//                         </button>
//                     </div>
//                     <img
//                         className="h-64 w-full lg:h-1/3 lg:w-1/2 rounded-lg mt-5 lg:mt-0"
//                         src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg"
//                         alt="recent blog section"
//                     />
//                 </div>
//
//                 <div
//                     className="flex justify-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8 pt-5">
//                     <div className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl">
//                         <div className="flex items-center">
//                             <img src="https://pagedone.io/asset/uploads/1696244317.png" alt="blogs tailwind section"
//                                  className="rounded-t-2xl w-full object-cover" />
//                         </div>
//                         <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
//                             {/* Badge for Category */}
//                             <span className="bg-blue-500 text-white rounded-full px-3 py-1 mb-3 w-max">BLOG</span>
//                             <h4 className="text-xl text-gray-900 font-medium leading-8 mb-5">Clever ways to invest in
//                                 product to organize your portfolio</h4>
//                             <p className="text-gray-500 leading-6 mb-10">Discover smart investment strategies to
//                                 streamline and organize your portfolio..</p>
//                             <a href="javascript:;" className="cursor-pointer text-lg text-indigo-600 font-semibold">Read
//                                 more..</a>
//                         </div>
//                     </div>
//                     <div className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl">
//                         <div className="flex items-center">
//                             <img src="https://pagedone.io/asset/uploads/1696244340.png" alt="blogs tailwind section"
//                                  className="rounded-t-2xl w-full object-cover" />
//                         </div>
//                         <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
//                             {/* Badge for Category */}
//                             <span className="bg-green-500 text-white rounded-full px-3 py-1 mb-3 w-max">NOTICE</span>
//                             <h4 className="text-xl text-gray-900 font-medium leading-8 mb-5">How to grow your profit
//                                 through systematic investment with us</h4>
//                             <p className="text-gray-500 leading-6 mb-10">Unlock the power of systematic investment with
//                                 us and watch your profits soar. Our..</p>
//                             <a href="javascript:;" className="cursor-pointer text-lg text-indigo-600 font-semibold">Read
//                                 more..</a>
//                         </div>
//                     </div>
//                     <div className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl">
//                         <div className="flex items-center">
//                             <img src="https://pagedone.io/asset/uploads/1696244356.png" alt="blogs tailwind section"
//                                  className="rounded-t-2xl w-full object-cover" />
//                         </div>
//                         <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
//                             {/* Badge for Category */}
//                             <span className="bg-red-500 text-white rounded-full px-3 py-1 mb-3 w-max">NEWS</span>
//                             <h4 className="text-xl text-gray-900 font-medium leading-8 mb-5">How to analyze every
//                                 holdings of your portfolio</h4>
//                             <p className="text-gray-500 leading-6 mb-10">Our comprehensive guide will equip you with the
//                                 tools and insights needed to..</p>
//                             <a href="javascript:;" className="cursor-pointer text-lg text-indigo-600 font-semibold">Read
//                                 more..</a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }


// export default function Board() {
//     return (
//         <section className="py-24">
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                 <h2 className="font-manrope text-4xl font-bold text-gray-900 text-center mb-16">Our latest blog</h2>
//
//                 <div className="flex justify-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8 pt-5">
//                     {content.map((post) => (
//                         <div key={post.id} className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl">
//                             <div className="flex items-center">
//                                 <img src={post.thumbnail} alt={post.title} className="rounded-t-2xl w-full object-cover" />
//                             </div>
//                             <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
//                                 {/* Badge for Category */}
//                                 <span className={`bg-${post.category === 'news' ? 'blue' : 'green'}-500 text-white rounded-full px-3 py-1 mb-3 w-max`}>
//                                     {post.category.toUpperCase()}
//                                 </span>
//                                 <h4 className="text-xl text-gray-900 font-medium leading-8 mb-5">{post.title}</h4>
//                                 <p className="text-gray-500 leading-6 mb-10">{post.content.slice(0, 100)}...</p>
//                                 {/* 동적 라우팅을 위한 Link */}
//                                 <Link className="cursor-pointer text-lg text-indigo-600 font-semibold" href={`/board/${post.category}/${post.id}`}>
//                                     Read more..
//                                 </Link>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }
