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

      {/* Builds Grid */}
      <section className="pb-section px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((study) => (
            <div
              key={study.slug}
              className={`bg-dark-card border border-border rounded-2xl overflow-hidden hover:border-accent/40 transition-all group bg-gradient-to-br ${study.gradient} reveal`}
              ref={addRevealRef}
            >
              <a href={study.url || undefined} target={study.url ? '_blank' : undefined} rel={study.url ? 'noopener noreferrer' : undefined} className="block p-6 pb-3">
                <p className="text-meta text-accent mb-2">{study.category}</p>
                <h3 className="font-serif text-h4 font-light group-hover:text-accent transition-colors">{study.type}</h3>
                <p className="text-body-sm text-content-secondary mt-3 leading-relaxed line-clamp-3">{study.challenge}</p>
              </a>
              <div className="px-6 pb-5">
                {study.url && (
                  <a href={study.url} target="_blank" rel="noopener noreferrer" className="text-body-sm text-content-muted hover:text-accent transition-colors inline-flex items-center gap-1">
                    {new URL(study.url).hostname} <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
              </div>
            </div>
          ))}

          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-body text-content-muted">No builds in this category yet.</p>
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
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="https://cal.astralintegration.studio/astral/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-accent text-white rounded-full text-body-sm font-medium btn-glow"
            >
              Book a Call
            </a>
            <a
              href="https://wa.me/34611144170"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-transparent text-content-secondary border border-border rounded-full text-body-sm font-medium hover:border-border-hover hover:text-content-primary transition-all"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
