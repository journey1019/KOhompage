interface BlogPostProps {
    title: string;
    img: string;
    content: string;
}

const BlogPost = ({ title, img, content }: BlogPostProps) => {
    return (
        <div className="rounded-lg shadow-lg overflow-hidden">
            <img src={img} alt={title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p>{content}</p>
            </div>
        </div>
    );
};

export default BlogPost;
