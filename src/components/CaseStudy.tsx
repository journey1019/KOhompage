import ContentCard from '@/components/ContentCard';

const contents = [
    {
        index: 1,
        title: "Search and Discovery",
        desc: "Website visitors today demand a frictionless user experience — especially when using search. Because of the high standards we tend to offer.",
        img: "https://www.material-tailwind.com/image/blog-11.jpeg",
        url: "1"
    },
    {
        index: 2,
        title: "Last visits in US",
        desc: "Wealth creation is an evolutionarily recent positive-sum game. Status is an old zero-sum game. Those attacking wealth creation are often just seeking status.",
        img: "https://www.material-tailwind.com/image/blog-10.jpeg",
        url: "2"
    },
    {
        index: 3,
        title: "Grow in a beautiful area",
        desc: "Free people make free choices. Free choices mean you get unequal outcomes. You can have freedom, or you can have equal outcomes. You can't have both.",
        img: "https://demos.creative-tim.com/material-kit-pro/assets/img/examples/card-blog2.jpg",
        url: "3"
    },
];

export default function CaseStudy() {
    return (
        <section className='w-full dark:bg-gray-900'>
            <section className="container mx-auto px-8 py-10 lg:py-28">
                <h2 className="text-2xl lg:text-3xl font-bold leading-snug text-gray-800 dark:text-white">
                    Resources
                </h2>
                <p className="mt-2 max-w-lg font-normal text-gray-500 dark:text-gray-400">
                    Read all the latest KOREAORBCOMM news from press releases to company announcements and more.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
                    {contents.map(({ index, title, desc, img, url }) => (
                        <ContentCard key={title} img={img} title={title} desc={desc} index={index} url={url}/>
                    ))}
                </div>

                <div className="mt-10 flex justify-center w-full">
                    <button
                        type="button"
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm lg:text-md px-5 py-2.5 me-2 mb-2
            dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                        View All
                    </button>
                </div>
            </section>
        </section>
    );
}
