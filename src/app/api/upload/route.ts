import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import { cookies } from "next/headers";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session.user?.isLoggedIn) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + "_" + file.name.replace(/\s/g, "_");

    const uploadDir = path.join(process.cwd(), "public", "uploads");

    try {
        await writeFile(path.join(uploadDir, filename), buffer);
        return NextResponse.json({ url: `/uploads/${filename}` });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
