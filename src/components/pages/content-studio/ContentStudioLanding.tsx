import { Link } from 'react-router-dom';
import { TOOLS } from '../../../config/tools';
import ToolsNavigation from '../../tools/ToolsNavigation';
import ToolsFooter from '../../tools/ToolsFooter';
import ToolHero from '../../tools/ToolHero';
import FeatureGrid from '../../tools/FeatureGrid';
import { useDocumentMeta } from '../../../hooks/useDocumentMeta';

const tool = TOOLS['content-studio'];

export default function ContentStudioLanding() {
  useDocumentMeta({
    title: 'Content Studio — AI-Powered Content Creation',
    description: 'Generate authentic social media content aligned with your voice. AI-powered, intuitive, and free to start.',
    ogUrl: 'https://astralintegration.studio/tools/content-studio',
  });
  return (
    <div className="min-h-screen bg-dark-bg" data-tool="content-studio">
      <ToolsNavigation currentToolId="content-studio" />

      <ToolHero tool={tool} />

      <FeatureGrid tool={tool} />

      {/* How It Works */}
      <section className="py-section px-6 md:px-12 border-t border-border">
        <div className="max-w-content mx-auto">
          <div className="text-center mb-16">
            <span className="text-meta uppercase text-gold mb-4 block">
              How It Works
            </span>
            <h2 className="font-serif text-display-sm text-content-primary">
              Three steps to great content
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Choose your format',
                description: 'Single post, carousel, reel script, stories, or a full week of ideas.',
              },
              {
                step: '02',
                title: 'Give it a seed',
                description: 'A pain point, observation, or topic. The AI handles the rest.',
              },
              {
                step: '03',
                title: 'Copy and post',
                description: 'One-click copy. Paste it into Instagram. Done.',
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-serif mx-auto mb-4"
                  style={{
                    background: tool.theme.primaryGlow,
                    color: tool.theme.primary,
                  }}
                >
                  {item.step}
                </div>
                <h3 className="text-h4 text-content-primary mb-2">{item.title}</h3>
                <p className="text-body-sm text-content-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-section px-6 md:px-12">
        <div
          className="max-w-content mx-auto rounded-2xl p-12 text-center"
          style={{
            background: `linear-gradient(135deg, ${tool.theme.primaryGlow}, ${tool.theme.primaryGlow})`,
            border: `1px solid ${tool.theme.primary}30`,
          }}
        >
          <h2 className="font-serif text-display-sm text-content-primary mb-4">
            Ready to create?
          </h2>
          <p className="text-body text-content-secondary max-w-prose mx-auto mb-8">
            Stop staring at a blank screen. Generate content that sounds like you in seconds.
          </p>
          <Link
            to="/tools/content-studio/app"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-medium transition-all hover:scale-105"
            style={{
              background: tool.theme.primary,
              boxShadow: `0 0 40px ${tool.theme.primaryGlow}`,
            }}
          >
            Launch Content Studio
            <span>→</span>
          </Link>
          <p className="text-body-sm text-content-muted mt-4">
            5 free generations per day • No sign-up required
          </p>
        </div>
      </section>

      <ToolsFooter />
    </div>
  );
}
