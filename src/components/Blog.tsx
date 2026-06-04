// src/pages/Blog.tsx
import { useState } from 'react';
import {
  Calendar,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { blogPosts, blogCategories } from '../data/blog';

export function Blog() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = selectedCategory
    ? blogPosts.filter((post) => post.category === selectedCategory)
    : blogPosts;

  const featuredPost = blogPosts[0];
  const topSmallPosts = blogPosts.slice(1, 4);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return (
    <div className="animate-fade-in min-h-screen bg-surface">

      {/* ── SECTION 1: LATEST NEWS ────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-surface-container-lowest via-surface to-surface-container-lowest px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-16">

        {/* Decorative squares (top right) */}
        <div className="absolute top-8 right-8 hidden md:flex gap-2 opacity-20">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-12 h-12 bg-on-surface/10 rounded" />
          ))}
        </div>
        <div className="absolute top-24 right-20 hidden md:block">
          <div className="w-8 h-8 bg-on-surface/10 rounded" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Header */}
          <h1 className="font-display text-4xl md:text-5xl font-bold text-on-surface mb-10">
            Latest News
          </h1>

          {/* Featured Article (Large) */}
          <button
            onClick={() => navigate(`/blog/${featuredPost.slug}`)}
            className="w-full group text-left mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden border border-outline-variant/20 hover:shadow-lg transition-all">

              {/* Image */}
              <div className="relative h-64 md:h-80 overflow-hidden bg-gradient-to-br from-sky-200 to-blue-300">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center space-y-4">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                  {featuredPost.category}
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-on-surface leading-tight group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-on-surface-variant pt-2">
                  <span className="font-bold">{featuredPost.author}</span>
                  <span className="text-on-surface-variant/40">•</span>
                  <span>{formatDate(featuredPost.publishedAt)}</span>
                </div>
              </div>
            </div>
          </button>

          {/* 3 Small Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topSmallPosts.map((post) => (
              <button
                key={post.id}
                onClick={() => navigate(`/blog/${post.slug}`)}
                className="group text-left"
              >
                <div className="bg-white rounded-2xl overflow-hidden border border-outline-variant/20 hover:shadow-md transition-all flex gap-3 p-3 h-full">

                  {/* Thumbnail */}
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-slate-700 to-slate-900">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                      {post.category}
                    </span>
                    <h3 className="font-display text-sm font-bold text-on-surface line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-on-surface-variant pt-1">
                      <span className="font-medium">{post.author}</span>
                      <span className="text-on-surface-variant/40">•</span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: CATEGORIZED ARTICLES ───────────────────────────────── */}
      <section className="relative bg-white px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20">

        {/* Decorative squares (left side) */}
        <div className="absolute top-8 left-8 hidden md:flex gap-2 opacity-20">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-12 h-12 bg-on-surface/10 rounded" />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface max-w-2xl mx-auto leading-tight">
              Smart Home Automation, Security, and Energy Solutions
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === null
                  ? 'bg-zinc-900 text-white'
                  : 'bg-white text-on-surface border border-outline-variant/30 hover:border-on-surface'
              }`}
            >
              All Categories
            </button>
            {blogCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-zinc-900 text-white'
                    : 'bg-white text-on-surface border border-outline-variant/30 hover:border-on-surface'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          {filteredPosts.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-on-surface-variant">No articles in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <button
                  key={post.id}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className="group text-left"
                >
                  <div className="bg-white rounded-2xl overflow-hidden border border-outline-variant/20 hover:shadow-lg transition-all h-full flex flex-col">

                    {/* Image */}
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3 flex-1 flex flex-col">
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                        {post.category}
                      </span>

                      <h3 className="font-display text-base font-bold text-on-surface leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-xs text-on-surface-variant line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20">
                        <div className="flex items-center gap-1.5 text-[10px] text-on-surface-variant">
                          <span className="font-bold">{post.author}</span>
                          <span className="text-on-surface-variant/40">•</span>
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {filteredPosts.length > 0 && (
            <div className="text-center mt-12">
              <button className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-3 rounded-full font-bold text-sm transition-all">
                Load More Articles
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA SECTION ────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-surface-container-lowest to-surface px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface">
            Stay Updated with Smart Home Trends
          </h2>
          <p className="text-on-surface-variant">
            Get the latest insights and tips delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border border-outline-variant/30 bg-white focus:outline-none focus:border-primary text-sm"
            />
            <button className="px-6 py-3 bg-primary hover:bg-primary-container text-white rounded-full font-bold text-sm transition-all whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}