// 비즈니스 로직을 담당
import path from 'path';
import {readFile} from 'fs/promises';
import internal from 'node:stream';

export type Partner = {
    index: number;
    name: string;
    category: string;
    issue: string;
    date: Date;
    end: boolean
}

export async function getFeaturedPosts():Promise<Partner[]> {
    return getAllPartners().then((partners) => partners.filter((partner) => partner.end));
}

export async function getNonFeaturedPosts():Promise<Partner[]> {
    return getAllPartners().then((partners) => partners.filter((partner) => !partner.end));
}

export async function getAllPartners():Promise<Partner[]> {
    const filePath = path.join(process.cwd(), 'data', 'partners.json');
    return readFile(filePath, 'utf-8')
        .then<Partner[]>(JSON.parse)
        .then(partners => partners.sort((a, b) => (a.date > b.date ? -1 : 1)))
}