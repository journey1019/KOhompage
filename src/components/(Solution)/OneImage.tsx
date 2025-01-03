'use client';

import { motion } from 'framer-motion';
import { Container } from "@/components/Container";
import Image from 'next/image';

const OneImage = ({ item }: { item: string }) => {
    // 애니메이션 설정
    const imageVariants = {
        hidden: { opacity: 0, y: -50 }, // 위에서 아래로 등장
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    return (
        <Container>
            <div className="flex w-full max-w-4xl mx-auto rounded-2xl">
                <motion.div
                    className="w-full h-full"
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }} // 화면에 30% 노출될 때 애니메이션 실행
                >
                    <Image
                        src={item}
                        alt={item}
                        className="object-contain w-full h-full"
                        width={50}
                        height={50}
                        unoptimized
                    />
                </motion.div>
            </div>
        </Container>
    );
};

export default OneImage;
