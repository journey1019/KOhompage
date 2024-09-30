// service/cases.ts
import path from 'path';
import { readFile } from 'fs/promises';

export type Case = {
    company: string;
    comment: string;
    url: string;
    index: string;
}

export async function getAllCases() {
    const filePath = path.join(process.cwd(), 'data', 'cases.json');
    const fileContents = await readFile(filePath, 'utf-8');
    return JSON.parse(fileContents) as Case[];
}
