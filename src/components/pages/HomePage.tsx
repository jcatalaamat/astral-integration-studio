import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { CheckCircle } from 'lucide-react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { caseStudies } from '../../data/caseStudies';

// All case studies available for the work section

export default function HomePage() {
  useDocumentMeta({
    title: 'Astral Integration — Fractional CTO for Spiritual Leaders',
    description: 'Senior engineer and former CTO building custom digital infrastructure for schools, practices, and original work — from first platform to global scale. Long-term technical partnership.',
    ogUrl: 'https://astralintegration.studio/',
  });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormStatus('sending');
    try {
      await emailjs.send(
        'service_larviog',
        'template_7iyu04b',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: 'New Inquiry from Website',
          message: formData.message,
        },
        'v57Ta98pwBDWpoe8o'
      );
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setFormErrors({});
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg font-sans">
      <Navigation />

      {/* ═══════ HERO ═══════ */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-12 pt-32 pb-16 relative overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-[#E8D5B8] rounded-full blur-[100px] opacity-30 -top-[200px] -right-[100px] animate-float" />
        <div className="absolute w-[400px] h-[400px] bg-[#D4C4A8] rounded-full blur-[100px] opacity-25 -bottom-[100px] -left-[100px] animate-float" style={{ animationDelay: '-7s' }} />
        <div className="absolute w-[300px] h-[300px] bg-[#C8B898] rounded-full blur-[100px] opacity-15 top-[30%] left-[10%] animate-float" style={{ animationDelay: '-14s' }} />

        <h1 className="font-serif text-display font-light max-w-[900px] relative z-10 animate-fadeUp animate-delay-300">
          send me your messy notes.<br />i'll hand you back a <em className="italic gradient-text">digital business.</em>
        </h1>

        <p className="text-body text-content-secondary max-w-[640px] mt-8 relative z-10 animate-fadeUp animate-delay-500">
          a voice memo at 2am. a messy google doc. a notion page. a whatsapp forward. a screenshot of your instagram bio. that's all i need. i'll research your work, build your platform, wire your payments, set up your community &mdash; and hand you the keys.
        </p>

        <a href="/about" className="mt-8 mb-2 relative z-10 animate-fadeUp animate-delay-700 block">
          <img src="/founder.jpeg" alt="Jordi Amat" className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-border hover:border-accent transition-colors" />
        </a>

        <p className="text-body-sm text-content-muted mt-4 relative z-10 animate-fadeUp animate-delay-700">
          fractional CTO for spiritual leaders. the last technical hire you'll ever need.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-12 relative z-10 animate-fadeUp animate-delay-900">
          <a
            href="https://cal.astralintegration.studio/astral/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 bg-accent text-white rounded-full text-body-sm font-medium btn-glow"
          >
            Book a Call
          </a>
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-10 py-4 bg-transparent text-content-secondary border border-border rounded-full text-body-sm font-medium hover:border-border-hover hover:text-content-primary transition-all"
          >
            See the Work
          </a>
          <a
            href="https://portfolio.astralintegration.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 bg-transparent text-content-muted border border-border/50 rounded-full text-body-sm font-medium hover:border-border-hover hover:text-content-secondary transition-all"
          >
            170+ builds &rarr;
          </a>
        </div>
      </section>

      {/* ═══════ EMOTIONAL BRIDGE ═══════ */}
      <section className="py-section px-6 md:px-12">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <h2 className="font-serif text-display-sm font-light mb-8 max-w-[700px]">
            You changed someone's life this week.
          </h2>
          <div className="max-w-prose space-y-5">
            <p className="text-body text-content-secondary leading-relaxed">
              And then spent the weekend fighting Kajabi.
            </p>
            <p className="text-body text-content-muted leading-relaxed">
              WordPress for the site. Kajabi for courses. Acuity for bookings.<br />
              Mailchimp for emails. Stripe for payments. Eventbrite for events.<br />
              WhatsApp for everything else.<br />
              $500–800/mo in tools that don't talk to each other.
            </p>
            <p className="text-body text-content-muted leading-relaxed">
              Gaia takes 50% of your course revenue. Udemy takes 63%. Alo Moves pays a flat licensing fee while they keep the subscribers. Eventbrite takes 3.7% + $1.79 per ticket. You're building their platforms with your content.
            </p>
            <p className="text-body text-content-primary leading-relaxed font-medium">
              Your digital presence doesn't match your teaching. One person replaces 7 tools.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ QUOTE 1 ═══════ */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-content mx-auto text-center reveal" ref={addRevealRef}>
          <p className="font-serif text-display-sm font-light italic text-content-primary max-w-[800px] mx-auto">
            &ldquo;your digital presence doesn't match your teaching.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══════ 5 DOORS ═══════ */}
      <section className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#F5F4F2]">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            I Build For
          </p>
          <h2 className="font-serif text-display-sm font-light mb-4">
            Find your starting point.
          </h2>
          <p className="text-body text-content-secondary max-w-prose mb-12">
            Different work, different architecture. If you already know what you need, start here.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { label: 'practitioners', href: '/practitioners', desc: 'healers, coaches, therapists, facilitators' },
              { label: 'teachers & schools', href: '/schools', desc: 'yoga teachers, trainings, certifications' },
              { label: 'retreats & centers', href: '/retreats', desc: 'booking, intake, multi-stream revenue' },
              { label: 'makers & artists', href: '/practitioners', desc: 'musicians, craftmakers, jewelry, textiles, natural building' },
              { label: 'communities', href: '/communities', desc: 'directories, collectives, networks' },
            ].map((door) => (
              <a
                key={door.label}
                href={door.href}
                className="group bg-dark-card border border-border rounded-2xl p-6 hover:border-accent/40 hover:bg-dark-cardHover transition-all"
              >
                <p className="font-serif text-h4 group-hover:text-accent transition-colors mb-2">{door.label}</p>
                <p className="text-meta text-content-muted leading-relaxed mb-3">{door.desc}</p>
                <span className="text-meta text-accent opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1">
                  Explore <span aria-hidden="true">&rarr;</span>
                </span>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════ QUOTE 2 ═══════ */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-content mx-auto text-center reveal" ref={addRevealRef}>
          <p className="font-serif text-display-sm font-light italic text-content-primary max-w-[800px] mx-auto">
            &ldquo;you're a master at what you do. but right now you're also your own IT department, marketing team, and tech support.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══════ SOLUTION ═══════ */}
      <section className="py-section px-6 md:px-12">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            The Solution
          </p>
          <h2 className="font-serif text-display-sm font-light mb-4">
            One home. Everything connected. <em className="italic gradient-text">Nothing rented.</em>
          </h2>
          <p className="text-body text-content-secondary max-w-prose mb-12">
            Stop duct-taping seven platforms together. Get one that was built for you.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Your site', desc: 'Custom-designed, fast, SEO-ready. No templates. No page builders. No monthly Squarespace fee. A site that looks like you and loads in under a second.' },
              { title: 'Bookings + events', desc: 'Classes, workshops, retreats, trainings. Calendar sync, waitlists, payments. Zoom links auto-sent. No Acuity. No Calendly. No Eventbrite.' },
              { title: 'Community + membership', desc: "Courses, content libraries, member areas, subscriptions. Your own space — not someone else's algorithm. No Kajabi. No Teachable. No Patreon." },
              { title: 'Operations', desc: 'Email automations, CRM, analytics, payments, invoicing. Everything wired together so you can teach instead of troubleshoot.' },
            ].map((card, i) => (
              <div key={i} className="bg-dark-card border border-border rounded-2xl p-8 hover:border-accent/40 transition-all">
                <h3 className="font-serif text-h4 mb-3">{card.title}</h3>
                <p className="text-body-sm text-content-secondary">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ QUOTE 3 ═══════ */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-content mx-auto text-center reveal" ref={addRevealRef}>
          <p className="font-serif text-display-sm font-light italic text-content-primary max-w-[800px] mx-auto">
            &ldquo;building and healing are the same act.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══════ THE WORK (unified) ═══════ */}
      <section id="work" className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#F5F4F2]">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            The Work
          </p>
          <h2 className="font-serif text-display-sm font-light mb-4">Every site is a <em className="italic gradient-text">custom build.</em></h2>
          <p className="text-body text-content-secondary max-w-prose mb-16">
            No templates. No themes. Each one designed for the practitioner's specific work, brand, and audience.
          </p>

          {/* Portfolio — anonymous, show the work not the relationship */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {caseStudies.map((study) => (
              <div
                key={study.slug}
                className={`bg-dark-card border border-border rounded-2xl overflow-hidden hover:border-accent/40 transition-all group bg-gradient-to-br ${study.gradient}`}
              >
                <a href={study.url || `/work/${study.slug}`} target={study.url ? '_blank' : undefined} rel={study.url ? 'noopener noreferrer' : undefined} className="block p-6 pb-3">
                  <p className="text-meta text-accent mb-2">{study.category}</p>
                  <h3 className="font-serif text-h4 font-light group-hover:text-accent transition-colors">{study.type}</h3>
                  <p className="text-body-sm text-content-secondary mt-3 leading-relaxed line-clamp-2">{study.challenge}</p>
                </a>
                <div className="px-6 pb-5">
                  {study.url && (
                    <a href={study.url} target="_blank" rel="noopener noreferrer" className="text-body-sm text-content-muted hover:text-accent transition-colors inline-flex items-center gap-1">
                      {new URL(study.url).hostname} <span aria-hidden="true">&rarr;</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="/work" className="text-body-sm text-accent hover:text-content-primary transition-colors inline-flex items-center gap-2">
              Full portfolio <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════ QUOTE ═══════ */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-content mx-auto text-center reveal" ref={addRevealRef}>
          <p className="font-serif text-display-sm font-light italic text-content-primary max-w-[800px] mx-auto">
            &ldquo;not a freelancer who disappears. not an agency that bills by the hour. a partner who stays.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS (summary) ═══════ */}
      <section id="how" className="py-section px-6 md:px-12">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            How It Works
          </p>
          <h2 className="font-serif text-display-sm font-light mb-4">
            Long-term partnership. Aligned from day one.
          </h2>
          <p className="text-body text-content-secondary max-w-prose mb-12">
            I don't pitch. I build it first and send you the link. Not a freelancer who disappears. Not an agency that bills by the hour. A partner who stays.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { step: '01', title: 'You send me the mess.', desc: "A voice memo. A google doc. A screenshot of your instagram. Your Linktree. Whatever you have. I'll take it from there — I'll research your work, study your audience, and map out what you actually need." },
              { step: '02', title: 'I build it before we talk.', desc: "No proposals. No wireframes. No 'discovery phase.' I build a working version of your platform and send you the link. You see it live. You feel it. Then we talk." },
              { step: '03', title: 'You get the keys.', desc: "Your site, your domain, your data, your code. Everything is yours from day one. I stay as your technical partner for as long as you want — but you're never locked in." },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-body-sm font-medium flex-shrink-0 ${
                    i === 2 ? 'bg-accent text-white' : 'bg-dark-card border border-border text-content-muted'
                  }`}>
                    {item.step}
                  </div>
                </div>
                <div className={`bg-dark-card border rounded-xl p-6 ${i === 2 ? 'border-accent/30' : 'border-border'}`}>
                  <h4 className="font-serif text-h4 mb-3">{item.title}</h4>
                  <p className="text-body-sm text-content-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Growing (5-30K)', value: '$50–300/mo' },
              { label: 'Established (30-80K)', value: '$300–500/mo' },
              { label: 'Legacy (80K+)', value: 'Rev share' },
            ].map((item, i) => (
              <div key={i} className="text-center md:text-left">
                <p className="text-meta uppercase text-content-muted mb-1">{item.label}</p>
                <p className="font-serif text-h2 font-light text-accent">{item.value}</p>
              </div>
            ))}
          </div>

          <p className="text-body-sm text-content-muted mb-2">You own everything. Code, data, domain. From day one.</p>
          <p className="text-body-sm text-content-muted mb-2">I stay on as your technical partner. My success is tied to yours.</p>
          <p className="text-body-sm text-content-muted mb-6 italic">Some people call this a fractional CTO. I just call it partnership.</p>

          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <a
              href="/pricing"
              className="text-body-sm text-accent hover:text-content-primary transition-colors inline-flex items-center gap-2"
            >
              Full pricing & FAQ <span aria-hidden="true">&rarr;</span>
            </a>
            <span className="hidden sm:inline text-content-muted">·</span>
            <a
              href="https://cal.astralintegration.studio/astral/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="text-body-sm text-accent hover:text-content-primary transition-colors inline-flex items-center gap-2"
            >
              Book a call <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════ QUOTE 6 ═══════ */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-content mx-auto text-center reveal" ref={addRevealRef}>
          <p className="font-serif text-display-sm font-light italic text-content-primary max-w-[800px] mx-auto">
            &ldquo;one person replaces 7 tools.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══════ WHY ME ═══════ */}
      <section className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#F5F4F2]">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <h2 className="font-serif text-display-sm font-light mb-4">
            I'm the last technical hire <em className="italic gradient-text">you'll ever need.</em>
          </h2>
          <p className="text-body text-content-secondary max-w-prose mb-12">
            not a freelancer who disappears. not an agency that bills by the hour. a partner who stays.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'One person replaces 7 tools', desc: 'Site, bookings, events, courses, community, email, payments. One person builds it, connects it, and maintains it.' },
              { title: 'AI-native', desc: 'I build with AI, not around it. Your platform gets smarter automations, better content tools, and workflows that would take an agency weeks — done in hours.' },
              { title: 'You own everything', desc: 'Your code, your data, your domain. From day one. If you ever want to leave, you take it all with you. No lock-in. Ever.' },
              { title: 'Decades, not projects', desc: "I don't do handoffs. I stay as your technical partner for as long as you want. Your platform evolves with your teaching." },
            ].map((card, i) => (
              <div key={i} className="bg-dark-card border border-border rounded-2xl p-8 hover:border-accent/40 transition-all">
                <h3 className="font-serif text-h4 mb-3 text-accent">{card.title}</h3>
                <p className="text-body-sm text-content-secondary">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ QUOTE 7 ═══════ */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-content mx-auto text-center reveal" ref={addRevealRef}>
          <p className="font-serif text-display-sm font-light italic text-content-primary max-w-[800px] mx-auto">
            &ldquo;my success is tied to yours. that's not a line &mdash; it's the business model.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="py-section px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "Jordi built our entire platform in days. what would have taken months with an agency, he delivered in a weekend. and it was better than anything we'd seen.", name: 'Manoela', role: 'yoga teacher + retreat leader' },
              { quote: "i sent him a voice memo and a few screenshots. 48 hours later i had a full website, booking system, and payment processing. i still don't understand how.", name: 'Hector', role: 'healer + facilitator' },
              { quote: "he doesn't just build tech. he understands the work. he gets what practitioners need because he lives in that world. that's rare and it shows in everything he builds.", name: 'David', role: 'coach + therapist' },
            ].map((t, i) => (
              <div key={i} className="bg-dark-card border border-border rounded-2xl p-8 reveal" ref={addRevealRef}>
                <p className="font-serif text-h4 font-light text-content-primary leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-body-sm text-accent font-medium">{t.name}</p>
                <p className="text-meta text-content-muted">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ QUOTE 8 ═══════ */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-content mx-auto text-center reveal" ref={addRevealRef}>
          <p className="font-serif text-display-sm font-light italic text-content-primary max-w-[800px] mx-auto">
            &ldquo;they were never separate processes. building and healing are the same service, listening on different ports.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-section px-6 md:px-12 bg-gradient-to-b from-[#F5F4F2] to-dark-bg">
        <div className="max-w-content mx-auto text-center reveal" ref={addRevealRef}>
          <h2 className="font-serif text-display-sm font-light mb-4">Ready to stop duct-taping?</h2>
          <p className="text-body text-content-secondary mb-10">Send me the mess. I'll hand you back a business.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="https://cal.astralintegration.studio/astral/discovery-call" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-accent text-white rounded-full text-body-sm font-medium btn-glow">book a discovery call</a>
            <a href="https://wa.me/34611144170" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-transparent text-content-secondary border border-border rounded-full text-body-sm font-medium hover:border-border-hover hover:text-content-primary transition-all">WhatsApp</a>
          </div>
        </div>
      </section>

      {/* ═══════ ABOUT ═══════ */}
      <section id="about" className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#F5F4F2]">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <div className="grid md:grid-cols-[320px_1fr] gap-12 items-start">
            <div className="space-y-4">
              <div className="rounded-2xl border border-border relative overflow-hidden">
                <img src="/founder.jpeg" alt="Jordi Amat" className="w-full aspect-[3/4] object-cover" loading="lazy" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden border border-border">
                  <img src="/family-01.jpg" alt="Life in Mazunte" className="w-full aspect-square object-cover" loading="lazy" />
                </div>
                <div className="rounded-xl overflow-hidden border border-border">
                  <img src="/family-02.jpg" alt="Life in Mazunte" className="w-full aspect-square object-cover" loading="lazy" />
                </div>
              </div>
            </div>

            <div>
              <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
                <span className="w-8 h-px bg-accent" />
                About
              </p>
              <h2 className="font-serif text-display-sm font-light mb-6">Jordi Amat.</h2>
              <div className="space-y-4">
                <p className="text-body text-content-secondary leading-relaxed">
                  Senior full-stack engineer. Former CTO. Access Bars practitioner. I spent a decade building production systems and leading engineering teams. Then I moved to Mazunte, Oaxaca &mdash; a small village on the Pacific coast of Mexico &mdash; and started building for the people doing the most original work in education, healing, and community.
                </p>
                <p className="text-body text-content-secondary leading-relaxed">
                  170+ sites shipped. I work with AI tools that let me move at a speed that used to require a team. And I charge a fraction of what an agency would because my overhead is a hammock and a satellite dish.
                </p>
                <p className="text-body text-content-muted leading-relaxed italic">
                  I don't do sales calls. I don't send proposals. I find people whose work I respect, I build them something real, and I send them the link. If they like it, we work together. If not, they keep the build anyway.
                </p>
              </div>
              <a
                href="/about"
                className="text-body-sm text-accent hover:text-content-primary transition-colors inline-flex items-center gap-2 mt-6"
              >
                Full story <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section id="contact" className="py-section px-6 md:px-12 bg-dark-card">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <div className="max-w-prose">
            <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-accent" />
              Get in Touch
            </p>
            <h2 className="font-serif text-display-sm font-light mb-4">Tell me about your work.</h2>
            <p className="text-body-sm text-content-muted mb-10">
              No pitch. No pressure. Just a conversation about what you need and whether I can help.
            </p>

            {formStatus !== 'success' ? (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-body-sm text-content-muted mb-3">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-5 py-4 bg-dark-bg border rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors ${
                      formErrors.name ? 'border-red-400 focus:ring-red-400/20' : 'border-border'
                    }`}
                    placeholder="Your name"
                  />
                  {formErrors.name && <p className="mt-2 text-body-sm text-red-400">{formErrors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-body-sm text-content-muted mb-3">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-5 py-4 bg-dark-bg border rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors ${
                      formErrors.email ? 'border-red-400 focus:ring-red-400/20' : 'border-border'
                    }`}
                    placeholder="your@email.com"
                  />
                  {formErrors.email && <p className="mt-2 text-body-sm text-red-400">{formErrors.email}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-body-sm text-content-muted mb-3">What are you working on?</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className={`w-full px-5 py-4 bg-dark-bg border rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors resize-none ${
                      formErrors.message ? 'border-red-400 focus:ring-red-400/20' : 'border-border'
                    }`}
                    placeholder="Tell me about your work, your people, and what you're trying to build..."
                  />
                  {formErrors.message && <p className="mt-2 text-body-sm text-red-400">{formErrors.message}</p>}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="px-10 py-4 bg-accent text-white rounded-full text-body-sm font-medium btn-glow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'sending' ? 'Sending...' : formStatus === 'error' ? 'Error - try again' : 'Send Message'}
                  </button>
                  <span className="text-content-muted text-body-sm">or</span>
                  <a
                    href="https://cal.astralintegration.studio/astral/discovery-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-sm text-accent hover:text-content-primary transition-colors inline-flex items-center gap-2"
                  >
                    Book a call directly <span aria-hidden="true">&rarr;</span>
                  </a>
                  <span className="hidden sm:inline text-content-muted">·</span>
                  <a
                    href="https://wa.me/34611144170"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-sm text-accent hover:text-content-primary transition-colors inline-flex items-center gap-2"
                  >
                    WhatsApp <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </form>
            ) : (
              <div className="py-16 text-center">
                <CheckCircle className="w-12 h-12 text-accent mx-auto mb-6" />
                <h3 className="font-serif text-h2 mb-4">Message received.</h3>
                <p className="text-body text-content-secondary mb-3">I'll get back to you within 24–48 hours.</p>
                <p className="text-body-sm text-content-muted mb-8">Check your inbox for a reply from hello@astralintegration.studio</p>
                <button onClick={() => setFormStatus('idle')} className="text-body-sm text-accent hover:underline">
                  Send another message
                </button>
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row gap-6 sm:items-center">
              <p className="text-body-sm text-content-muted">hello@astralintegration.studio</p>
              <a
                href="/contact"
                className="text-body-sm text-accent hover:text-content-primary transition-colors inline-flex items-center gap-2"
              >
                Full contact page with Calendly <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
