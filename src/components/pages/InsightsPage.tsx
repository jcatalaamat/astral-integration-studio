import { useEffect, useRef } from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { blogPosts } from '../../data/blogPosts';

export default function InsightsPage() {
  useDocumentMeta({
    title: 'Insights — Astral Integration',
    description: 'Thinking on infrastructure, practitioner platforms, and what it takes to build digital homes for original work. By Jordi Amat.',
    ogUrl: 'https://astralintegration.studio/insights',
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

  return (
    <div className="min-h-screen bg-dark-bg font-sans">
      <Navigation />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            Insights
          </p>
          <h1 className="font-serif text-display font-light mb-8 max-w-[800px]">
            Thinking on infrastructure, platforms, and <em className="italic gradient-text">original work.</em>
          </h1>
          <p className="text-body text-content-secondary max-w-prose">
            Notes on what I see building platforms for practitioners, schools, retreat centers, and communities — the patterns, the problems, and why most off-the-shelf tools were never designed for this work.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="pb-section px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <div className="max-w-prose space-y-6">
            {blogPosts.map((post) => (
              <a
                key={post.slug}
                href={`/insights/${post.slug}`}
                className="block bg-dark-card border border-border rounded-2xl p-8 hover:border-accent/40 transition-all group reveal"
                ref={addRevealRef}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-meta uppercase text-accent">{post.category}</span>
                  <span className="text-meta text-content-muted">{post.readTime}</span>
                  <span className="text-meta text-content-muted">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <h2 className="font-serif text-h2 font-light group-hover:text-accent transition-colors mb-3">
                  {post.title}
                </h2>
                <p className="text-body-sm text-content-muted mb-4">{post.subtitle}</p>
                <p className="text-body-sm text-content-secondary leading-relaxed">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-body-sm text-accent mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read more <span aria-hidden="true">&rarr;</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section px-6 md:px-12 bg-dark-card">
        <div className="max-w-content mx-auto text-center reveal" ref={addRevealRef}>
          <h2 className="font-serif text-display-sm font-light mb-6">
            Building something original?
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
