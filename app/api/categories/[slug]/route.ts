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
    return [];
  }
};

const writeCategories = (categories: Category[]): boolean => {
  try {
    const filePath = getFilePath();
    fs.writeFileSync(filePath, JSON.stringify(categories, null, 2), "utf-8");
    return true;
  } catch (error) {
    return false;
  }
};

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  // Ensure the user is authenticated as an admin
  const cookieStore = cookies();
  const adminSession = cookieStore.get("admin_session")?.value;
  if (adminSession !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = params;

  try {
    const body = await request.json();
    const { label, code, icon, section, description, tags, coverImage } = body;

    const categories = readCategories();
    const index = categories.findIndex((c) => c.slug === slug);

    if (index === -1) {
      return NextResponse.json({ error: "Category beat not found" }, { status: 404 });
    }

    categories[index] = {
      ...categories[index],
      label: label ?? categories[index].label,
      code: code ?? categories[index].code,
      icon: icon ?? categories[index].icon,
      section: section ?? categories[index].section,
      description: description ?? categories[index].description,
      tags: tags !== undefined ? (Array.isArray(tags) ? tags : String(tags).split(",").map(t => t.trim())) : categories[index].tags,
      coverImage: coverImage !== undefined ? coverImage : categories[index].coverImage,
    };

    const success = writeCategories(categories);
    if (!success) {
      return NextResponse.json({ error: "Failed to update category beat" }, { status: 500 });
    }

    return NextResponse.json(categories[index]);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  // Ensure the user is authenticated as an admin
  const cookieStore = cookies();
  const adminSession = cookieStore.get("admin_session")?.value;
  if (adminSession !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = params;
  const categories = readCategories();
  const index = categories.findIndex((c) => c.slug === slug);

  if (index === -1) {
    return NextResponse.json({ error: "Category beat not found" }, { status: 404 });
  }

  // Optional: Prevent deleting default beats if needed, or allow it
  categories.splice(index, 1);

  const success = writeCategories(categories);
  if (!success) {
    return NextResponse.json({ error: "Failed to delete category beat" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
