"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Article, Category } from "@/data/types";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"articles" | "beats">("articles");
  
  // Database states
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  
  const [errorArticles, setErrorArticles] = useState<string | null>(null);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);

  // Forms states
  const [articleFormOpen, setArticleFormOpen] = useState(false);
  const [beatFormOpen, setBeatFormOpen] = useState(false);
  
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editingBeat, setEditingBeat] = useState<Category | null>(null);

  // Article Form Fields
  const [artTitle, setArtTitle] = useState("");
  const [artSlug, setArtSlug] = useState("");
  const [artExcerpt, setArtExcerpt] = useState("");
  const [artCategory, setArtCategory] = useState("ai");
  const [artAuthorName, setArtAuthorName] = useState("");
  const [artAuthorRole, setArtAuthorRole] = useState("");
  const [artReadingMinutes, setArtReadingMinutes] = useState(5);
  const [artCoverSeed, setArtCoverSeed] = useState("");
  const [artImage, setArtImage] = useState("");
  const [artTrending, setArtTrending] = useState(false);
  const [artAiInsights, setArtAiInsights] = useState(false);
  const [artSubmitting, setArtSubmitting] = useState(false);
  const [artUploading, setArtUploading] = useState(false);

  // Beat Form Fields
  const [beatSlug, setBeatSlug] = useState("");
  const [beatLabel, setBeatLabel] = useState("");
  const [beatCode, setBeatCode] = useState("");
  const [beatIcon, setBeatIcon] = useState("📄");
  const [beatSection, setBeatSection] = useState("Beats & Documents");
  const [beatDescription, setBeatDescription] = useState("");
  const [beatTagsText, setBeatTagsText] = useState("");
  const [beatCoverImage, setBeatCoverImage] = useState("");
  const [beatSubmitting, setBeatSubmitting] = useState(false);
  const [beatUploading, setBeatUploading] = useState(false);

  const router = useRouter();

  // Fetch articles
  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/articles");
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      } else {
        setErrorArticles("Failed to fetch articles.");
      }
    } catch (err) {
      setErrorArticles("Network error fetching articles.");
    } finally {
      setLoadingArticles(false);
    }
  };

  // Fetch beats categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
        // Set default category slug in article form if categories are present
        if (data.length > 0 && !artCategory) {
          setArtCategory(data[0].slug);
        }
      } else {
        setErrorCategories("Failed to fetch beats.");
      }
    } catch (err) {
      setErrorCategories("Network error fetching beats.");
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  // Sync edit states
  useEffect(() => {
    if (editingArticle) {
      setArtTitle(editingArticle.title);
      setArtSlug(editingArticle.slug);
      setArtExcerpt(editingArticle.excerpt);
      setArtCategory(editingArticle.category);
      setArtAuthorName(editingArticle.author.name);
      setArtAuthorRole(editingArticle.author.role);
      setArtReadingMinutes(editingArticle.readingMinutes);
      setArtCoverSeed(editingArticle.coverSeed);
      setArtImage(editingArticle.image || "");
      setArtTrending(!!editingArticle.trending);
      setArtAiInsights(!!editingArticle.aiInsights);
    } else {
      setArtTitle("");
      setArtSlug("");
      setArtExcerpt("");
      setArtCategory(categories[0]?.slug || "ai");
      setArtAuthorName("");
      setArtAuthorRole("");
      setArtReadingMinutes(5);
      setArtCoverSeed(Math.random().toString(36).substring(7));
      setArtImage("");
      setArtTrending(false);
      setArtAiInsights(false);
    }
  }, [editingArticle, articleFormOpen, categories]);

  useEffect(() => {
    if (editingBeat) {
      setBeatSlug(editingBeat.slug);
      setBeatLabel(editingBeat.label);
      setBeatCode(editingBeat.code);
      setBeatIcon(editingBeat.icon || "📄");
      setBeatSection(editingBeat.section || "Beats & Documents");
      setBeatDescription(editingBeat.description || "");
      setBeatTagsText(editingBeat.tags ? editingBeat.tags.join(", ") : "");
      setBeatCoverImage(editingBeat.coverImage || "");
    } else {
      setBeatSlug("");
      setBeatLabel("");
      setBeatCode("");
      setBeatIcon("📄");
      setBeatSection("Beats & Documents");
      setBeatDescription("");
      setBeatTagsText("");
      setBeatCoverImage("");
    }
  }, [editingBeat, beatFormOpen]);

  // Autogenerate slugs
  const handleArtTitleChange = (val: string) => {
    setArtTitle(val);
    if (!editingArticle) {
      const computed = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setArtSlug(computed);
    }
  };

  const handleBeatLabelChange = (val: string) => {
    setBeatLabel(val);
    if (!editingBeat) {
      const computed = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setBeatSlug(computed);
      
      // Auto-code
      const words = val.toUpperCase().split(/\s+/);
      let computedCode = "";
      if (words.length >= 2) {
        computedCode = words.map(w => w.charAt(0)).join("").substring(0, 3);
      } else {
        computedCode = val.substring(0, 3).toUpperCase();
      }
      setBeatCode(computedCode);
    }
  };

  // Local uploads
  const handleArticleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setArtUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        setArtImage(data.url);
      } else {
        const data = await res.json();
        alert(data.error || "Upload failed.");
      }
    } catch (err) {
      alert("Network upload error.");
    } finally {
      setArtUploading(false);
    }
  };

  const handleBeatCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBeatUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        setBeatCoverImage(data.url);
      } else {
        const data = await res.json();
        alert(data.error || "Upload failed.");
      }
    } catch (err) {
      alert("Network upload error.");
    } finally {
      setBeatUploading(false);
    }
  };

  // CRUD Submissions
  const handleArticleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setArtSubmitting(true);

    const payload = {
      title: artTitle,
      slug: artSlug,
      excerpt: artExcerpt,
      category: artCategory,
      author: { name: artAuthorName, role: artAuthorRole },
      readingMinutes: Number(artReadingMinutes),
      coverSeed: artCoverSeed,
      image: artImage,
      trending: artTrending,
      aiInsights: artAiInsights,
    };

    try {
      let res;
      if (editingArticle) {
        res = await fetch(`/api/articles/${editingArticle.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/articles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        setArticleFormOpen(false);
        setEditingArticle(null);
        fetchArticles();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save article.");
      }
    } catch (err) {
      alert("Network error saving article.");
    } finally {
      setArtSubmitting(false);
    }
  };

  const handleBeatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBeatSubmitting(true);

    const tagsArray = beatTagsText
      ? beatTagsText.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const payload = {
      slug: beatSlug,
      label: beatLabel,
      code: beatCode,
      icon: beatIcon,
      section: beatSection,
      description: beatDescription,
      tags: tagsArray,
      coverImage: beatCoverImage,
    };

    try {
      let res;
      if (editingBeat) {
        res = await fetch(`/api/categories/${editingBeat.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        setBeatFormOpen(false);
        setEditingBeat(null);
        fetchCategories();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save category beat.");
      }
    } catch (err) {
      alert("Network error saving category beat.");
    } finally {
      setBeatSubmitting(false);
    }
  };

  const handleArticleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchArticles();
      } else {
        alert("Failed to delete article.");
      }
    } catch (err) {
      alert("Network error deleting article.");
    }
  };

  const handleBeatDelete = async (slug: string, label: string) => {
    if (!confirm(`Are you sure you want to delete Category Beat "${label}"? This could leave existing articles uncategorized.`)) return;

    try {
      const res = await fetch(`/api/categories/${slug}`, { method: "DELETE" });
      if (res.ok) {
        fetchCategories();
      } else {
        alert("Failed to delete category beat.");
      }
    } catch (err) {
      alert("Network error deleting beat.");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (err) {
      alert("Logout failed.");
    }
  };

  return (
    <div className="min-h-screen bg-ink text-soft select-text">
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-fog bg-charcoal px-6 select-none">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-neutral-900 border border-fog/40 p-1">
            <Image
              src="/logo.png"
              width={24}
              height={24}
              alt="Logo"
              className="object-contain"
            />
          </div>
          <span className="font-sans font-bold text-soft text-sm">
            Trend Stack Newsroom Administration
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/dashboard"
            className="text-xs text-muted hover:text-soft bg-steel/30 px-3 py-1.5 rounded border border-fog/30 transition-all font-sans"
          >
            Open Reader Workspace
          </a>
          <button
            onClick={handleLogout}
            className="text-xs text-soft bg-breaking/10 border border-breaking/20 px-3 py-1.5 rounded hover:bg-breaking/20 transition-all font-sans font-semibold"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-fog/40 pb-px gap-1 select-none">
          <button
            onClick={() => setActiveTab("articles")}
            className={`px-4 py-2 text-xs font-sans font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === "articles"
                ? "border-accent text-soft bg-charcoal/20"
                : "border-transparent text-muted hover:text-soft hover:bg-steel/10"
            }`}
          >
            📄 Articles Directory
          </button>
          <button
            onClick={() => setActiveTab("beats")}
            className={`px-4 py-2 text-xs font-sans font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === "beats"
                ? "border-accent text-soft bg-charcoal/20"
                : "border-transparent text-muted hover:text-soft hover:bg-steel/10"
            }`}
          >
            📂 Category Beats Directory
          </button>
        </div>

        {/* ── ARTICLES DIRECTORY VIEW ── */}
        {activeTab === "articles" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-sans font-bold text-soft leading-none">
                  Articles Archive
                </h1>
                <p className="text-[12px] text-muted mt-1.5">
                  Publish, update, or remove database stories on the reader beating desk.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingArticle(null);
                  setArticleFormOpen(true);
                }}
                className="bg-accent hover:bg-accent/80 text-accent-ink text-xs font-sans font-bold py-2 px-4 rounded shadow-md transition-all active:scale-[0.98] flex items-center gap-1.5"
              >
                <span>➕</span> ADD ARTICLE
              </button>
            </div>

            {loadingArticles ? (
              <div className="py-20 text-center text-muted font-sans text-[13px]">
                Loading articles database...
              </div>
            ) : errorArticles ? (
              <div className="py-20 text-center text-breaking font-sans text-[13px]">
                ⚠️ {errorArticles}
              </div>
            ) : articles.length === 0 ? (
              <div className="border border-dashed border-fog rounded p-20 text-center text-muted font-sans text-[13px]">
                No articles exist in the database. Click &ldquo;ADD ARTICLE&rdquo; to publish one.
              </div>
            ) : (
              <div className="overflow-x-auto rounded border border-fog bg-charcoal/20">
                <table className="notion-table w-full text-left font-sans text-[13px]">
                  <thead>
                    <tr className="border-b border-fog/60 bg-charcoal/40 text-muted font-mono select-none">
                      <th className="p-3 w-[45%]">📄 Title</th>
                      <th className="p-3">📂 Category Beat</th>
                      <th className="p-3">✍️ Author</th>
                      <th className="p-3">⏱️ Read Time</th>
                      <th className="p-3 text-right">⚙️ Controls</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-fog/40">
                    {articles.map((a) => (
                      <tr key={a.id} className="hover:bg-steel/30 transition-colors">
                        <td className="p-3 font-semibold text-soft max-w-[320px] truncate">
                          {a.image && <span className="mr-1.5 text-xs text-emerald-400" title="Has Cover Image">🖼️</span>}
                          {a.title}
                        </td>
                        <td className="p-3 text-muted">
                          <span className="notion-tag text-[10px] font-bold uppercase select-none">
                            {categories.find(c => c.slug === a.category)?.label || a.category}
                          </span>
                        </td>
                        <td className="p-3 text-muted truncate max-w-[150px]">
                          {a.author.name}
                        </td>
                        <td className="p-3 text-muted font-mono">{a.readingMinutes} min</td>
                        <td className="p-3 text-right space-x-1.5 select-none shrink-0">
                          <button
                            onClick={() => {
                              setEditingArticle(a);
                              setArticleFormOpen(true);
                            }}
                            className="text-xs text-accent hover:underline font-semibold bg-accent/5 hover:bg-accent/10 border border-accent/20 px-2 py-1 rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleArticleDelete(a.id, a.title)}
                            className="text-xs text-breaking hover:underline font-semibold bg-breaking/5 hover:bg-breaking/10 border border-breaking/20 px-2 py-1 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── CATEGORY BEATS DIRECTORY VIEW ── */}
        {activeTab === "beats" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-sans font-bold text-soft leading-none">
                  Editorial Beats & Workspace Sections
                </h1>
                <p className="text-[12px] text-muted mt-1.5">
                  Manage database categories, customize cover banners, define sidebar groups, and set beat emojis.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingBeat(null);
                  setBeatFormOpen(true);
                }}
                className="bg-accent hover:bg-accent/80 text-accent-ink text-xs font-sans font-bold py-2 px-4 rounded shadow-md transition-all active:scale-[0.98] flex items-center gap-1.5"
              >
                <span>➕</span> ADD BEAT
              </button>
            </div>

            {loadingCategories ? (
              <div className="py-20 text-center text-muted font-sans text-[13px]">
                Loading beats database...
              </div>
            ) : errorCategories ? (
              <div className="py-20 text-center text-breaking font-sans text-[13px]">
                ⚠️ {errorCategories}
              </div>
            ) : categories.length === 0 ? (
              <div className="border border-dashed border-fog rounded p-20 text-center text-muted font-sans text-[13px]">
                No category beats configured. Click &ldquo;ADD BEAT&rdquo; to build one.
              </div>
            ) : (
              <div className="overflow-x-auto rounded border border-fog bg-charcoal/20">
                <table className="notion-table w-full text-left font-sans text-[13px]">
                  <thead>
                    <tr className="border-b border-fog/60 bg-charcoal/40 text-muted font-mono select-none">
                      <th className="p-3 w-[30%]">📁 Beat Name</th>
                      <th className="p-3">🔑 Slug</th>
                      <th className="p-3">🔠 Code</th>
                      <th className="p-3">📂 Sidebar Section</th>
                      <th className="p-3">🖼️ Cover Art</th>
                      <th className="p-3 text-right">⚙️ Controls</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-fog/40">
                    {categories.map((c) => (
                      <tr key={c.slug} className="hover:bg-steel/30 transition-colors">
                        <td className="p-3 font-semibold text-soft flex items-center gap-2">
                          <span className="text-base">{c.icon || "📄"}</span>
                          <span>{c.label}</span>
                        </td>
                        <td className="p-3 text-ash font-mono">{c.slug}</td>
                        <td className="p-3 text-ash font-mono">{c.code}</td>
                        <td className="p-3 text-muted">{c.section || "Beats & Documents"}</td>
                        <td className="p-3 text-muted truncate max-w-[150px]">
                          {c.coverImage ? (
                            <span className="text-emerald-400 font-semibold text-xs flex items-center gap-1">
                              <span>🖼️</span> Custom Cover
                            </span>
                          ) : (
                            <span className="text-ash/60 text-xs">Default Gradient</span>
                          )}
                        </td>
                        <td className="p-3 text-right space-x-1.5 select-none shrink-0">
                          <button
                            onClick={() => {
                              setEditingBeat(c);
                              setBeatFormOpen(true);
                            }}
                            className="text-xs text-accent hover:underline font-semibold bg-accent/5 hover:bg-accent/10 border border-accent/20 px-2 py-1 rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleBeatDelete(c.slug, c.label)}
                            className="text-xs text-breaking hover:underline font-semibold bg-breaking/5 hover:bg-breaking/10 border border-breaking/20 px-2 py-1 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── SLIDE-OVER ARTICLE FORM OVERLAY ── */}
      {articleFormOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs select-none">
          <div className="absolute inset-0 -z-10" onClick={() => setArticleFormOpen(false)} />
          <div className="w-full sm:w-[500px] h-full bg-charcoal border-l border-fog shadow-2xl flex flex-col overflow-hidden">
            <div className="h-14 border-b border-fog/60 px-6 flex items-center justify-between bg-charcoal/90 shrink-0">
              <h3 className="font-sans font-bold text-soft text-sm uppercase">
                {editingArticle ? "Edit Article Details" : "Create New Article"}
              </h3>
              <button
                onClick={() => setArticleFormOpen(false)}
                className="text-muted hover:text-soft text-base font-bold h-7 w-7 rounded hover:bg-steel flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleArticleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 font-sans text-[13px] select-text">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-ash block">Title</label>
                <input
                  type="text"
                  value={artTitle}
                  onChange={(e) => handleArtTitleChange(e.target.value)}
                  placeholder="Inside the scaling race…"
                  required
                  className="w-full h-9 px-3 bg-graphite/40 border border-fog rounded text-soft focus:outline-none focus:border-accent/50"
                />
              </div>

              {/* Slug */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-ash block">URL Slug</label>
                <input
                  type="text"
                  value={artSlug}
                  onChange={(e) => setArtSlug(e.target.value)}
                  placeholder="ai-scaling-race"
                  required
                  className="w-full h-9 px-3 bg-graphite/40 border border-fog rounded text-soft focus:outline-none focus:border-accent/50"
                />
              </div>

              {/* Excerpt */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-ash block">Excerpt / Summary</label>
                <textarea
                  value={artExcerpt}
                  onChange={(e) => setArtExcerpt(e.target.value)}
                  placeholder="Detailed editorial report describing the hardware shift…"
                  required
                  rows={3}
                  className="w-full p-3 bg-graphite/40 border border-fog rounded text-soft focus:outline-none focus:border-accent/50 resize-none leading-relaxed"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-ash block">Category Beat</label>
                <select
                  value={artCategory}
                  onChange={(e) => setArtCategory(e.target.value)}
                  className="w-full h-9 px-2 bg-graphite/60 border border-fog rounded text-soft focus:outline-none focus:border-accent/50 select-none"
                >
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug} className="bg-charcoal text-soft">
                      {cat.icon || "📄"} {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Author Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-ash block">Author Name</label>
                  <input
                    type="text"
                    value={artAuthorName}
                    onChange={(e) => setArtAuthorName(e.target.value)}
                    placeholder="Mara Whitfield"
                    required
                    className="w-full h-9 px-3 bg-graphite/40 border border-fog rounded text-soft focus:outline-none focus:border-accent/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-ash block">Author Role</label>
                  <input
                    type="text"
                    value={artAuthorRole}
                    onChange={(e) => setArtAuthorRole(e.target.value)}
                    placeholder="AI Correspondent"
                    required
                    className="w-full h-9 px-3 bg-graphite/40 border border-fog rounded text-soft focus:outline-none focus:border-accent/50"
                  />
                </div>
              </div>

              {/* Reading Minutes & Cover Seed */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-ash block">Reading Time (min)</label>
                  <input
                    type="number"
                    value={artReadingMinutes}
                    onChange={(e) => setArtReadingMinutes(Number(e.target.value))}
                    min={1}
                    required
                    className="w-full h-9 px-3 bg-graphite/40 border border-fog rounded text-soft focus:outline-none focus:border-accent/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-ash block">Cover seed</label>
                  <input
                    type="text"
                    value={artCoverSeed}
                    onChange={(e) => setArtCoverSeed(e.target.value)}
                    placeholder="custom-seed-id"
                    required
                    className="w-full h-9 px-3 bg-graphite/40 border border-fog rounded text-soft focus:outline-none focus:border-accent/50"
                  />
                </div>
              </div>

              {/* Optional Picture Image URL */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-ash block">
                  Article Picture <span className="text-ash/60">(local file upload or image URL)</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={artImage}
                    onChange={(e) => setArtImage(e.target.value)}
                    placeholder="Paste URL or select local file..."
                    className="flex-1 h-9 px-3 bg-graphite/40 border border-fog rounded text-soft focus:outline-none focus:border-accent/50"
                  />
                  <label className="h-9 px-3 bg-steel hover:bg-steel/80 border border-fog/60 rounded text-soft font-semibold text-xs cursor-pointer flex items-center justify-center transition-colors shrink-0">
                    <span>📤 Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleArticleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {artUploading && (
                  <p className="text-[11px] text-accent animate-pulse font-medium mt-1">Uploading image locally...</p>
                )}
                {artImage && (
                  <div className="relative mt-2 w-32 aspect-[16/9] rounded overflow-hidden border border-fog/60 group bg-graphite">
                    <img src={artImage} alt="Preview" className="object-cover w-full h-full" />
                    <button
                      type="button"
                      onClick={() => setArtImage("")}
                      className="absolute top-1 right-1 h-5 w-5 bg-black/60 rounded-full text-[10px] text-white flex items-center justify-center hover:bg-black/90 transition-colors"
                      title="Remove Image"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* Badges Checklist */}
              <div className="flex gap-6 py-2">
                <label className="flex items-center gap-2 text-muted hover:text-soft cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={artTrending}
                    onChange={(e) => setArtTrending(e.target.checked)}
                    className="h-4 w-4 bg-graphite border border-fog rounded text-accent focus:ring-0 cursor-pointer"
                  />
                  <span>Mark as Trending</span>
                </label>
                <label className="flex items-center gap-2 text-muted hover:text-soft cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={artAiInsights}
                    onChange={(e) => setArtAiInsights(e.target.checked)}
                    className="h-4 w-4 bg-graphite border border-fog rounded text-accent focus:ring-0 cursor-pointer"
                  />
                  <span>Show AI Insights badge</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-fog/60 flex items-center justify-end gap-3 select-none shrink-0">
                <button
                  type="button"
                  onClick={() => setArticleFormOpen(false)}
                  className="py-2 px-4 rounded border border-fog/60 bg-transparent text-muted hover:text-soft transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={artSubmitting || artUploading}
                  className="py-2 px-5 rounded bg-accent hover:bg-accent/80 text-accent-ink font-semibold transition-all active:scale-[0.98] disabled:opacity-60"
                >
                  {artSubmitting ? "Saving changes…" : "Save Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── SLIDE-OVER BEAT FORM OVERLAY ── */}
      {beatFormOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs select-none">
          <div className="absolute inset-0 -z-10" onClick={() => setBeatFormOpen(false)} />
          <div className="w-full sm:w-[500px] h-full bg-charcoal border-l border-fog shadow-2xl flex flex-col overflow-hidden">
            <div className="h-14 border-b border-fog/60 px-6 flex items-center justify-between bg-charcoal/90 shrink-0">
              <h3 className="font-sans font-bold text-soft text-sm uppercase">
                {editingBeat ? "Edit Category Beat Details" : "Create New Category Beat"}
              </h3>
              <button
                onClick={() => setBeatFormOpen(false)}
                className="text-muted hover:text-soft text-base font-bold h-7 w-7 rounded hover:bg-steel flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBeatSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 font-sans text-[13px] select-text">
              
              {/* Label */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-ash block">Beat Name</label>
                <input
                  type="text"
                  value={beatLabel}
                  onChange={(e) => handleBeatLabelChange(e.target.value)}
                  placeholder="Artificial Intelligence"
                  required
                  className="w-full h-9 px-3 bg-graphite/40 border border-fog rounded text-soft focus:outline-none focus:border-accent/50"
                />
              </div>

              {/* Slug */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-ash block">Key Slug</label>
                <input
                  type="text"
                  value={beatSlug}
                  onChange={(e) => setBeatSlug(e.target.value.toLowerCase())}
                  placeholder="ai"
                  required
                  disabled={!!editingBeat}
                  className="w-full h-9 px-3 bg-graphite/40 border border-fog rounded text-soft focus:outline-none focus:border-accent/50 disabled:opacity-60 disabled:cursor-not-allowed font-mono"
                />
                {!editingBeat && <p className="text-[10px] text-ash/60">Slug acts as the ID key and cannot be edited later.</p>}
              </div>

              {/* Code */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-ash block">Code (Mono chip)</label>
                <input
                  type="text"
                  value={beatCode}
                  onChange={(e) => setBeatCode(e.target.value.toUpperCase().substring(0, 3))}
                  placeholder="AI"
                  required
                  className="w-full h-9 px-3 bg-graphite/40 border border-fog rounded text-soft focus:outline-none focus:border-accent/50 font-mono"
                />
                <p className="text-[10px] text-ash/60">2-3 letter uppercase code representation.</p>
              </div>

              {/* Icon Emoji */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-ash block">Beat Icon (Emoji)</label>
                <input
                  type="text"
                  value={beatIcon}
                  onChange={(e) => setBeatIcon(e.target.value)}
                  placeholder="🤖"
                  required
                  className="w-full h-9 px-3 bg-graphite/40 border border-fog rounded text-soft focus:outline-none focus:border-accent/50"
                />
              </div>

              {/* Section Header */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-ash block">Sidebar Group Section</label>
                <input
                  type="text"
                  value={beatSection}
                  onChange={(e) => setBeatSection(e.target.value)}
                  placeholder="Beats & Documents"
                  required
                  className="w-full h-9 px-3 bg-graphite/40 border border-fog rounded text-soft focus:outline-none focus:border-accent/50"
                />
                <p className="text-[10px] text-ash/60">Beats sharing this section name will group together in the reader sidebar.</p>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-ash block">Beat Description</label>
                <textarea
                  value={beatDescription}
                  onChange={(e) => setBeatDescription(e.target.value)}
                  placeholder="Frontier research, LLM benchmarks, and energy silicon scaling..."
                  rows={3}
                  className="w-full p-3 bg-graphite/40 border border-fog rounded text-soft focus:outline-none focus:border-accent/50 resize-none leading-relaxed"
                />
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-ash block">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={beatTagsText}
                  onChange={(e) => setBeatTagsText(e.target.value)}
                  placeholder="AI Beat, Machine Learning"
                  className="w-full h-9 px-3 bg-graphite/40 border border-fog rounded text-soft focus:outline-none focus:border-accent/50"
                />
              </div>

              {/* Beat Cover Image URL / Upload */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-ash block">
                  Beat Cover Banner <span className="text-ash/60">(local file upload or image URL)</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={beatCoverImage}
                    onChange={(e) => setBeatCoverImage(e.target.value)}
                    placeholder="Paste URL or select local file..."
                    className="flex-1 h-9 px-3 bg-graphite/40 border border-fog rounded text-soft focus:outline-none focus:border-accent/50"
                  />
                  <label className="h-9 px-3 bg-steel hover:bg-steel/80 border border-fog/60 rounded text-soft font-semibold text-xs cursor-pointer flex items-center justify-center transition-colors shrink-0">
                    <span>📤 Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBeatCoverUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {beatUploading && (
                  <p className="text-[11px] text-accent animate-pulse font-medium mt-1">Uploading image locally...</p>
                )}
                {beatCoverImage && (
                  <div className="relative mt-2 w-32 aspect-[16/9] rounded overflow-hidden border border-fog/60 group bg-graphite">
                    <img src={beatCoverImage} alt="Preview" className="object-cover w-full h-full" />
                    <button
                      type="button"
                      onClick={() => setBeatCoverImage("")}
                      className="absolute top-1 right-1 h-5 w-5 bg-black/60 rounded-full text-[10px] text-white flex items-center justify-center hover:bg-black/90 transition-colors"
                      title="Remove Image"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-fog/60 flex items-center justify-end gap-3 select-none shrink-0">
                <button
                  type="button"
                  onClick={() => setBeatFormOpen(false)}
                  className="py-2 px-4 rounded border border-fog/60 bg-transparent text-muted hover:text-soft transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={beatSubmitting || beatUploading}
                  className="py-2 px-5 rounded bg-accent hover:bg-accent/80 text-accent-ink font-semibold transition-all active:scale-[0.98] disabled:opacity-60"
                >
                  {beatSubmitting ? "Saving changes…" : "Save Beat"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
