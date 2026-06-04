// src/pages/BlogSlug.tsx
import { useParams, useNavigate } from 'react-router-dom';
import {
  Calendar,
  User,
  Clock,
  Eye,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Facebook,
  Twitter,
  Linkedin,
} from 'lucide-react';
import { useState } from 'react';
import { blogPosts } from '../data/blog';

export function BlogSlug() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const post = blogPosts.find((p) => p.slug === slug);
  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-14">
        <div className="text-center space-y-4">
          <h1 className="font-display text-3xl font-bold">Article not found</h1>
          <p className="text-on-surface-variant">The article you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-primary-container transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnSocial = (platform: 'facebook' | 'twitter' | 'linkedin') => {
    const url = window.location.href;
    const text = `Check out: ${post.title}`;
    const links = {
      facebook: `https://facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    window.open(links[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="animate-fade-in min-h-screen bg-gradient-to-b from-surface to-surface-container-lowest mt-14">

      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-4 max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-2 text-primary hover:text-primary-container font-medium text-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Articles
        </button>
      </div>

      {/* Hero Image */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-10 max-w-4xl mx-auto mb-12">
        <div className="rounded-3xl overflow-hidden h-96 md:h-[500px] bg-surface-container">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Article Content */}
      <article className="px-4 sm:px-6 md:px-8 lg:px-10 max-w-4xl mx-auto space-y-8 mb-16">

        {/* Header */}
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
              {post.category}
            </span>
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-on-surface leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-on-surface-variant">{post.excerpt}</p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-on-surface-variant border-t border-b border-outline-variant/20 py-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              {post.readTime} min read
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" />
              {post.views} views
            </div>
          </div>

          {/* Share & Like */}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                liked
                  ? 'bg-rose-500/20 text-rose-500'
                  : 'bg-surface-container text-on-surface-variant hover:bg-rose-500/10 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              {post.likes + (liked ? 1 : 0)}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-surface-container text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>

              {showShareMenu && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-outline-variant/20 overflow-hidden z-20">
                  <button
                    onClick={() => shareOnSocial('twitter')}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-primary/10 flex items-center gap-2 transition-colors"
                  >
                    <Twitter className="w-4 h-4" /> Twitter
                  </button>
                  <button
                    onClick={() => shareOnSocial('facebook')}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-primary/10 flex items-center gap-2 transition-colors border-t border-outline-variant/20"
                  >
                    <Facebook className="w-4 h-4" /> Facebook
                  </button>
                  <button
                    onClick={() => shareOnSocial('linkedin')}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-primary/10 flex items-center gap-2 transition-colors border-t border-outline-variant/20"
                  >
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </button>
                  <button
                    onClick={copyLink}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-primary/10 flex items-center gap-2 transition-colors border-t border-outline-variant/20"
                  >
                    <Copy className="w-4 h-4" /> {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="prose prose-sm md:prose-base max-w-none text-on-surface">
          {post.content.split('\n\n').map((paragraph, idx) => {
            // Handle headers
            if (paragraph.startsWith('##')) {
              return (
                <h2 key={idx} className="font-display text-2xl font-bold mt-8 mb-4 text-on-surface">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('###')) {
              return (
                <h3 key={idx} className="font-display text-xl font-bold mt-6 mb-3 text-on-surface">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            // Handle bullet points
            if (paragraph.startsWith('- ')) {
              return (
                <ul key={idx} className="list-disc list-inside space-y-2 text-on-surface-variant">
                  {paragraph.split('\n').map((item, itemIdx) => (
                    <li key={itemIdx}>{item.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={idx} className="text-on-surface-variant leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Author Card */}
        <div className="bg-gradient-to-r from-primary/10 to-[#8bf7cf]/10 rounded-2xl p-8 border border-primary/20 space-y-4">
          <h4 className="font-display text-lg font-bold text-on-surface">About the Author</h4>
          <p className="text-on-surface-variant">
            {post.authorBio || 'Expert in smart home automation and IoT solutions.'}
          </p>
        </div>
      </article>

      {/* Navigation */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-10 py-16 max-w-7xl mx-auto border-t border-outline-variant/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {prevPost ? (
            <button
              onClick={() => navigate(`/blog/${prevPost.slug}`)}
              className="group text-left p-6 rounded-2xl border border-outline-variant/20 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <div className="flex items-center gap-2 text-primary font-bold text-sm mb-2">
                <ChevronLeft className="w-4 h-4" />
                Previous Article
              </div>
              <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                {prevPost.title}
              </h3>
            </button>
          ) : (
            <div />
          )}

          {nextPost ? (
            <button
              onClick={() => navigate(`/blog/${nextPost.slug}`)}
              className="group text-right p-6 rounded-2xl border border-outline-variant/20 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <div className="flex items-center justify-end gap-2 text-primary font-bold text-sm mb-2">
                Next Article
                <ChevronRight className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                {nextPost.title}
              </h3>
            </button>
          ) : (
            <div />
          )}
        </div>
      </section>

      {/* Related Articles */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-10 py-16 max-w-7xl mx-auto">
        <h2 className="font-display text-3xl font-bold mb-8 text-on-surface">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts
            .filter((p) => p.category === post.category && p.id !== post.id)
            .slice(0, 3)
            .map((relatedPost) => (
              <button
                key={relatedPost.id}
                onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                className="group text-left bg-white rounded-2xl border border-outline-variant/20 overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <span className="text-xs font-bold text-primary">{relatedPost.category}</span>
                  <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant">{relatedPost.readTime} min read</p>
                </div>
              </button>
            ))}
        </div>
      </section>

    </div>
  );
}