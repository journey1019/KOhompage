// src/app/[locale]/[...slug]/page.tsx

import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

export default async function DynamicPage({ params }: { params: { slug: string[] } }) {
    const { slug } = await params;

    // 유효한 페이지를 File System에서 가져오기
    const pagesDirectory = path.join(process.cwd(), "src/app/[locale]");
    const validPages = fs
        .readdirSync(pagesDirectory)
        .filter((file) => fs.statSync(path.join(pagesDirectory, file)).isDirectory());

    // slug[0]이 유효하지 않으면 404 처리
    if (!validPages.includes(slug[0])) {
        notFound();
    }

    return notFound();
    // return (
    //     <div className="p-6">
    //         <h1 className="text-2xl font-bold">Dynamic Page: {slug.join("/")}</h1>
    //         <p>This is a dynamically generated page.</p>
    //     </div>
    // );
}
