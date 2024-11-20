import fs from 'fs';
import path from 'path';
import { parseMarkdown } from '@/service/markdown';
import { useTranslations } from 'next-intl';

interface PageProps {
    params: {
        locale: string;
        path: string;
    };
}

const HardDetailPage = async ({ params }: PageProps) => {
    const t = useTranslations('hardware');
    const { locale, path: hardwarePath } = params;

    // Markdown 파일 경로
    const filePath = path.join(process.cwd(), `data/hardware/${hardwarePath}.md`);

    // Markdown 파일 내용 읽기
    let content = '';
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        content = await parseMarkdown(fileContent); // 서버에서 Markdown 파싱
    } catch (error) {
        console.error(`Markdown file not found: ${filePath}`);
        return <div>{t('fileNotFound')}</div>;
    }

    return (
        <div className="mx-auto max-w-screen-lg px-4 py-16">
            <h1 className="text-3xl font-bold mb-4">{t('hardwareDetails')}</h1>
            <div className="prose dark:prose-dark" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
};

export default HardDetailPage;
