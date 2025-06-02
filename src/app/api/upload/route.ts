
// src/app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { IncomingForm } from 'formidable'
import { promisify } from 'util'
import fs from 'fs'

export const runtime = 'nodejs'

// Next.js 13 App Router에서 Edge Runtime이 기본이므로 설정 필요
export const config = {
    api: {
        bodyParser: false,
    },
}

const parseForm = (req: any): Promise<{ fields: any; files: any }> => {
    const form = new IncomingForm()
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            resolve({ fields, files })
        })
    })
}


export async function POST(req: NextRequest) {
    const contentType = req.headers.get('x-content-type') || 'misc'

    try {
        const { files } = await parseForm((req as any).req)
        const file = files.image?.[0]
        if (!file) return new NextResponse('No image uploaded', { status: 400 })

        const contentTypeDir = contentType.toLowerCase()
        const uploadDir = path.join(process.cwd(), '/images/resources', contentTypeDir)
        await mkdir(uploadDir, { recursive: true })

        const fileName = path.basename(file.originalFilename || 'upload.png')
        const filePath = path.join(uploadDir, fileName)

        await writeFile(filePath, fs.readFileSync(file.filepath))

        const imagePath = `/images/resources/${contentTypeDir}/${fileName}`
        return NextResponse.json({ imagePath })
    } catch (err) {
        console.error('Upload error:', err)
        return new NextResponse('Upload failed', { status: 500 })
    }
}
