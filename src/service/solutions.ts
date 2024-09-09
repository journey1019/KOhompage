import path from 'path';
import { readFile } from 'fs/promises';
import { cache } from 'react';

export type Advantage = {
    image: string;
    title: string;
    subTitle: string;
};

export type Solution = {
    solution: number;
    title: string;
    subTitle: string;
    image: string;
    advantage: Advantage[];
};

export const getAllSolutions = cache(async () => {
    const filePath = path.join(process.cwd(), 'data', 'solutions.json');
    return readFile(filePath, 'utf-8')
        .then<Solution[]>(JSON.parse)
})