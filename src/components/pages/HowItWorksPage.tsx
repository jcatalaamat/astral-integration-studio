import { useEffect, useRef, useState } from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';

const process = [
  {
    step: '01',
    title: 'You send me the mess.',
    desc: 'A voice memo. A google doc. A linktree. Your instagram bio. Whatever you have. I take it from there — I research your work, study your audience, and sketch what your digital home should be.',
    details: [
      'Send me whatever you have — a voice memo, a google doc, a screenshot of your instagram',
      'I research your work, your audience, and your space',
      'I sketch what your digital home should look like',
      'No forms. No intake calls. Just send me the mess.',
    ],
  },
  {
    step: '02',
    title: 'I build it before we talk. For real.',
    desc: 'No proposals. No discovery calls. No wireframes. 48 hours later you get a link to your actual platform — your photos, your copy, your bookings, your brand. Live. Working. Yours to click around. If you don\'t love it, you keep the link as a gift.',
    details: [
      'No proposals. No wireframes. No discovery phase.',
      '48 hours later you get a link to your actual platform',
      'Your photos, your copy, your bookings, your brand — live and working',
      'If you don\'t love it, you keep the link as a gift',
    ],
  },
  {
    step: '03',
    title: 'If you love it, pick your door.',
    desc: '$147/mo ongoing. $2,500 once. Or rev share as partners. You pick. We go live in 48 hours.',
    details: [
      'Door 1: Pay as you grow — from $147/mo, no upfront cost',
      'Door 2: Pay once — from $2,500, own it outright',
      'Door 3: Partner up — 5–8% rev share for the right fit',
      'You own everything either way. Code, data, domain. From day one.',
    ],
  },
];

const investment = [
  { label: 'Pay as you grow', value: '$147–597/mo', note: 'No upfront cost. 12-month minimum.' },
  { label: 'Pay once', value: '$2,500–12,000', note: 'One payment. Own it outright.' },
  { label: 'Partner up', value: '5–8% rev share', note: 'For centers and orgs with real revenue.' },
  { label: 'Ownership', value: 'Yours. All of it.', note: 'Code, data, domain. From day one.' },
];

const faqs = [
  {
    q: 'How is pricing determined?',
    a: 'Three doors. Door 1: pay monthly, no upfront cost ($147–597/mo depending on scope). Door 2: pay once and own it outright ($2,500–12,000). Door 3: revenue share for organizations with real revenue (5–8%). I\'ll recommend the right fit after I see your work.',
  },
  {
    q: 'What\'s the difference between Door 1 and Door 2?',
    a: 'Same build quality, same platform. Door 1 spreads the cost over time with no upfront payment — 12-month minimum, then month-to-month. Door 2 is a single payment and you own it outright. Optional hosting after if you want it.',
  },
  {
    q: 'Do I own the code and data?',
    a: 'Yes. From day one. Every door. Your code, your data, your domain, your content. Everything is yours. If our partnership ends tomorrow, you walk away with everything.',
  },
  {
    q: 'What platform or tech stack do you use?',
    a: 'Every project is custom-built with modern web technologies — typically React, TypeScript, and Node.js with the specific architecture shaped by what the work needs. No WordPress. No Squarespace. No templates. Real code, built for your specific requirements.',
  },
  {
    q: 'How long does it take?',
    a: 'You get a working link in 48 hours. Full platform launch in 1–4 weeks depending on scope.',
  },
  {
    q: 'What happens after launch?',
    a: 'On Door 1, I stay as your technical partner — maintenance, updates, new features. On Door 2, hosting is optional ($50–150/mo) or you self-host. On Door 3, I\'m your fractional CTO for the long haul.',
  },
  {
    q: 'How is this different from hiring a web developer?',
    a: 'A developer builds what you spec and leaves. I learn your work, build before we even talk, and stay as a long-term partner. I\'m not filling tickets — I\'m building the infrastructure that allows your work to scale without fragmentation.',
  },
];

export default function HowItWorksPage() {
  useDocumentMeta({
    title: 'How It Works — Astral Integration',
    description: 'The partnership model: how I build, what it costs, and how the long-term relationship works. Pricing, process, and frequently asked questions.',
    ogUrl: 'https://astralintegration.studio/how-it-works',
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
            How It Works
          </p>
          <h1 className="font-serif text-display font-light mb-8 max-w-[800px]">
            Long-term partnership.<br />Aligned from <em className="italic gradient-text">day one.</em>
          </h1>
          <p className="text-body text-content-secondary max-w-prose">
            I don't build and disappear. I build, maintain, and evolve your platform over years — because I'm invested in its success and structurally committed to its growth.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#F5F4F2]">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            The Process
          </p>
          <h2 className="font-serif text-display-sm font-light mb-16">
            Three phases. One partnership.
          </h2>

          <div className="space-y-8">
            {process.map((item, i) => (
              <div key={i} className={`bg-dark-card border rounded-2xl p-8 md:p-10 ${i === 2 ? 'border-accent/30' : 'border-border'}`}>
                <div className="flex items-start gap-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-body-sm font-medium flex-shrink-0 ${
                    i === 2 ? 'bg-accent text-white' : 'bg-dark-bg border border-border text-content-muted'
                  }`}>
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-h2 font-light mb-3">{item.title}</h3>
                    <p className="text-body text-content-secondary mb-6">{item.desc}</p>
                    <ul className="space-y-3">
                      {item.details.map((detail, j) => (
                        <li key={j} className="flex items-start gap-3 text-body-sm text-content-muted">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Investment */}
      <section className="py-section px-6 md:px-12">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            The Investment
          </p>
          <h2 className="font-serif text-display-sm font-light mb-4">
            The model.
          </h2>
          <p className="text-body text-content-secondary max-w-prose mb-16">
            Every project is different — a practitioner launching her first platform needs different architecture than a school with 300 students across 9 certification levels. I scope and price based on what the work actually requires, not a menu.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-3xl">
            {investment.map((item, i) => (
              <div key={i} className="bg-dark-card border border-border rounded-2xl p-8">
                <p className="text-meta uppercase text-content-muted mb-2">{item.label}</p>
                <p className="font-serif text-h2 font-light text-accent mb-2">{item.value}</p>
                <p className="text-body-sm text-content-muted">{item.note}</p>
              </div>
            ))}
          </div>

          <div className="max-w-prose">
            <p className="text-body text-content-secondary leading-relaxed mb-4">
              My pricing is structured so my success is tied to yours. I don't build and disappear — I remain your technical partner, maintaining and evolving the platform as your work grows.
            </p>
            <p className="text-body-sm text-content-muted">
              Start with a conversation — I'll learn about your work and send a clear proposal with no surprises.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#F5F4F2]">
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
            No pitch. No pressure. Tell me about your work and let's figure out if this is the right fit.
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
