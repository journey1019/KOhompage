// 비즈니스 로직을 담당
import path from 'path';
import {readFile} from 'fs/promises';

export type Partner = {
    index: number;
    name: string;
    category: string;
    issue: string;
    date: Date;
    end: boolean
}

export async function getAllPartner():Promise<Partner[]> {
    const filePath = path.join(process.cwd(), 'data', 'partner.json');
    return readFile(filePath, 'utf-8')
        .then<Partner[]>(JSON.parse)
}