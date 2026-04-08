import { useState, useEffect, useRef } from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';

const doors = [
  {
    name: 'Pay as you grow',
    tag: 'Door 1',
    desc: "No upfront cost. I build it, deploy it, and stay on as your technical partner. Cancel anytime after 12 months.",
    rows: [
      { tier: 'Practitioner', price: '$147/mo' },
      { tier: 'Studio / School', price: '$297/mo' },
      { tier: 'Center / Organization', price: '$597/mo' },
    ],
    footer: '12-month minimum. After that, month-to-month forever.',
    highlight: true,
  },
  {
    name: 'Pay once',
    tag: 'Door 2',
    desc: "One payment. Own it outright. Optional hosting after, or self-host \u2014 your code, your call.",
    rows: [
      { tier: 'Practitioner', price: '$2,500' },
      { tier: 'Studio / School', price: '$5,500' },
      { tier: 'Center / Organization', price: '$12,000' },
    ],
    footer: 'Optional hosting: $50\u2013150/mo. Or host it yourself.',
    highlight: false,
  },
  {
    name: 'Partner up',
    tag: 'Door 3',
    desc: "Revenue share. I become your fractional CTO. For retreat centers, schools, and organizations with real revenue.",
    rows: [
      { tier: 'Revenue share', price: '5\u20138%' },
    ],
    footer: 'Long-term partnership. Aligned incentives. I grow when you grow.',
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
    a: 'Door 1 (Pay as you grow) is designed exactly for this. No upfront cost \u2014 $147/mo for a practitioner. I build it, deploy it, and stay on. You cancel anytime after 12 months.',
  },
  {
    q: 'Can I switch doors later?',
    a: "Yes. Start with monthly, then buy it out when you're ready. Or start with a one-time payment and add ongoing support later. The platform is yours either way.",
  },
  {
    q: "What's the difference between Door 1 and Door 2?",
    a: 'Door 1 spreads the cost over time with no upfront payment. Door 2 is a single payment \u2014 you own it outright immediately. Both get the same build quality and the same platform.',
  },
  {
    q: 'What does the rev share model (Door 3) look like?',
    a: "I become your fractional CTO. 5\u20138% of revenue processed through the platform. It's for organizations with real revenue \u2014 retreat centers, schools, training programs. Aligned incentives: I grow when you grow.",
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
    description: 'Three ways to work together. Pay as you grow, pay once, or partner up. You own everything from day one.',
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
            Three ways to work together. <em className="italic gradient-text">You pick.</em>
          </h1>
          <p className="text-body text-content-secondary max-w-prose">
            You own everything either way. Code, data, domain. From day one. No lock-in. Ever.
          </p>
        </div>
      </section>

      {/* Doors */}
      <section className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#F5F4F2]">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {doors.map((door, i) => (
              <div
                key={i}
                className={`bg-dark-card border rounded-2xl p-8 flex flex-col ${
                  door.highlight ? 'border-accent/40 ring-1 ring-accent/20' : 'border-border'
                }`}
              >
                <p className="text-meta uppercase text-accent mb-2">{door.tag}</p>
                <h3 className="font-serif text-h2 font-light mb-3">{door.name}</h3>
                <p className="text-body-sm text-content-muted mb-8">{door.desc}</p>

                <div className="space-y-3 mb-8">
                  {door.rows.map((row, j) => (
                    <div key={j} className="flex items-center justify-between">
                      <p className="text-body-sm text-content-secondary">{row.tier}</p>
                      <p className="font-serif text-h4 font-light text-accent">{row.price}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-border flex-1">
                  <p className="text-body-sm text-content-muted">{door.footer}</p>
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
