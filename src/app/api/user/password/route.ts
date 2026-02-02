import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PUT(request: NextRequest) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session.user?.isLoggedIn) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    try {
        // Get current user (Assuming single admin user based on session ID)
        const user = await prisma.user.findUnique({
            where: { id: session.user.id }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Verify current password
        const isValid = await bcrypt.compare(currentPassword, user.password);
        if (!isValid) {
            return NextResponse.json({ error: "Current password incorrect" }, { status: 400 });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: session.user.id },
            data: { password: hashedPassword }
        });

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: "Password update failed" }, { status: 500 });
    }
}
