import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    const existingAdmin = await prisma.user.findFirst({
        where: {
            role: 'ADMIN',
        },
    });

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('@gccko2512', 10);
        await prisma.user.create({


            data: {
                email: 'support@orbcomm.co.kr',
                name: '관리자',
                password: hashedPassword,
                role: 'ADMIN', // 명시적으로 ADMIN

            },
        });

        console.log('✅ 관리자 계정이 생성되었습니다.');
    } else {
        console.log('⚠️ 이미 관리자 계정이 존재합니다. 추가 생성하지 않음.');
    }

    // --- 하드웨어 데이터 삽입 ---
    const filePath = path.join(process.cwd(), 'src/data/hardware.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const hardwares = JSON.parse(rawData);

    for (const item of hardwares) {
        const exists = await prisma.hardware.findFirst({
            where: {
                title: item.title,
                date: new Date(item.date),
            },
        });

        if (exists) {
            console.log(`🔁 이미 존재: ${item.title} - 건너뜀`);
            continue;
        }

        await prisma.hardware.create({
            data: {
                date: new Date(item.date),
                category: item.category,
                title: item.title,
                subtitle: item.subTitle || '',
                description: item.description || '',
                tags: item.tags.join(','),
                hideTag: item.hideTag.join(','),
                solutionTag: item.solutionTag.join(','),
                imageSrc: item.imageSrc,
                slug: item.slug,
                path: item.path,
                use: item.use,
            },
        });

        console.log(`✅ 삽입 완료: ${item.title}`);
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