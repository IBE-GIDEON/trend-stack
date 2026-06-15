"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Article, CategorySlug } from "@/data/types";

// Categories metadata for select dropdown
const CATEGORIES: { slug: CategorySlug; label: string }[] = [
  { slug: "ai", label: "Artificial Intelligence" },
  { slug: "startups", label: "Startups & Venture" },
  { slug: "big-tech", label: "Big Tech" },
  { slug: "markets", label: "Markets & Finance" },
  { slug: "cybersecurity", label: "Cybersecurity" },
  { slug: "science", label: "Science & Biotech" },
  { slug: "programming", label: "Programming" },
  { slug: "data", label: "Data Engineering" },
  { slug: "cloud", label: "Cloud & Infrastructure" },
  { slug: "open-source", label: "Open Source" },
  { slug: "robotics", label: "Robotics & Automation" },
  { slug: "opinion", label: "Opinion" },
  { slug: "research", label: "Deep Research" },
  { slug: "products", label: "Product Releases" },
];

export default function AdminDashboardPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [formOpen, setFormOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState<CategorySlug>("ai");
  const [authorName, setAuthorName] = useState("");
  const [authorRole, setAuthorRole] = useState("");
  const [readingMinutes, setReadingMinutes] = useState(5);
  const [coverSeed, setCoverSeed] = useState("");
  const [image, setImage] = useState("");
  const [trending, setTrending] = useState(false);
  const [aiInsights, setAiInsights] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  // Fetch articles on mount
  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/articles");
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      } else {
        setError("Failed to fetch articles database.");
      }
    } catch (err) {
      setError("Network error fetching articles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Sync edit state into form fields
  useEffect(() => {
    if (editingArticle) {
      setTitle(editingArticle.title);
      setSlug(editingArticle.slug);
      setExcerpt(editingArticle.excerpt);
      setCategory(editingArticle.category);
      setAuthorName(editingArticle.author.name);
      setAuthorRole(editingArticle.author.role);
      setReadingMinutes(editingArticle.readingMinutes);
      setCoverSeed(editingArticle.coverSeed);
      setImage(editingArticle.image || "");
      setTrending(!!editingArticle.trending);
      setAiInsights(!!editingArticle.aiInsights);
    } else {
      // Clear form for creation
      setTitle("");
      setSlug("");
      setExcerpt("");
      setCategory("ai");
      setAuthorName("");
      setAuthorRole("");
      setReadingMinutes(5);
      setCoverSeed(Math.random().toString(36).substring(7));
      setImage("");
      setTrending(false);
      setAiInsights(false);
    }
  }, [editingArticle, formOpen]);

  // Autogenerate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingArticle) {
      const computedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(computedSlug);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      title,
      slug,
      excerpt,
      category,
      author: {
        name: authorName,
        role: authorRole,
      },
      readingMinutes: Number(readingMinutes),
      coverSeed,
      image,
      trending,
      aiInsights,
    };

    try {
      let res;
      if (editingArticle) {
        // Edit mode (PUT)
        res = await fetch(`/api/articles/${editingArticle.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Create mode (POST)
        res = await fetch("/api/articles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        setFormOpen(false);
        setEditingArticle(null);
        fetchArticles();
      } else {
        const data = await res.json();
        alert(data.error || "Save operation failed.");
      }
    } catch (err) {
      alert("Network error saving article.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action is permanent.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchArticles();
      } else {
        alert("Failed to delete article.");
      }
    } catch (err) {
      alert("Network error deleting article.");
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
        <div className="flex items-center justify-between border-b border-fog/60 pb-4">
          <div>
            <h1 className="text-xl font-sans font-bold text-soft leading-none">
              Articles Directory
            </h1>
            <p className="text-[12px] text-muted mt-2">
              Add, update, or remove database entries published across the front desk beats.
            </p>
          </div>
          <button
            onClick={() => {
              setEditingArticle(null);
              setFormOpen(true);
            }}
            className="bg-accent hover:bg-accent/80 text-accent-ink text-xs font-sans font-bold py-2 px-4 rounded shadow-md transition-all active:scale-[0.98] flex items-center gap-1.5"
          >
            <span>➕</span> ADD ARTICLE
          </button>
        </div>

        {/* Database List */}
        {loading ? (
          <div className="py-20 text-center text-muted font-sans text-[13px]">
            Loading articles database...
          </div>
        ) : error ? (
          <div className="py-20 text-center text-breaking font-sans text-[13px]">
            ⚠️ {error}
          </div>
        ) : articles.length === 0 ? (
          <div className="border border-dashed border-fog rounded p-20 text-center text-muted font-sans text-[13px]">
            No articles exist in the newsroom database. Click &ldquo;ADD ARTICLE&rdquo; to post one.
          </div>
        ) : (
          <div className="overflow-x-auto rounded border border-fog bg-charcoal/20">
            <table className="notion-table w-full text-left font-sans text-[13px]">
              <thead>
                <tr className="border-b border-fog/60 bg-charcoal/40 text-muted font-mono select-none">
                  <th className="p-3 w-[45%]">📄 Title</th>
                  <th className="p-3">📂 Category</th>
                  <th className="p-3">✍️ Author</th>
                  <th className="p-3">⏱️ Read Time</th>
                  <th className="p-3 text-right">⚙️ Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-fog/40">
                {articles.map((a) => (
                  <tr key={a.id} className="hover:bg-steel/30 transition-colors">
                    <td className="p-3 font-semibold text-soft max-w-[320px] truncate">
                      {a.image && <span className="mr-1.5 text-xs text-emerald-400" title="Has Image">🖼️</span>}
                      {a.title}
                    </td>
                    <td className="p-3 text-muted">
                      <span className="notion-tag text-[10px] font-bold uppercase select-none">
                        {a.category}
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
                          setFormOpen(true);
                        }}
                        className="text-xs text-accent hover:underline font-semibold bg-accent/5 hover:bg-accent/10 border border-accent/20 px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(a.id, a.title)}
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
      </main>

      {/* Slide-over Form Overlay */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          {/* Backdrop dismiss */}
          <div className="absolute inset-0 -z-10" onClick={() => setFormOpen(false)} />

          {/* Form Panel */}
          <div className="w-full sm:w-[500px] h-full bg-charcoal border-l border-fog shadow-2xl flex flex-col overflow-hidden">
            {/* Form Header */}
            <div className="h-14 border-b border-fog/60 px-6 flex items-center justify-between bg-charcoal/90 shrink-0">
              <h3 className="font-sans font-bold text-soft text-sm uppercase">
                {editingArticle ? "Edit Article Details" : "Create New Article"}
              </h3>
              <button
                onClick={() => setFormOpen(false)}
                className="text-muted hover:text-soft text-base font-bold h-7 w-7 rounded hover:bg-steel flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 font-sans text-[13px]">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-ash block">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
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
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="ai-scaling-race"
                  required
                  className="w-full h-9 px-3 bg-graphite/40 border border-fog rounded text-soft focus:outline-none focus:border-accent/50"
                />
              </div>

              {/* Excerpt */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-ash block">Excerpt / Summary</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
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
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CategorySlug)}
                  className="w-full h-9 px-2 bg-graphite/60 border border-fog rounded text-soft focus:outline-none focus:border-accent/50 select-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.slug} value={cat.slug} className="bg-charcoal text-soft">
                      {cat.label}
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
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Mara Whitfield"
                    required
                    className="w-full h-9 px-3 bg-graphite/40 border border-fog rounded text-soft focus:outline-none focus:border-accent/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-ash block">Author Role</label>
                  <input
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
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
                    value={readingMinutes}
                    onChange={(e) => setReadingMinutes(Number(e.target.value))}
                    min={1}
                    required
                    className="w-full h-9 px-3 bg-graphite/40 border border-fog rounded text-soft focus:outline-none focus:border-accent/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-ash block">Cover seed</label>
                  <input
                    type="text"
                    value={coverSeed}
                    onChange={(e) => setCoverSeed(e.target.value)}
                    placeholder="custom-seed-id"
                    required
                    className="w-full h-9 px-3 bg-graphite/40 border border-fog rounded text-soft focus:outline-none focus:border-accent/50"
                  />
                </div>
              </div>

              {/* Optional Picture Image URL */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-ash block">
                  Optional Picture URL <span className="text-ash/60">(for detailed view page)</span>
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-…"
                  className="w-full h-9 px-3 bg-graphite/40 border border-fog rounded text-soft focus:outline-none focus:border-accent/50"
                />
              </div>

              {/* Badges Checklist */}
              <div className="flex gap-6 py-2">
                <label className="flex items-center gap-2 text-muted hover:text-soft cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={trending}
                    onChange={(e) => setTrending(e.target.checked)}
                    className="h-4 w-4 bg-graphite border border-fog rounded text-accent focus:ring-0 cursor-pointer"
                  />
                  <span>Mark as Trending</span>
                </label>
                <label className="flex items-center gap-2 text-muted hover:text-soft cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={aiInsights}
                    onChange={(e) => setAiInsights(e.target.checked)}
                    className="h-4 w-4 bg-graphite border border-fog rounded text-accent focus:ring-0 cursor-pointer"
                  />
                  <span>Show AI Insights badge</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-fog/60 flex items-center justify-end gap-3 select-none shrink-0">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="py-2 px-4 rounded border border-fog/60 bg-transparent text-muted hover:text-soft transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="py-2 px-5 rounded bg-accent hover:bg-accent/80 text-accent-ink font-semibold transition-all active:scale-[0.98] disabled:opacity-60"
                >
                  {submitting ? "Saving changes…" : "Save Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
