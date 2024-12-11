"use client";

import PageTopImage from '@/components/PageTopImage';
import React from 'react';

/**
 * @description:
 * */
export default function OneNoticePage() {
    return(
        <section>
            <PageTopImage
                size="py-28"
                url="/images/header/News.jpg"
                title="Notice"
                subtitle="게시글 각 제목"
                description="세부내용 || date"
                textPosition="center"
            />
        </section>
    )
}