import { useEffect, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { blogPosts } from '../../data/blogPosts';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  useDocumentMeta({
    title: post ? `${post.title} — Astral Integration` : 'Insights — Astral Integration',
    description: post?.excerpt || '',
    ogUrl: `https://astralintegration.studio/insights/${slug}`,
  });

  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  const addRevealRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  if (!post) {
    return <Navigate to="/insights" replace />;
  }

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const nextPost = blogPosts[currentIndex + 1] || blogPosts[0];

  return (
    <div className="min-h-screen bg-dark-bg font-sans">
      <Navigation />

      {/* Header */}
      <section className="pt-40 pb-16 px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <a
            href="/insights"
            className="text-meta uppercase text-accent mb-8 inline-flex items-center gap-2 hover:text-content-primary transition-colors"
          >
            <span aria-hidden="true">&larr;</span> All Insights
          </a>

          <div className="flex items-center gap-4 mb-6 mt-6">
            <span className="text-meta uppercase text-accent">{post.category}</span>
            <span className="text-meta text-content-muted">{post.readTime}</span>
            <span className="text-meta text-content-muted">
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <h1 className="font-serif text-display font-light mb-4 max-w-[800px]">
            {post.title}
          </h1>
          <p className="text-body text-content-muted max-w-prose">
            {post.subtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-section px-6 md:px-12">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <div className="max-w-prose space-y-6">
            {post.content.map((paragraph, i) => (
              <p key={i} className="text-body text-content-secondary leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Author + Next */}
      <section className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#0d0d14]">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <div className="max-w-prose">
            {/* Author */}
            <div className="flex items-start gap-4 mb-16 pb-12 border-b border-border">
              <div className="w-12 h-12 rounded-full border border-border overflow-hidden flex-shrink-0">
                <img src="/founder.jpeg" alt="Jordi Amat" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div>
                <p className="text-body-sm text-content-primary font-medium">Jordi Amat</p>
                <p className="text-meta text-content-muted">Senior engineer, former CTO. Building custom digital infrastructure for schools, practices, and original work from Mazunte, Oaxaca.</p>
              </div>
            </div>

            {/* Next post */}
            {nextPost && nextPost.slug !== post.slug && (
              <div>
                <p className="text-meta uppercase text-content-muted mb-4">Next</p>
                <a
                  href={`/insights/${nextPost.slug}`}
                  className="block bg-dark-card border border-border rounded-2xl p-8 hover:border-accent/40 transition-all group"
                >
                  <h3 className="font-serif text-h2 font-light group-hover:text-accent transition-colors mb-2">
                    {nextPost.title}
                  </h3>
                  <p className="text-body-sm text-content-muted">{nextPost.subtitle}</p>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section px-6 md:px-12 bg-dark-card">
        <div className="max-w-content mx-auto text-center reveal" ref={addRevealRef}>
          <h2 className="font-serif text-display-sm font-light mb-6">
            Ready to talk?
          </h2>
          <p className="text-body text-content-secondary max-w-prose mx-auto mb-10">
            If your work needs infrastructure that doesn't exist yet, I'd like to hear about it.
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 bg-accent text-white rounded-full text-body-sm font-medium btn-glow"
          >
            Start a Conversation
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
