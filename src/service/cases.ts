import path from 'path';
import { readFile } from 'fs/promises';

export type Case = {
    company: string;
    comment: string;
    url: URL,
    index: string;
}

export async function getAllCases() {
    const filePath = path.join(process.cwd(), 'data', 'cases.json');
    return readFile(filePath, 'utf-8')
        .then<Case[]>(JSON.parse)
}