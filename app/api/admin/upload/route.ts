import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  // Ensure the user is authenticated as an admin
  const cookieStore = cookies();
  const adminSession = cookieStore.get("admin_session")?.value;
  if (adminSession !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Basic type validation (images only)
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure upload directory exists inside public folder
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate unique name and write file
    const fileExt = file.name.split(".").pop() || "png";
    const fileName = `upload_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);

    const relativeUrl = `/uploads/${fileName}`;
    return NextResponse.json({ url: relativeUrl });
  } catch (error) {
    console.error("Local file upload error:", error);
    return NextResponse.json({ error: "Failed to upload image locally" }, { status: 500 });
  }
}
