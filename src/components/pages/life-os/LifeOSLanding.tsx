import { Link } from 'react-router-dom';
import { TOOLS } from '../../../config/tools';
import ToolsNavigation from '../../tools/ToolsNavigation';
import ToolsFooter from '../../tools/ToolsFooter';
import ToolHero from '../../tools/ToolHero';
import FeatureGrid from '../../tools/FeatureGrid';
import { useDocumentMeta } from '../../../hooks/useDocumentMeta';

const tool = TOOLS['life-os'];

export default function LifeOSLanding() {
  useDocumentMeta({
    title: 'Life OS — Organize Your Life with Clarity',
    description: 'A simple, beautiful task manager for soul-led humans. Organize your life across 6 key areas. Free, offline, your data stays local.',
    ogUrl: 'https://astralintegration.studio/tools/life-os',
  });
  return (
    <div className="min-h-screen bg-dark-bg" data-tool="life-os">
      <ToolsNavigation currentToolId="life-os" />

      <ToolHero tool={tool} />

      <FeatureGrid tool={tool} />

      {/* How It Works */}
      <section className="py-section px-6 md:px-12 border-t border-border">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-16">
            <span className="text-meta uppercase mb-4 block" style={{ color: tool.theme.primary }}>
              How It Works
            </span>
            <h2 className="font-serif text-display-sm text-content-primary">
              Simple by design
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 font-serif"
                style={{ background: tool.theme.primaryGlow, color: tool.theme.primary }}
              >
                1
              </div>
              <h3 className="text-h4 text-content-primary mb-2">Capture</h3>
              <p className="text-body-sm text-content-secondary">
                Hit the + button. Type your thought. Done. It goes to your Inbox by default.
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 font-serif"
                style={{ background: tool.theme.primaryGlow, color: tool.theme.primary }}
              >
                2
              </div>
              <h3 className="text-h4 text-content-primary mb-2">Organize</h3>
              <p className="text-body-sm text-content-secondary">
                Move items between 6 categories. Today, Follow Up, Ideas, Home, Waiting On, or keep in Inbox.
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 font-serif"
                style={{ background: tool.theme.primaryGlow, color: tool.theme.primary }}
              >
                3
              </div>
              <h3 className="text-h4 text-content-primary mb-2">Complete</h3>
              <p className="text-body-sm text-content-secondary">
                Check off items as you do them. Star the important ones. Clear completed when ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot Preview */}
      <section className="py-section px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <div
            className="rounded-2xl border border-border overflow-hidden"
            style={{ background: tool.theme.primaryGlow }}
          >
            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="font-serif text-h2 text-content-primary mb-2">
                  See it in action
                </h2>
                <p className="text-body text-content-secondary">
                  A clean interface for a calm mind.
                </p>
              </div>

              {/* Mini preview */}
              <div className="bg-dark-bg rounded-xl border border-border p-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                  <span className="text-2xl">◉</span>
                  <div>
                    <div className="text-content-primary font-medium">Today</div>
                    <div className="text-body-sm text-content-muted">What matters right now</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { text: 'Review client proposal', priority: true },
                    { text: 'Call mom back', priority: false },
                    { text: 'Send invoice to Alex', priority: true },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg border"
                      style={{
                        background: item.priority ? 'rgba(201,169,110,0.04)' : '#111118',
                        borderColor: item.priority ? 'rgba(201,169,110,0.15)' : 'rgba(196,149,106,0.06)',
                      }}
                    >
                      <div className="w-5 h-5 rounded border border-border" />
                      <span className="text-body-sm text-content-primary flex-1">{item.text}</span>
                      {item.priority && <span className="text-gold">★</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-section px-6 md:px-12 bg-gradient-to-br from-accent-glow/30 to-transparent">
        <div className="max-w-content mx-auto text-center">
          <h2 className="font-serif text-display-sm text-content-primary mb-6">
            Ready to clear your mind?
          </h2>
          <p className="text-body text-content-secondary max-w-prose mx-auto mb-8">
            No account needed. Your data stays in your browser. Just start capturing.
          </p>
          <Link
            to={tool.appPath}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-medium btn-tool-glow hover:scale-105 transition-all"
            style={{ background: tool.theme.primary }}
          >
            Launch Life OS
            <span>→</span>
          </Link>
        </div>
      </section>

      <ToolsFooter />
    </div>
  );
}
