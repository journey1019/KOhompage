import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
    const existingAdmin = await prisma.user.findFirst({
        where: {
            role: 'ADMIN',
        },
    });

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('admin123!!', 10);

        await prisma.user.create({
            data: {
                email: 'admin@gmail.com',
                name: '관리자',
                password: hashedPassword,
                role: 'ADMIN', // 명시적으로 ADMIN
            },
        });

        console.log('✅ 관리자 계정이 생성되었습니다.');
    } else {
        console.log('⚠️ 이미 관리자 계정이 존재합니다. 추가 생성하지 않음.');
    }


    // 📁 resource.json 불러오기
    const resourcePath = path.join(__dirname, '../src/data/resource.json');
    const resourceRaw = fs.readFileSync(resourcePath, 'utf-8');
    const resources = JSON.parse(resourceRaw);

    for (const item of resources) {
        const exists = await prisma.resource.findFirst({
            where: {
                title: item.title,
                date: new Date(item.date),
            },
        });

        if (exists) {
            console.log(`🔁 이미 존재하는 리소스: ${item.title} - 스킵`);
            continue;
        }

        await prisma.resource.create({
            data: {
                date: new Date(item.date),
                contentType: item.contentType,
                title: item.title,
                subtitle: item.subtitle,
                tags: item.tags.join(','),             // 배열 → 문자열
                hideTag: item.hideTag.join(','),
                solutionTag: item.solutionTag.join(','),
                form: item.form,
                image: item.image,
                path: item.path,
                use: item.use,
            },
        });

        console.log(`✅ 리소스 추가됨: ${item.title}`);
    }
}

main()
    .catch((e) => {
        console.error('❌ seed 실패:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
