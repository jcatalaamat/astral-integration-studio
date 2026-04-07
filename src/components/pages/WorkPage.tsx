import { useState, useEffect, useRef } from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { caseStudies, CaseStudyCategory } from '../../data/caseStudies';

const filters: Array<{ label: string; value: CaseStudyCategory | 'All' }> = [
  { label: 'All', value: 'All' },
  { label: 'Practitioners', value: 'Practitioners' },
  { label: 'Schools', value: 'Schools' },
  { label: 'Retreats', value: 'Retreats' },
  { label: 'Communities', value: 'Communities' },
  { label: 'Organizations', value: 'Organizations' },
  { label: 'Musicians', value: 'Musicians' },
  { label: 'Makers', value: 'Makers' },
];

export default function WorkPage() {
  useDocumentMeta({
    title: 'The Work — Astral Integration',
    description: 'Custom builds for practitioners, schools, retreats, communities, musicians, and makers. The challenge, the architecture, and what was built.',
    ogUrl: 'https://astralintegration.studio/work',
  });

  const [activeFilter, setActiveFilter] = useState<CaseStudyCategory | 'All'>('All');
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

  const filtered = activeFilter === 'All'
    ? caseStudies
    : caseStudies.filter((s) => s.category === activeFilter);

  return (
    <div className="min-h-screen bg-dark-bg font-sans">
      <Navigation />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            The Work
          </p>
          <h1 className="font-serif text-display font-light mb-8 max-w-[800px]">
            Every site is a custom build.
          </h1>
          <p className="text-body text-content-secondary max-w-prose mb-12">
            No templates. No themes. Each one designed for the practitioner's specific work, brand, and audience. The challenge, the architecture, and what was built.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-5 py-2 rounded-full text-body-sm font-medium transition-all ${
                  activeFilter === f.value
                    ? 'bg-accent text-white'
                    : 'bg-dark-card border border-border text-content-muted hover:border-border-hover hover:text-content-secondary'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="pb-section px-6 md:px-12">
        <div className="max-w-content mx-auto space-y-12">
          {filtered.map((study) => (
            <article
              key={study.slug}
              id={study.slug}
              className="bg-dark-card border border-border rounded-2xl overflow-hidden reveal"
              ref={addRevealRef}
            >
              {/* Header */}
              <div className={`relative w-full border-b border-border bg-gradient-to-br ${study.gradient} p-6 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4`}>
                <div>
                  <h2 className="font-serif text-h1 font-light">{study.type}</h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-meta uppercase text-content-muted bg-dark-bg/40 border border-border rounded-full px-3 py-1">
                    {study.category}
                  </span>
                  {study.url && (
                    <a
                      href={study.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-meta uppercase text-accent hover:text-content-primary transition-colors"
                    >
                      View Live
                    </a>
                  )}
                  {study.status && (
                    <span className="text-meta uppercase text-content-muted bg-dark-bg/60 backdrop-blur-sm border border-border rounded-full px-3 py-1">
                      {study.status}
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-10 space-y-8">
                <div>
                  <p className="text-meta uppercase text-accent mb-3">The Challenge</p>
                  <p className="text-body-sm text-content-secondary leading-relaxed">{study.challenge}</p>
                </div>

                <div>
                  <p className="text-meta uppercase text-accent mb-3">Key Decisions</p>
                  <p className="text-body-sm text-content-secondary leading-relaxed">{study.decisions}</p>
                </div>

                <div className="pt-6 border-t border-border">
                  <p className="text-meta uppercase text-content-muted mb-3">What Was Built</p>
                  <p className="text-body-sm text-content-primary leading-relaxed">{study.built}</p>
                </div>

                <a
                  href={`/work/${study.slug}`}
                  className="inline-flex items-center gap-2 text-body-sm text-accent hover:text-content-primary transition-colors mt-2"
                >
                  Full case study <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-body text-content-muted">No case studies in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-section px-6 md:px-12 bg-dark-card">
        <div className="max-w-content mx-auto text-center reveal" ref={addRevealRef}>
          <h2 className="font-serif text-display-sm font-light mb-6">
            Your work is next.
          </h2>
          <p className="text-body text-content-secondary max-w-prose mx-auto mb-10">
            If you've created something original and need a technical partner who thinks in systems — not features — I'd like to hear about it.
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
