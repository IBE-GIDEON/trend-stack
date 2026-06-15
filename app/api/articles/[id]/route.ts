import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import type { Article } from "@/data/types";

const getFilePath = () => path.join(process.cwd(), "data", "articles.json");

const readArticles = (): Article[] => {
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

const writeArticles = (articles: Article[]): boolean => {
  try {
    const filePath = getFilePath();
    fs.writeFileSync(filePath, JSON.stringify(articles, null, 2), "utf-8");
    return true;
  } catch (error) {
    return false;
  }
};

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const adminSession = cookieStore.get("admin_session")?.value;
  if (adminSession !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  try {
    const body = await request.json();
    const { title, slug, excerpt, category, author, readingMinutes, coverSeed, image, trending, aiInsights } = body;

    const articles = readArticles();
    const index = articles.findIndex((a) => a.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Update properties dynamically
    articles[index] = {
      ...articles[index],
      title: title ?? articles[index].title,
      slug: slug ?? articles[index].slug,
      excerpt: excerpt ?? articles[index].excerpt,
      category: category ?? articles[index].category,
      author: author ? {
        name: author.name ?? articles[index].author.name,
        role: author.role ?? articles[index].author.role,
      } : articles[index].author,
      readingMinutes: readingMinutes !== undefined ? Number(readingMinutes) : articles[index].readingMinutes,
      coverSeed: coverSeed ?? articles[index].coverSeed,
      image: image !== undefined ? (image || undefined) : articles[index].image,
      trending: trending !== undefined ? !!trending : articles[index].trending,
      aiInsights: aiInsights !== undefined ? !!aiInsights : articles[index].aiInsights,
    };

    const success = writeArticles(articles);
    if (!success) {
      return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
    }

    return NextResponse.json(articles[index]);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const adminSession = cookieStore.get("admin_session")?.value;
  if (adminSession !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const articles = readArticles();
  const index = articles.findIndex((a) => a.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  articles.splice(index, 1);

  const success = writeArticles(articles);
  if (!success) {
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
