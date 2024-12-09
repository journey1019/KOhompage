"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import BlogCard from "./BlogCard";
import BlogControls from "./BlogControls";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Blog = {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
};

const blogData: Blog[] = [
    {
        id: 1,
        title: "Clever ways to invest in product to organize your portfolio",
        description: "Discover smart investment strategies to streamline and organize your portfolio.",
        imageUrl: "/images/posts/javascript-10-tips.png",
    },
    {
        id: 2,
        title: "How to grow your profit through systematic investment with us",
        description: "Unlock the power of systematic investment with us and watch your profits soar.",
        imageUrl: "/images/posts/best-react-practices.png",
    },
];

export default function BlogSlider() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap lg:flex-nowrap lg:justify-between gap-8">
                    {/* Left Section */}
                    <div className="w-full lg:w-2/5 text-center lg:text-left">
                        <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-5">
                            Our latest <span className="text-indigo-600">blogs</span>
                        </h2>
                        <p className="text-gray-500 mb-10">
                            Welcome to our blog section, where knowledge meets inspiration. Explore insightful articles, expert tips, and the latest trends in our field.
                        </p>
                        <a
                            href="#"
                            className="cursor-pointer border border-gray-300 shadow-sm rounded-full py-3.5 px-7 w-52 flex justify-center mx-auto lg:mx-0 text-gray-900 font-semibold transition-all duration-300 hover:bg-gray-100"
                        >
                            View All
                        </a>
                    </div>

                    {/* Right Section (Slider) */}
                    <div className="w-full lg:w-3/5">
                        <Swiper
                            modules={[Navigation, Pagination]}
                            navigation={{
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                            }}
                            pagination={{ clickable: true }}
                            slidesPerView={2}
                            spaceBetween={28}
                            loop={true}
                            breakpoints={{
                                0: { slidesPerView: 1, spaceBetween: 20 },
                                768: { slidesPerView: 2, spaceBetween: 28 },
                            }}
                        >
                            {blogData.map((blog) => (
                                <SwiperSlide key={blog.id}>
                                    <BlogCard {...blog} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <BlogControls />
                    </div>
                </div>
            </div>
        </section>
    );
}
