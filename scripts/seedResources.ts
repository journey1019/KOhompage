import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    const filePath = path.join(__dirname, '../src/data/resource.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const resources = JSON.parse(jsonData);

    for (const item of resources) {
        try {
            await prisma.resource.create({
                data: {
                    title: item.title,
                    subtitle: item.subtitle || '',
                    tags: item.tags.join(','),
                    hideTag: item.hideTag.join(','),
                    solutionTag: item.solutionTag.join(','),
                    contentType: item.contentType,
                    form: item.form,
                    path: item.path,
                    image: item.image,
                    date: new Date(item.date),
                    use: item.use,
                },
            });
            console.log(`✅ Inserted: ${item.title}`);
        } catch (error) {
            console.error(`❌ Failed to insert "${item.title}":`, error);
        }
    }

    await prisma.$disconnect();
}

main();
