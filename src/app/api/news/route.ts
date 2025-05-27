import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const newsFilePath = path.resolve(process.cwd(), "data/resources/news.json");

export const runtime = 'nodejs'

// GET: Fetch all news data
export async function GET() {
    const data = fs.readFileSync(newsFilePath, "utf-8");
    return NextResponse.json(JSON.parse(data));
}

// POST: Save new news data
export async function POST(req: Request) {
    const newNews = await req.json();
    const existingData = JSON.parse(fs.readFileSync(newsFilePath, "utf-8"));

    // Append the new news item
    const updatedData = [...existingData, newNews];
    fs.writeFileSync(newsFilePath, JSON.stringify(updatedData, null, 2));

    return NextResponse.json({ success: true });
}
