import path from 'path';
import {readFile} from 'fs/promises';
import {cache} from 'react';

export type Hardware = {
    title: string;
    description: string;
    brochure: string;
    devkit: string;
    category: string;
    tag: string[];
    path: string;
    featured: boolean;
}

export type HardwareData = Hardware & {
    content: string;
    next: Hardware | null;
    prev: Hardware | null;
}

export const getAllHardwares = cache(async () => {
    const filePath = path.join(process.cwd(), 'data', 'hardware.json');
    return readFile(filePath, 'utf-8')
        .then<Hardware[]>(JSON.parse)
})

export async function getMovieData(fileName: string): Promise<HardwareData> {
    const filePath = path.join(process.cwd(), 'data', 'hardware', `${fileName}.md`);
    const hardwares = await getAllHardwares();
    const hardware = hardwares.find((hardware) => hardware.path === fileName);
    if (!hardware) throw new Error(`${fileName}에 해당하는 포스트 찾을 수 없음`);

    const index = hardwares.indexOf(hardware);
    const next = index > 0 ? hardwares[index - 1] : null;
    const prev = index < hardwares.length ? hardwares[index + 1] : null;
    const content = await readFile(filePath, 'utf-8');

    return {...hardware, content, next, prev };
}