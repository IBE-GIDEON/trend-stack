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
    console.error("Error reading articles JSON:", error);
    return [];
  }
};

const writeArticles = (articles: Article[]): boolean => {
  try {
    const filePath = getFilePath();
    fs.writeFileSync(filePath, JSON.stringify(articles, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing articles JSON:", error);
    return false;
  }
};

export async function GET() {
  const articles = readArticles();
  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  // Guard route using Next.js headers cookies check
  const cookieStore = cookies();
  const adminSession = cookieStore.get("admin_session")?.value;
  if (adminSession !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, slug, excerpt, category, author, readingMinutes, coverSeed, image, trending, aiInsights } = body;

    // Basic validation
    if (!title || !slug || !excerpt || !category || !author?.name || !author?.role || !readingMinutes || !coverSeed) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const articles = readArticles();

    // Generate unique ID
    const newId = `a${Date.now()}`;

    const newArticle: Article = {
      id: newId,
      title,
      slug,
      excerpt,
      category,
      author: {
        name: author.name,
        role: author.role,
      },
      publishedAt: new Date().toISOString(),
      readingMinutes: Number(readingMinutes),
      views: 0,
      coverSeed,
      image: image || undefined,
      trending: !!trending,
      aiInsights: !!aiInsights,
    };

    articles.unshift(newArticle); // Add new articles to the front

    const success = writeArticles(articles);
    if (!success) {
      return NextResponse.json({ error: "Failed to persist article" }, { status: 500 });
    }

    return NextResponse.json(newArticle);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
