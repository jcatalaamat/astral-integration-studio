import { useState, useEffect, useRef } from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';

const tiers = [
  {
    name: 'Launch',
    who: 'For solo practitioners.',
    desc: 'You\'re running your practice on WhatsApp, Calendly, and a website that doesn\'t do what you need. You need a clean, professional digital home that actually works — and a technical partner who grows with you.',
    build: '$1,500 – $3,000',
    monthly: '$250 – $500/mo',
    timeline: '1–2 weeks',
    includes: [
      'Custom website designed for your brand',
      'Booking / scheduling system',
      'Payment processing (Stripe)',
      'Contact forms and basic email automation',
      'Hosting, domain, SSL — all managed',
      'Bug fixes and maintenance',
      'Email and chat support',
    ],
    audience: 'Yoga teachers, massage therapists, coaches, healers, facilitators — anyone building their practice who needs a solid digital foundation.',
    highlight: false,
  },
  {
    name: 'Systems',
    who: 'For schools & structured programs.',
    desc: 'You have students, clients, or guests — certifications, multiple revenue streams, a real following. You don\'t just need a website. You need a platform and a technical partner who owns it.',
    build: '$5,000 – $10,000',
    monthly: '$1,000 – $2,000/mo',
    timeline: '3–6 weeks',
    includes: [
      'Everything in Launch',
      'Multi-offering platform (retreats + courses + membership, etc.)',
      'Custom booking flows with intake questionnaires',
      'Course or content delivery system',
      'Membership portal with gated content',
      'Client/student dashboard',
      'Certification and progression systems',
      'Practitioner or facilitator directory',
      'AI assistant trained on your methodology',
      'Email automation (onboarding sequences, reminders)',
      'Bilingual / multilingual support',
      'Weekly strategy calls',
      'Architecture decisions and vendor management',
      'CTO-level technical leadership',
    ],
    audience: 'Schools with certification programs, retreat centers with multiple revenue streams, touring facilitators, established teachers with 500+ students, coaches with membership programs.',
    highlight: true,
  },
  {
    name: 'Ecosystem',
    who: 'For centers, multi-program, and network operations.',
    desc: 'Your methodology is taught by hundreds of facilitators across countries and languages. The infrastructure needs to match.',
    build: '$10,000+',
    monthly: 'Custom monthly / rev share',
    timeline: '6–12 weeks',
    includes: [
      'Everything in Systems',
      'Multi-region facilitator management',
      'Cross-timezone scheduling and coordination',
      'Credential verification systems',
      'Regional admin dashboards',
      'Multi-language content management',
      'Dedicated technical leadership',
      'Custom integrations and API development',
    ],
    audience: 'Organizations with facilitators in multiple countries, franchise-like certification systems, large networks.',
    highlight: false,
  },
];

const universals = [
  { bold: 'You own everything.', rest: 'Code, data, domain, content. From day one. Always.' },
  { bold: 'Real code.', rest: 'Custom-built platform, not templates or no-code tools you\'ll outgrow.' },
  { bold: 'Managed hosting.', rest: 'I handle servers, uptime, security, SSL, backups.' },
  { bold: 'Ongoing maintenance.', rest: 'Bug fixes, updates, and platform health.' },
  { bold: 'Direct access to me.', rest: 'Not a support ticket system. Not a junior dev.' },
  { bold: 'No lock-in.', rest: 'If you want to leave, you take everything with you.' },
];

const faqs = [
  {
    q: 'What if I\'m just starting out and don\'t have much revenue yet?',
    a: 'The Launch tier is designed exactly for this. A solid foundation doesn\'t require a complex platform. We build what you need now and expand as you grow.',
  },
  {
    q: 'Can I upgrade tiers later?',
    a: 'Yes. Most partnerships start at one level and grow. A practitioner who launches a retreat series might move from Launch to Systems. A school that expands internationally might move from Systems to Ecosystem. The platform evolves with you.',
  },
  {
    q: 'What\'s the difference between a monthly retainer and hiring a developer?',
    a: 'A developer builds what you tell them to build. A monthly retainer with me means I take ownership of your entire technical ecosystem — I make the decisions, anticipate problems, plan the roadmap, and build proactively. It\'s the difference between an employee and a CTO.',
  },
  {
    q: 'Why is there a monthly partnership fee? Can\'t I just pay for the build?',
    a: 'You can. But a platform without ongoing maintenance and evolution is like a car without oil changes. It works for six months, then things break, security becomes stale, and you\'re stuck with no one to call. The monthly partnership ensures your platform stays healthy, secure, and growing with you.',
  },
  {
    q: 'What if I want to hire my own developer later?',
    a: 'Great. I\'ll help you hire the right person, hand off the codebase with full documentation, and make sure the transition is clean. No lock-in, ever.',
  },
  {
    q: 'Do you work with people outside the healing/education space?',
    a: 'Occasionally, if the work resonates. But my deepest expertise is in schools, practices, retreats, and communities. That\'s where I build fastest, understand the most, and add the most value.',
  },
  {
    q: 'How do you work with my existing tools?',
    a: 'I assess everything you\'re currently using and recommend what to keep, what to replace, and what to integrate. I\'m not dogmatic about tools — if your Stripe setup works, we keep it. If Teachable is holding you back, we replace it.',
  },
  {
    q: 'What does "you own everything" actually mean?',
    a: 'The code lives in your GitHub (or I transfer it). The domain is in your name. The database is on your infrastructure. If our partnership ends tomorrow, you walk away with a fully functional platform and zero dependencies on me.',
  },
];

