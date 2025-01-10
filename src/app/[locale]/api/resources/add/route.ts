import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const resourceFilePath = path.join(process.cwd(), 'src/data/resource.json');

export async function POST(req: Request) {
    const newResource = await req.json();

    // 필수 입력값 검증
    const requiredFields = ['date', 'contentType', 'title', 'tags', 'form', 'image', 'path'];
    const missingFields = requiredFields.filter((field) => !newResource[field]);

    if (missingFields.length > 0) {
        return NextResponse.json(
            { error: `Missing required fields: ${missingFields.join(', ')}` },
            { status: 400 }
        );
    }

    try {
        const data = fs.readFileSync(resourceFilePath, 'utf-8');
        const resources = JSON.parse(data);

        resources.push(newResource);

        fs.writeFileSync(resourceFilePath, JSON.stringify(resources, null, 2));
        return NextResponse.json({ message: 'Resource added successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add resource' }, { status: 500 });
    }
}
