import React from "react";

interface Props {
    params: { index: string };
}

const NewsDetailPage = async ({ params }: Props) => {
    const { index } = params;

    // Fetch news data from API
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news`);
    const newsData = await response.json();
    const news = newsData.find((item: any) => item.id === parseInt(index, 10));

    if (!news) {
        return <div className="p-6 mx-auto max-w-7xl">News not found</div>;
    }

    return (
        <div className="p-6 mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
            <p className="text-gray-500 mb-4">{new Date(news.date).toLocaleDateString()}</p>
            <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: news.content }}
            />
        </div>
    );
};

export default NewsDetailPage;
