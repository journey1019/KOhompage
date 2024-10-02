import ContentCard from '@/components/ContentCard';

const contents = [
    {
        img: "https://www.material-tailwind.com/image/blog-11.jpeg",
        title: "Search and Discovery",
        desc: "Website visitors today demand a frictionless user experience — especially when using search. Because of the high standards we tend to offer.",
        index: 1, // index 번호 추가
    },
    {
        img: "https://www.material-tailwind.com/image/blog-10.jpeg",
        title: "Last visits in US",
        desc: "Wealth creation is an evolutionarily recent positive-sum game. Status is an old zero-sum game. Those attacking wealth creation are often just seeking status.",
        index: 2, // index 번호 추가
    },
    {
        img: "https://demos.creative-tim.com/material-kit-pro/assets/img/examples/card-blog2.jpg",
        title: "Grow in a beautiful area",
        desc: "Free people make free choices. Free choices mean you get unequal outcomes. You can have freedom, or you can have equal outcomes. You can't have both.",
        index: 3, // index 번호 추가
    },
];

export function BlogSection() {
    return (
        <section className="container mx-auto px-8 py-10 lg:py-28">
            <h2 className="text-2xl lg:text-3xl font-bold leading-snug text-gray-800">
                Resources
            </h2>
            <p className="mt-2 max-w-lg font-normal text-gray-500">
                We&apos;re constantly trying to express ourselves and actualize our
                dreams. If you have the opportunity to play this game of life you need
                to appreciate every moment.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
                {contents.map(({ img, title, desc, index }) => (
                    <ContentCard key={title} img={img} title={title} desc={desc} index={index} />
                ))}
            </div>

            <div className="mt-10 flex justify-center w-full">
                <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm lg:text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    View All
                </button>
            </div>
        </section>
    );
}

export default BlogSection;
