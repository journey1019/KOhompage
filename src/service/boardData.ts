import boardData from "../../data/resources/board.json";


export interface BoardCardProps {
    index?: number;
    title: string;
    description: string;
    images: string;
    date: string;
    classification: string;
    form: "link" | "page";
    path: string;
    tags: string[];
}

// JSON 데이터를 BlogCardProps[] 타입으로 명시적으로 선언
const getBlogData = (): BoardCardProps[] => {
    return boardData as BoardCardProps[];
};

export default getBlogData;