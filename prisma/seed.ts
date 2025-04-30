import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

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
}

main()
    .catch((e) => {
        console.error('❌ seed 실패:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
