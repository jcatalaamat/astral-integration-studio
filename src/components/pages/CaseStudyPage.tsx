import { useParams, Navigate } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { caseStudies } from '../../data/caseStudies';

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = caseStudies.find((s) => s.slug === slug);
  const currentIndex = caseStudies.findIndex((s) => s.slug === slug);

  useDocumentMeta({
    title: study ? `${study.client} — Astral Integration` : 'Case Study — Astral Integration',
    description: study ? study.challenge.slice(0, 160) : '',
    ogUrl: `https://astralintegration.studio/work/${slug}`,
  });

  if (!study) {
    return <Navigate to="/work" replace />;
  }

  const prev = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const next = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-dark-bg font-sans">
      <Navigation />

      {/* Hero */}
      <section className={`pt-40 pb-16 px-6 md:px-12 bg-gradient-to-br ${study.gradient}`}>
        <div className="max-w-content mx-auto">
          <a
            href="/work"
            className="text-meta uppercase text-accent mb-8 inline-flex items-center gap-2 hover:text-content-primary transition-colors"
          >
            <span aria-hidden="true">&larr;</span> All Case Studies
          </a>
          <h1 className="font-serif text-display font-light mb-4">{study.client}</h1>
          <p className="text-meta uppercase text-gold mb-8">{study.type}</p>

          <div className="flex items-center gap-4">
            {study.url && (
              <a
                href={study.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-accent text-white rounded-full text-body-sm font-medium btn-glow"
              >
                View Live
              </a>
            )}
            {study.status && (
              <span className="text-meta uppercase text-content-muted bg-dark-bg/60 backdrop-blur-sm border border-border rounded-full px-4 py-2">
                {study.status}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-section px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <div className="max-w-prose space-y-16">
            <div>
              <p className="text-meta uppercase text-accent mb-4 flex items-center gap-4">
                <span className="w-8 h-px bg-accent" />
                The Challenge
              </p>
              <p className="text-body text-content-secondary leading-relaxed">{study.challenge}</p>
            </div>

            <div>
              <p className="text-meta uppercase text-accent mb-4 flex items-center gap-4">
                <span className="w-8 h-px bg-accent" />
                Key Decisions
              </p>
              <p className="text-body text-content-secondary leading-relaxed">{study.decisions}</p>
            </div>

            <div>
              <p className="text-meta uppercase text-accent mb-4 flex items-center gap-4">
                <span className="w-8 h-px bg-accent" />
                What Was Built
              </p>
              <p className="text-body text-content-primary leading-relaxed">{study.built}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="py-12 px-6 md:px-12 border-t border-border">
        <div className="max-w-content mx-auto flex justify-between items-center">
          {prev ? (
            <a href={`/work/${prev.slug}`} className="group flex items-center gap-3 hover:text-accent transition-colors">
              <span className="text-content-muted group-hover:text-accent transition-colors" aria-hidden="true">&larr;</span>
              <div>
                <p className="text-meta uppercase text-content-muted">Previous</p>
                <p className="text-body-sm text-content-secondary group-hover:text-content-primary transition-colors">{prev.client}</p>
              </div>
            </a>
          ) : <div />}
          {next ? (
            <a href={`/work/${next.slug}`} className="group flex items-center gap-3 text-right hover:text-accent transition-colors">
              <div>
                <p className="text-meta uppercase text-content-muted">Next</p>
                <p className="text-body-sm text-content-secondary group-hover:text-content-primary transition-colors">{next.client}</p>
              </div>
              <span className="text-content-muted group-hover:text-accent transition-colors" aria-hidden="true">&rarr;</span>
            </a>
          ) : <div />}
        </div>
      </section>

      {/* CTA */}
      <section className="py-section px-6 md:px-12 bg-dark-card">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-display-sm font-light mb-6">
            Your work is next.
          </h2>
          <p className="text-body text-content-secondary max-w-prose mx-auto mb-10">
            If you've created something original and need a technical partner who thinks in systems — not features — I'd like to hear about it.
          </p>
          <a
            href="/#contact"
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
