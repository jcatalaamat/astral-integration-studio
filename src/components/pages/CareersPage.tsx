import { useEffect } from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';

export default function CareersPage() {
  useEffect(() => {
    document.title = 'Careers & Collaboration — Astral Integration';
  }, []);

  return (
    <div className="min-h-screen bg-studio-bg font-sans">
      <Navigation />

      {/* HERO */}
      <section className="min-h-[70vh] flex items-center">
        <div className="max-w-content mx-auto px-6 md:px-12 py-32 md:py-40">
          <div className="max-w-3xl">
            <h1 className="text-display-sm md:text-display text-content-primary mb-8">
              Careers & Collaboration
            </h1>

            <p className="text-h2 md:text-h1 text-content-primary font-medium mb-12 max-w-2xl">
              Astral Integration is a small, focused studio building digital infrastructure for real-world work.
            </p>

            <p className="text-body text-content-secondary leading-relaxed mb-8 max-w-prose">
              We collaborate with people who are interested in long-term systems, not short-term projects — and who are comfortable working in early-stage, high-trust environments.
            </p>

            <p className="text-body text-content-primary leading-relaxed max-w-prose">
              Most roles here are foundational, ownership-oriented, and selective.
            </p>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-28 md:py-36 bg-studio-bgAlt">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="max-w-prose">
            <p className="text-meta text-content-tertiary uppercase tracking-wider mb-6">
              How We Work
            </p>

            <ul className="space-y-3 mb-12">
              {[
                'We build systems, not one-off deliverables',
                'We prioritize clarity before execution',
                'We work lean, with a small core and trusted collaborators',
                'We favor ownership and shared upside over hourly billing',
                'We work remotely and asynchronously'
              ].map((item, i) => (
                <li key={i} className="text-body text-content-secondary flex items-start gap-3">
                  <span className="text-accent mt-1.5 text-sm">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div>
              <p className="text-body text-content-primary leading-relaxed mb-2">This is not a traditional company structure.</p>
              <p className="text-body text-content-primary leading-relaxed">It is a studio forming its core.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE'RE LOOKING FOR */}
      <section className="py-28 md:py-36">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="max-w-prose">
            <p className="text-meta text-content-tertiary uppercase tracking-wider mb-6">
              Who We're Looking For
            </p>

            <p className="text-body text-content-secondary leading-relaxed mb-8">
              We're interested in people who:
            </p>

            <ul className="space-y-3 mb-12">
              {[
                'think in systems',
                'are comfortable with ambiguity',
                'can work independently',
                'value clarity and restraint',
                'want to build things that last'
              ].map((item, i) => (
                <li key={i} className="text-body text-content-secondary flex items-start gap-3">
                  <span className="text-accent mt-1.5 text-sm">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-lg text-content-primary font-medium">
              If you need detailed instructions or constant feedback, this will not be a good fit.
            </p>
          </div>
        </div>
      </section>

      {/* OPEN COLLABORATION ROLES */}
      <section className="py-28 md:py-36 bg-studio-bgAlt">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="max-w-prose mb-16">
            <p className="text-meta text-content-tertiary uppercase tracking-wider mb-6">
              Open Collaboration Roles
            </p>
          </div>

          {/* Role 1: Founding Operations & Systems Lead */}
          <div className="max-w-prose mb-20">
            <div className="py-10 border-t-2 border-content-primary mb-8">
              <h3 className="text-h2 text-content-primary mb-2">Founding Operations & Systems Lead</h3>
              <p className="text-body-sm text-content-tertiary italic">COO-type role</p>
            </div>

            <p className="text-body text-content-secondary leading-relaxed mb-8">
              Focus: Structure, clarity, and coordination.
            </p>

            <p className="text-body text-content-secondary leading-relaxed mb-8">
              What you'll do:
            </p>

            <ul className="space-y-3 mb-12">
              {[
                'Translate spoken ideas into clear documents and plans',
                'Own the Notion workspace (source of truth)',
                'Build roadmaps, task boards, and internal documentation',
                'Extract requirements and define scopes',
                'Break large ideas into actionable work',
                'Coordinate designers, builders, and collaborators',
                'Keep projects aligned without heavy oversight'
              ].map((item, i) => (
                <li key={i} className="text-body text-content-secondary flex items-start gap-3">
                  <span className="text-accent mt-1.5 text-sm">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-body text-content-secondary leading-relaxed mb-8">
              This role suits someone with experience in:
            </p>

            <ul className="space-y-3 mb-12">
              {[
                'operations',
                'product or program management',
                'startup generalist roles',
                'systems design'
              ].map((item, i) => (
                <li key={i} className="text-body text-content-secondary flex items-start gap-3">
                  <span className="text-accent mt-1.5 text-sm">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-lg text-content-primary font-medium">
              Compensation: Founding role with %-based upside. Long-term orientation.
            </p>
          </div>

          {/* Role 2: Founding Design / UX Lead */}
          <div className="max-w-prose mb-20">
            <div className="py-10 border-t-2 border-studio-divider mb-8">
              <h3 className="text-h3 text-content-primary mb-2">Founding Design / UX Lead</h3>
              <p className="text-body-sm text-content-tertiary italic">Part-time, systems-focused</p>
            </div>

            <p className="text-body text-content-secondary leading-relaxed mb-8">
              Focus: Usability, clarity, and reuse.
            </p>

            <p className="text-body text-content-secondary leading-relaxed mb-8">
              What you'll do:
            </p>

            <ul className="space-y-3 mb-12">
              {[
                'Design user flows and interaction logic',
                'Build a reusable design system',
                'Create Figma prototypes for web and app experiences',
                'Ensure consistency across platforms and products',
                'Collaborate closely with ops and technical leads'
              ].map((item, i) => (
                <li key={i} className="text-body text-content-secondary flex items-start gap-3">
                  <span className="text-accent mt-1.5 text-sm">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-body text-content-secondary leading-relaxed mb-8">
              This role suits someone who:
            </p>

            <ul className="space-y-3 mb-12">
              {[
                'is product-minded, not trend-driven',
                'understands complex systems',
                'prefers clarity over visual excess'
              ].map((item, i) => (
                <li key={i} className="text-body text-content-secondary flex items-start gap-3">
                  <span className="text-accent mt-1.5 text-sm">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-lg text-content-primary font-medium">
              Compensation: Project-based and/or %-based, depending on engagement.
            </p>
          </div>

          {/* Role 3: Technical Collaborators */}
          <div className="max-w-prose mb-20">
            <div className="py-10 border-t-2 border-studio-divider mb-8">
              <h3 className="text-h3 text-content-primary mb-2">Technical Collaborators</h3>
              <p className="text-body-sm text-content-tertiary italic">Freelance / Project-Based</p>
            </div>

            <p className="text-body text-content-secondary leading-relaxed mb-8">
              Focus: Building defined systems once clarity is established.
            </p>

            <p className="text-body text-content-secondary leading-relaxed mb-8">
              What you'll do:
            </p>

            <ul className="space-y-3 mb-12">
              {[
                'Implement scoped features or platforms',
                'Work from clear documentation and designs',
                'Collaborate asynchronously'
              ].map((item, i) => (
                <li key={i} className="text-body text-content-secondary flex items-start gap-3">
                  <span className="text-accent mt-1.5 text-sm">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-lg text-content-primary font-medium">
              Compensation: Paid per project or milestone. Occasional long-term collaboration.
            </p>
          </div>

          {/* Role 4: Ambassadors & Connectors */}
          <div className="max-w-prose">
            <div className="py-10 border-t-2 border-studio-divider mb-8">
              <h3 className="text-h3 text-content-primary mb-2">Ambassadors & Connectors</h3>
              <p className="text-body-sm text-content-tertiary italic">Referral-based</p>
            </div>

            <p className="text-body text-content-secondary leading-relaxed mb-8">
              Focus: Introductions and referrals.
            </p>

            <p className="text-body text-content-secondary leading-relaxed mb-8">
              What you'll do:
            </p>

            <ul className="space-y-3 mb-12">
              {[
                'Introduce communities, practitioners, or organizations',
                'Make warm connections when there is clear fit'
              ].map((item, i) => (
                <li key={i} className="text-body text-content-secondary flex items-start gap-3">
                  <span className="text-accent mt-1.5 text-sm">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-body text-content-secondary leading-relaxed mb-8">
              Compensation: Cash-based percentage per engagement or referral.
            </p>

            <p className="text-lg text-content-primary font-medium">
              No meetings. No management. Simple terms.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE DON'T OFFER */}
      <section className="py-28 md:py-36">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="max-w-prose">
            <p className="text-meta text-content-tertiary uppercase tracking-wider mb-6">
              What We Don't Offer
            </p>

            <ul className="space-y-0 mb-12">
              {[
                'Full-time employment (at this stage)',
                'Hourly agency-style work',
                'Undefined scope collaborations',
                'Heavy process or bureaucracy'
              ].map((item, i) => (
                <li key={i} className="text-body text-content-primary py-4 border-b border-studio-divider last:border-b-0">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* HOW TO REACH OUT */}
      <section className="py-28 md:py-36 bg-studio-bgAlt">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="max-w-prose">
            <p className="text-meta text-content-tertiary uppercase tracking-wider mb-6">
              How to Reach Out
            </p>

            <p className="text-body text-content-secondary leading-relaxed mb-8">
              If one of the roles above feels aligned, contact us with:
            </p>

            <ul className="space-y-3 mb-12">
              {[
                'a brief introduction',
                'relevant experience or examples',
                "the role you're interested in"
              ].map((item, i) => (
                <li key={i} className="text-body text-content-secondary flex items-start gap-3">
                  <span className="text-accent mt-1.5 text-sm">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-lg text-content-primary font-medium mb-12">
              We respond personally to aligned inquiries.
            </p>

            <a
              href="mailto:hello@astralintegration.studio"
              className="inline-block px-10 py-4 bg-content-primary text-studio-bg hover:bg-content-primary/90 active:bg-content-primary/80 transition-colors text-body font-medium"
            >
              hello@astralintegration.studio
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