export default function PricingPage() {
  useDocumentMeta({
    title: 'Pricing — Astral Integration',
    description: 'Clear pricing for custom digital platforms. Three tiers: Launch, Systems, and Ecosystem. Foundation build + monthly partnership. You own everything from day one.',
    ogUrl: 'https://astralintegration.studio/pricing',
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);
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
            Pricing
          </p>
          <h1 className="font-serif text-display font-light mb-8 max-w-[800px]">
            Clear pricing. <em className="italic gradient-text">No surprises.</em>
          </h1>
          <p className="text-body text-content-secondary max-w-prose">
            Every partnership is scoped to the work. Here's how pricing works so you know what to expect before we talk.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="pb-section px-6 md:px-12">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <div className="max-w-prose">
            <p className="text-body text-content-secondary leading-relaxed mb-5">
              Every engagement has two parts:
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-dark-card border border-border rounded-xl p-6">
                <p className="text-body text-content-primary font-medium mb-1">1. Foundation Build</p>
                <p className="text-body-sm text-content-secondary">The initial platform that replaces your scattered tools with one cohesive system. This is a one-time investment based on scope.</p>
              </div>
              <div className="bg-dark-card border border-border rounded-xl p-6">
                <p className="text-body text-content-primary font-medium mb-1">2. Monthly Partnership</p>
                <p className="text-body-sm text-content-secondary">Ongoing technical leadership, maintenance, new features, and platform evolution. This is what makes it a partnership, not a project.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#0d0d14]">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {tiers.map((tier, i) => (
              <div
                key={i}
                className={`bg-dark-card border rounded-2xl p-8 flex flex-col ${
                  tier.highlight ? 'border-accent/40 ring-1 ring-accent/20' : 'border-border'
                }`}
              >
                <h3 className="font-serif text-h2 font-light mb-2">{tier.name}</h3>
                <p className="text-body-sm text-accent font-medium mb-3">{tier.who}</p>
                <p className="text-body-sm text-content-muted mb-8">{tier.desc}</p>

                <div className="space-y-4 mb-8">
                  <div>
                    <p className="text-meta uppercase text-content-muted mb-1">Foundation build</p>
                    <p className="font-serif text-h3 font-light text-accent">{tier.build}</p>
                  </div>
                  <div>
                    <p className="text-meta uppercase text-content-muted mb-1">Monthly partnership</p>
                    <p className="font-serif text-h3 font-light text-accent">{tier.monthly}</p>
                  </div>
                  <div>
                    <p className="text-meta uppercase text-content-muted mb-1">Timeline</p>
                    <p className="text-body-sm text-content-secondary">{tier.timeline}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-border flex-1">
                  <p className="text-meta uppercase text-content-muted mb-4">Includes</p>
                  <ul className="space-y-2">
                    {tier.includes.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-body-sm text-content-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-border">
                  <p className="text-meta text-content-muted">{tier.audience}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Beyond Enterprise */}
          <div className="bg-dark-card border border-border rounded-2xl p-8 md:p-10 max-w-prose">
            <h3 className="font-serif text-h3 mb-3">Something bigger in mind?</h3>
            <p className="text-body-sm text-content-secondary mb-6">
              If your project doesn't fit neatly into a tier — multiple platforms, complex migrations, unusual technical challenges, or you're not sure what you need yet — let's just talk. I'll assess the full picture and send a clear proposal.
            </p>
            <a
              href="/contact"
              className="text-body-sm text-accent hover:text-content-primary transition-colors inline-flex items-center gap-2"
            >
              Start a conversation <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* What Every Tier Includes */}
      <section className="py-section px-6 md:px-12">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            Every Partnership
          </p>
          <h2 className="font-serif text-display-sm font-light mb-12">
            Non-negotiables.
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            {universals.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <p className="text-body-sm text-content-secondary">
                  <strong className="text-content-primary">{item.bold}</strong> {item.rest}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue-Aligned Pricing */}
      <section className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#0d0d14]">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <div className="bg-dark-card border border-accent/20 rounded-2xl p-8 md:p-10 max-w-prose">
            <p className="text-meta uppercase text-accent mb-4 flex items-center gap-4">
              <span className="w-8 h-px bg-accent" />
              Revenue-Aligned Option
            </p>
            <h3 className="font-serif text-h3 mb-4">For Systems and Ecosystem partnerships.</h3>
            <p className="text-body-sm text-content-secondary leading-relaxed mb-6">
              I also offer an option where part of my compensation is tied to the revenue processed through your platform.
            </p>

            <div className="space-y-3 mb-6">
              {[
                'A percentage (typically 5\u201312%) of transactions processed through the platform I built',
                'This can reduce your upfront and monthly costs',
                'It means I\'m financially invested in your platform\'s success \u2014 not just its launch',
                'Buyout option available at any time',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <p className="text-body-sm text-content-secondary">{item}</p>
                </div>
              ))}
            </div>

            <p className="text-body-sm text-content-muted">
              This isn't for every partnership. It makes sense when significant revenue flows through your platform (retreats, courses, memberships, events). For simpler sites, the standard model is a better fit. I'll recommend the right structure during our conversation.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-section px-6 md:px-12">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            FAQ
          </p>
          <h2 className="font-serif text-display-sm font-light mb-16">
            Common questions.
          </h2>

          <div className="max-w-prose space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-dark-card/50 transition-colors"
                >
                  <span className="text-body-sm text-content-primary font-medium pr-4">{faq.q}</span>
                  <span className={`text-content-muted flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-body-sm text-content-secondary leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
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
            I take on 3–5 partnerships at a time. If your work is ready for real infrastructure, let's have a conversation.
          </p>
          <a
            href="https://cal.astralintegration.studio/astral/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-accent text-white rounded-full text-body-sm font-medium btn-glow"
          >
            Book a Call
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
