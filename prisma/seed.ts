import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
        throw new Error("환경변수 ADMIN_EMAIL 또는 ADMIN_PASSWORD가 설정되어 있지 않습니다.");
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const existingAdmin = await prisma.user.findFirst({
        where: {
            role: 'ADMIN',
        },
    });

    if (existingAdmin) {
        await prisma.user.update({
            where: {
                id: existingAdmin.id,
            },
            data: {
                email: process.env.ADMIN_EMAIL,
                password: hashedPassword,
            },
        });
        console.log(`🔁 기존 ADMIN 계정의 이메일/비밀번호를 업데이트했습니다: ${process.env.ADMIN_EMAIL}`);
    } else {
        await prisma.user.create({
            data: {
                email: process.env.ADMIN_EMAIL,
                password: hashedPassword,
                role: 'ADMIN',
                name: '관리자',
            },
        });
        console.log(`✅ 새로운 ADMIN 계정을 생성했습니다: ${process.env.ADMIN_EMAIL}`);
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
