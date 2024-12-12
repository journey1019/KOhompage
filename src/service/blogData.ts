import blogData from "../../data/resources/blog.json";


export interface BlogCardProps {
    title: string;
    description: string;
    images: string;
    path: string;
    form: "link" | "pdf";
    tags: string[];
    classification: string;
    date: string;
}

// JSON 데이터를 BlogCardProps[] 타입으로 명시적으로 선언
const getBlogData = (): BlogCardProps[] => {
    return blogData as BlogCardProps[];
};

export default getBlogData;