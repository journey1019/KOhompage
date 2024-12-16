import fs from "fs";
import path from "path";

export interface NewsData {
    id: number;
    title: string;
    content: string;
    date: string;
}

const newsFilePath = path.resolve(process.cwd(), "/data/resources/news.json");

export const getNewsData = (): NewsData[] => {
    const data = fs.readFileSync(newsFilePath, "utf-8");
    return JSON.parse(data);
};

export const saveNewsData = (newNews: NewsData): void => {
    const existingData = getNewsData();
    const updatedData = [...existingData, newNews];
    fs.writeFileSync(newsFilePath, JSON.stringify(updatedData, null, 2));
};
