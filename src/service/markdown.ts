import { remark } from 'remark';
import html from 'remark-html';

export async function parseMarkdown(content: string): Promise<string> {
    const result = await remark().use(html).process(content);
    return result.toString();
}
