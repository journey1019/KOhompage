// src/app/api/resources/route.ts
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'src/data/resources.json')

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const file = await fs.readFile(DATA_PATH, 'utf-8')
        const resources = JSON.parse(file)
        resources.unshift(body) // 최신 항목을 앞에 추가

        await fs.writeFile(DATA_PATH, JSON.stringify(resources, null, 2))

        return NextResponse.json({ status: 'ok' })
    } catch (err) {
        console.error(err)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
