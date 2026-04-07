import { useEffect, useRef } from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';

export default function AboutPage() {
  useDocumentMeta({
    title: 'About Jordi Amat — Astral Integration',
    description: 'Senior engineer, former CTO, practitioner. From leading engineering teams to building custom digital infrastructure for schools, practices, and original work — from Mazunte, Oaxaca.',
    ogUrl: 'https://astralintegration.studio/about',
  });

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
            About
          </p>
          <h1 className="font-serif text-display font-light mb-8 max-w-[800px]">
            Jordi Amat.
          </h1>
          <p className="text-body text-content-secondary max-w-prose">
            Senior full-stack engineer. Former CTO. Practitioner. Based in Mazunte, a small town on the coast of Oaxaca, Mexico.
          </p>
        </div>
      </section>

      {/* Photo + Short Bio */}
      <section className="pb-section px-6 md:px-12">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <div className="grid md:grid-cols-[320px_1fr] gap-12 md:gap-16 items-start">
            <div className="w-full md:w-[320px] h-[400px] rounded-2xl border border-border relative overflow-hidden">
              <img
                src="/founder.jpeg"
                alt="Jordi Amat"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent" />
            </div>

            <div className="space-y-5">
              <p className="text-body text-content-secondary leading-relaxed">
                I spent over a decade leading engineering teams, making architecture decisions, and shipping platforms from zero to scale. Then I stepped into a different world — ceremony spaces, healing practices, teaching lineages, land-based communities. Not as a visitor. As a participant.
              </p>
              <p className="text-body text-content-secondary leading-relaxed">
                What I found is that the people doing the most serious work in education, wellness, and community are either running their digital lives on tools that were never designed for them — or they have no digital infrastructure at all. A certification program crammed into Teachable. A facilitator with a global following and no system to hold it. A retreat center whose online presence doesn't begin to reflect what happens in the room.
              </p>
              <p className="text-body text-content-primary leading-relaxed font-medium">
                I understand this world because I live in it. I build from the inside.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roots */}
      <section className="py-section px-6 md:px-12">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            Roots
          </p>
          <h2 className="font-serif text-display-sm font-light mb-12">
            Family is the reason I build the way I do.
          </h2>

          <div className="grid md:grid-cols-[1fr_380px] gap-12 items-start">
            <div className="space-y-5">
              <p className="text-body text-content-secondary leading-relaxed">
                I live in Mazunte with Nina and our two kids. This isn't a digital nomad chapter — it's home. We chose this place because of the community, the land, and the kind of life we want our children to grow up in.
              </p>
              <p className="text-body text-content-secondary leading-relaxed">
                Building from here means I understand what it takes to create real work in a real place — not from a WeWork, but from the same world my clients inhabit. The pace, the values, the priorities. It shapes everything I build.
              </p>
            </div>

            <div className="rounded-2xl border border-border overflow-hidden relative">
              <img
                src="/family-01.jpg"
                alt="Jordi with his family in Mazunte"
                className="w-full h-[380px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* The Journey */}
      <section className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#F5F4F2]">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            The Journey
          </p>
          <h2 className="font-serif text-display-sm font-light mb-12">
            London. Barcelona. Mexico City. Mazunte.
          </h2>

          <div className="max-w-prose space-y-5">
            <p className="text-body text-content-secondary leading-relaxed">
              I started in London, then Barcelona — building fintech platforms, leading engineering teams, scaling startups. I spent years as CTO — hiring engineers, designing systems, shipping product. I was good at it. But the work I was doing didn't match the life I was building.
            </p>
            <p className="text-body text-content-secondary leading-relaxed">
              Somewhere along the way, ceremony found me. That changed the trajectory. I started sitting with medicine, working with facilitators, attending trainings — spending time in communities doing the real work of holding space for people to heal, grow, and transform.
            </p>
            <p className="text-body text-content-secondary leading-relaxed">
              Mexico City came next — a bridge between the tech world I knew and the practitioner world I was becoming part of.
            </p>
            <p className="text-body text-content-secondary leading-relaxed">
              I ended up in Mazunte — a small village on the Oaxacan coast where half the town is practitioners, facilitators, artists, and builders of alternative schools and projects. And I saw the same pattern everywhere: brilliant people running powerful work on scattered tools that were never built for them.
            </p>
            <p className="text-body text-content-secondary leading-relaxed">
              A Reiki Master Teacher with 300 students tracking everything in Google Sheets. A retreat center with five revenue streams managed on WhatsApp. A community with no digital home except Facebook groups. A touring facilitator juggling eight different ticketing platforms.
            </p>
            <p className="text-body text-content-secondary leading-relaxed">
              I knew how to build the systems these people needed. And I understood — from the inside — why generic platforms would never work for them. A certification isn't a Udemy course. A retreat isn't a hotel booking. A healing practice isn't a SaaS business. The architecture has to reflect the work.
            </p>
            <p className="text-body text-content-primary leading-relaxed font-medium">
              Astral Integration is what happened when a decade of engineering met a life lived inside the work it serves.
            </p>
          </div>
        </div>
      </section>

      {/* Practitioner Side */}
      <section className="py-section px-6 md:px-12">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            The Practitioner Side
          </p>
          <h2 className="font-serif text-display-sm font-light mb-12">
            I don't just build for this world. I practice in it.
          </h2>

          <div className="grid md:grid-cols-[1fr_1fr] gap-12 items-start">
            <div className="space-y-5">
              <p className="text-body text-content-secondary leading-relaxed">
                I've trained in multiple modalities — Access Bars, Theta Healing, Reiki, Gene Keys, Family Constellations, Ashtanga, Vinyasa, Yin, Kundalini, transpersonal work, psychedelic integration, ceremony, holding space — not because I planned to build platforms for practitioners, but because the work called. Each training changed how I understand what practitioners actually need from their infrastructure.
              </p>
              <p className="text-body text-content-secondary leading-relaxed">
                When I build a booking flow for a healer, I know why the intake matters. When I design a certification system, I understand what progression feels like from the student's side. When I build a community platform, I know what containers are — not just "forums with premium access."
              </p>
              <p className="text-body text-content-secondary leading-relaxed">
                This isn't marketing positioning. I sit in circles. I attend trainings. I run sessions. I know the difference between a modality and a product because I've experienced both.
              </p>
            </div>

            <div className="bg-dark-card border border-border rounded-2xl p-8">
              <h3 className="font-serif text-h3 mb-6">Why it matters for your platform</h3>
              <ul className="space-y-4">
                {[
                  'I understand practitioner-client relationships, not just user-customer funnels',
                  'I know why a retreat booking is not a hotel reservation',
                  'I build certification systems that reflect how learning actually happens in embodied work',
                  'I design intake flows that honor the gravity of the offering',
                  'I won\'t reduce your methodology to a "content library"',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-body-sm text-content-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Credentials */}
      <section className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#F5F4F2]">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            Technical Background
          </p>
          <h2 className="font-serif text-display-sm font-light mb-12">
            The engineering behind the partnership.
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-dark-card border border-border rounded-2xl p-8">
              <h3 className="font-serif text-h3 mb-4">Experience</h3>
              <ul className="space-y-3">
                {[
                  'Former CTO — built and led engineering teams from founding to scale',
                  '10+ years shipping production software across fintech, SaaS, and now practitioner platforms',
                  'Full-stack: React, TypeScript, Node.js, PostgreSQL, cloud infrastructure',
                  'AI-augmented development — I deliver at the speed of a team with the consistency of a single technical vision',
                  'Architecture-first approach: every decision is structural, not decorative',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-body-sm text-content-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-dark-card border border-border rounded-2xl p-8">
              <h3 className="font-serif text-h3 mb-4">What I build</h3>
              <ul className="space-y-3">
                {[
                  'Custom platforms — not templates, not WordPress, not page builders',
                  'Certification & progression systems with prerequisite logic',
                  'Multi-stream booking and intake infrastructure',
                  'Membership portals with gated content and community',
                  'AI assistants trained on your specific methodology',
                  'Multi-language, multi-region platforms for global organizations',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-body-sm text-content-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border">
            {[
              { value: '10+', label: 'Years shipping software' },
              { value: '8', label: 'Platforms built' },
              { value: '2–6 wk', label: 'Average delivery' },
              { value: 'Mazunte', label: 'Oaxaca, Mexico' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-serif text-h2 font-light text-accent mb-1">{stat.value}</div>
                <p className="text-body-sm text-content-muted">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-6 mt-10">
            <a
              href="https://www.linkedin.com/in/jcamat/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-body-sm text-content-muted hover:text-accent transition-colors"
            >
              <span className="w-7 h-7 rounded border border-border flex items-center justify-center text-[0.6rem] font-mono uppercase">in</span>
              LinkedIn
            </a>
            <a
              href="https://github.com/jcatalaamat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-body-sm text-content-muted hover:text-accent transition-colors"
            >
              <span className="w-7 h-7 rounded border border-border flex items-center justify-center text-[0.6rem] font-mono uppercase">gh</span>
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section px-6 md:px-12 bg-dark-card">
        <div className="max-w-content mx-auto text-center reveal" ref={addRevealRef}>
          <h2 className="font-serif text-display-sm font-light mb-6">
            Let's talk about your work.
          </h2>
          <p className="text-body text-content-secondary max-w-prose mx-auto mb-10">
            I take on a small number of partnerships at a time. If you've created something original and need a technical partner who builds with you for the long haul, I'd like to hear about it.
          </p>
          <a
            href="/contact"
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
