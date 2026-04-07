import { Link } from 'react-router-dom';
import { TOOLS } from '../../config/tools';
import ToolsNavigation from '../tools/ToolsNavigation';
import ToolsFooter from '../tools/ToolsFooter';
import ToolCard from '../tools/ToolCard';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';

export default function ToolsHub() {
  useDocumentMeta({
    title: 'Free Tools — Astral Integration',
    description: 'Simple, beautiful tools to help you run your soul-led business with clarity. Life OS, Content Studio, and more.',
    ogUrl: 'https://astralintegration.studio/tools',
  });
  const toolsList = Object.values(TOOLS);

  return (
    <div className="min-h-screen bg-dark-bg">
      <ToolsNavigation />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 md:px-12 pt-24 pb-16 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gold rounded-full blur-3xl opacity-15 animate-float" style={{ animationDelay: '-10s' }} />

        <div className="relative z-10 max-w-content mx-auto text-center">
          <span className="text-meta uppercase text-accent mb-4 block animate-fadeUp">
            Free Tools
          </span>
          <h1 className="font-serif text-display text-content-primary mb-6 animate-fadeUp animate-delay-100">
            Tools for <em className="italic gradient-text">Soul-Led</em> Businesses
          </h1>
          <p className="text-h4 text-content-secondary max-w-prose mx-auto mb-8 animate-fadeUp animate-delay-200">
            Simple, beautiful tools to help you run your business with clarity.
            Built by the team behind Astral Integration.
          </p>
          <p className="text-body-sm text-content-muted animate-fadeUp animate-delay-300">
            No sign-up required • Free forever • Your data stays yours
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-section px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {toolsList.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Free Section */}
      <section className="py-section px-6 md:px-12 border-t border-border">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-meta uppercase text-gold mb-4 block">
                Why Free?
              </span>
              <h2 className="font-serif text-display-sm text-content-primary mb-6">
                We believe in giving first
              </h2>
              <p className="text-body text-content-secondary mb-6">
                These tools started as internal solutions for our own work and our clients' businesses.
                We decided to share them because we believe the best marketing is genuine value.
              </p>
              <p className="text-body text-content-secondary mb-8">
                Use them freely. If you ever need custom development, automations, or a full digital
                transformation—that's what we do at Astral Integration.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all"
              >
                Learn about our services
                <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-xl border border-border bg-dark-card">
                <div className="text-4xl mb-3">✦</div>
                <h3 className="text-h4 text-content-primary mb-2">No Catch</h3>
                <p className="text-body-sm text-content-muted">
                  Really free. No trial period. No credit card.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-dark-card">
                <div className="text-4xl mb-3">🔒</div>
                <h3 className="text-h4 text-content-primary mb-2">Private</h3>
                <p className="text-body-sm text-content-muted">
                  Your data stays in your browser. We don't track you.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-dark-card">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="text-h4 text-content-primary mb-2">Fast</h3>
                <p className="text-body-sm text-content-muted">
                  No loading. Works offline. Instant response.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-dark-card">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-h4 text-content-primary mb-2">Focused</h3>
                <p className="text-body-sm text-content-muted">
                  One job, done well. No feature bloat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-section px-6 md:px-12 bg-gradient-to-br from-accent-glow/30 to-gold-soft/20">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-display-sm text-content-primary mb-6">
            Need something custom?
          </h2>
          <p className="text-body text-content-secondary max-w-prose mx-auto mb-8">
            These free tools are just a taste of what we build. If you need custom platforms,
            AI integrations, or full digital systems—let's talk.
          </p>
          <a
            href="https://cal.astralintegration.studio/astral/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-medium btn-glow hover:scale-105 transition-all"
          >
            Book a Free Strategy Call
            <span>→</span>
          </a>
        </div>
      </section>

      <ToolsFooter />
    </div>
  );
}
