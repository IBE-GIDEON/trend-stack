import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import type { Category } from "@/data/types";

const getFilePath = () => path.join(process.cwd(), "data", "categories.json");

const readCategories = (): Category[] => {
  try {
    const filePath = getFilePath();
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading categories JSON:", error);
    return [];
  }
};

const writeCategories = (categories: Category[]): boolean => {
  try {
    const filePath = getFilePath();
    fs.writeFileSync(filePath, JSON.stringify(categories, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing categories JSON:", error);
    return false;
  }
};

export async function GET() {
  const categories = readCategories();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  // Ensure the user is authenticated as an admin
  const cookieStore = cookies();
  const adminSession = cookieStore.get("admin_session")?.value;
  if (adminSession !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { slug, label, code, icon, section, description, tags, coverImage } = body;

    if (!slug || !label || !code) {
      return NextResponse.json({ error: "Missing required fields: slug, label, and code are required" }, { status: 400 });
    }

    const categories = readCategories();

    // Check duplicate slug
    if (categories.some((c) => c.slug === slug)) {
      return NextResponse.json({ error: "Category slug already exists" }, { status: 400 });
    }

    const newCategory: Category = {
      slug,
      label,
      code,
      icon: icon || "📄",
      section: section || "Beats & Documents",
      description: description || "",
      tags: Array.isArray(tags) ? tags : (tags ? String(tags).split(",").map(t => t.trim()) : []),
      coverImage: coverImage || "",
    };

    categories.push(newCategory);

    const success = writeCategories(categories);
    if (!success) {
      return NextResponse.json({ error: "Failed to persist category" }, { status: 500 });
    }

    return NextResponse.json(newCategory);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
