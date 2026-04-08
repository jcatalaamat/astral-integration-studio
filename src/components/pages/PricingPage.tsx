import { useState, useEffect, useRef } from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';

const tiers = [
  {
    name: 'Practitioners & Makers',
    who: 'Solo healers, coaches, therapists, facilitators, artisans, musicians, makers.',
    build: '$1,500 \u2013 $3,000',
    monthly: '$250 \u2013 $500/mo',
    timeline: '1\u20132 weeks',
    includes: [
      'Custom website designed for your brand',
      'Booking / scheduling system',
      'Payment processing (Stripe)',
      'Contact forms and email automation',
      'Hosting, domain, SSL \u2014 all managed',
      'Bug fixes and maintenance',
      'Direct access to me',
    ],
    highlight: false,
  },
  {
    name: 'Schools \u00b7 Retreats \u00b7 Communities',
    who: 'Multi-instructor schools, retreat centers, ecovillages, certification programs.',
    build: '$5,000 \u2013 $10,000',
    monthly: '$500 \u2013 $1,500/mo',
    timeline: '2\u20134 weeks',
    includes: [
      'Everything in Practitioners',
      'Multi-offering platform (retreats + courses + membership)',
      'Custom booking flows with intake questionnaires',
      'Course or content delivery system',
      'Membership portal with gated content',
      'Student/client dashboard',
      'Certification and progression systems',
      'AI assistant trained on your methodology',
      'Email automation (onboarding, reminders)',
      'Bilingual / multilingual support',
    ],
    highlight: true,
  },
  {
    name: 'Organizations & Centers',
    who: 'Established orgs with real teams, multi-stream revenue, and real complexity.',
    build: '$15,000 \u2013 $30,000',
    monthly: '$1,500 \u2013 $3,000/mo',
    timeline: '4\u20138 weeks',
    includes: [
      'Everything in Schools',
      'Multi-region facilitator management',
      'Cross-timezone scheduling and coordination',
      'Custom integrations and API development',
      'Dedicated technical leadership',
      'Multi-language content management',
      'Revenue share alignment available',
    ],
    highlight: false,
  },
];

const universals = [
  { bold: 'You own everything.', rest: 'Code, data, domain, content. From day one. Always.' },
  { bold: 'Real code.', rest: "Custom-built platform, not templates or no-code tools you'll outgrow." },
  { bold: 'Managed hosting.', rest: 'I handle servers, uptime, security, SSL, backups.' },
  { bold: 'Ongoing maintenance.', rest: 'Bug fixes, updates, and platform health.' },
  { bold: 'Direct access to me.', rest: 'Not a support ticket system. Not a junior dev.' },
  { bold: 'No lock-in.', rest: 'If you want to leave, you take everything with you.' },
];

const faqs = [
  {
    q: "What if I'm just starting out and don't have much revenue yet?",
    a: 'The Practitioners & Makers tier starts at $1,500 for the build and $250/mo ongoing. I scope the build to what you actually need right now \u2014 we can always expand later as your practice grows.',
  },
  {
    q: 'What does the build fee cover?',
    a: 'The foundation build is your custom platform \u2014 designed, developed, and deployed. Your brand, your domain, your booking and payment systems. Everything you need to launch. The monthly fee covers ongoing maintenance, hosting, updates, and my availability as your technical partner.',
  },
  {
    q: 'How do I know which tier I need?',
    a: "Practitioners & Makers is for solo practices. Schools, Retreats & Communities is for multi-offering operations with real complexity \u2014 certification programs, intake flows, membership portals. Organizations & Centers is for established orgs with teams, multi-region operations, and serious infrastructure needs. We'll figure out the right fit in our first conversation.",
  },
  {
    q: 'What about long-term partnerships or revenue share?',
    a: "For established practices with real revenue, I also offer revenue-share partnerships \u2014 my success is tied to yours. This is by conversation, not a menu item.",
  },
  {
    q: 'What if I want to hire my own developer later?',
    a: "Great. I'll help you hire the right person, hand off the codebase with full documentation, and make sure the transition is clean. No lock-in, ever.",
  },
  {
    q: 'Do you work with people outside the healing/education space?',
    a: "Occasionally, if the work resonates. But my deepest expertise is in schools, practices, retreats, and communities. That's where I build fastest, understand the most, and add the most value.",
  },
  {
    q: 'How do you work with my existing tools?',
    a: "I assess everything you're currently using and recommend what to keep, what to replace, and what to integrate. I'm not dogmatic about tools \u2014 if your Stripe setup works, we keep it. If Teachable is holding you back, we replace it.",
  },
  {
    q: 'What does "you own everything" actually mean?',
    a: 'The code lives in your GitHub (or I transfer it). The domain is in your name. The database is on your infrastructure. If our partnership ends tomorrow, you walk away with a fully functional platform and zero dependencies on me.',
  },
];

export default function PricingPage() {
  useDocumentMeta({
    title: 'Pricing — Astral Integration',
    description: 'Clear pricing. No surprises. Every engagement has a foundation build and an ongoing partnership. You own everything from day one.',
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
            Every engagement has a foundation build and an ongoing partnership. You own everything from day one.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#F5F4F2]">
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
                <p className="text-body-sm text-content-muted mb-6">{tier.who}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <p className="text-body-sm text-content-secondary">Build</p>
                    <p className="font-serif text-h4 font-light text-accent">{tier.build}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-body-sm text-content-secondary">Monthly</p>
                    <p className="font-serif text-h4 font-light text-accent">{tier.monthly}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-body-sm text-content-secondary">Timeline</p>
                    <p className="font-serif text-h4 font-light text-content-primary">{tier.timeline}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-border flex-1">
                  <p className="text-meta uppercase text-content-muted mb-3">Includes</p>
                  <ul className="space-y-2">
                    {tier.includes.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-body-sm text-content-secondary">
                        <span className="text-accent mt-0.5 flex-shrink-0">{'\u2713'}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6">
                  <a
                    href="https://cal.astralintegration.studio/astral/discovery-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center px-8 py-3 bg-accent text-white rounded-full text-body-sm font-medium btn-glow"
                  >
                    Book a Call
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Long-term partnerships */}
          <div className="bg-dark-card border border-border rounded-2xl p-8 max-w-prose">
            <h3 className="font-serif text-h3 font-light mb-3">Long-term partnerships</h3>
            <p className="text-body-sm text-content-secondary">
              For established practices with real revenue, I also offer revenue-share partnerships {'\u2014'} my success is tied to yours. This is by conversation, not a menu item.
            </p>
          </div>
        </div>
      </section>

      {/* What Every Partnership Includes */}
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
            I take on 3{'\u2013'}5 partnerships at a time. If your work is ready for real infrastructure, let's have a conversation.
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
