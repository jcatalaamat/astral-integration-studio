import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { CheckCircle } from 'lucide-react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { caseStudies } from '../../data/caseStudies';

// Show 4 featured case studies on homepage
const featured = caseStudies.slice(0, 4);

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

        <p className="text-body-sm text-content-muted mt-6 relative z-10 animate-fadeUp animate-delay-700">
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
              and then spent the weekend fighting Kajabi.
            </p>
            <p className="text-body text-content-muted leading-relaxed">
              WordPress for the site. Kajabi for courses. Acuity for bookings.<br />
              Mailchimp for emails. Stripe for payments. Eventbrite for events.<br />
              WhatsApp for everything else.<br />
              $500–800/mo in tools that don't talk to each other.
            </p>
            <p className="text-body text-content-muted leading-relaxed">
              Gaia takes 50% of your course revenue. Udemy takes 63%. Alo Moves pays a flat licensing fee while they keep the subscribers. Eventbrite takes 3.7% + $1.79 per ticket. you're building their platforms with your content.
            </p>
            <p className="text-body text-content-primary leading-relaxed font-medium">
              your digital presence doesn't match your teaching. one person replaces 7 tools.
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
              { label: 'Practitioners', href: '/practitioners', desc: 'Healers, yoga teachers, energy workers' },
              { label: 'Schools', href: '/schools', desc: 'Teacher trainings, certification programs' },
              { label: 'Retreats', href: '/retreats', desc: 'Booking, intake, and multi-stream revenue' },
              { label: 'Musicians', href: '/practitioners', desc: 'Albums, tours, merch, community' },
              { label: 'Communities', href: '/communities', desc: 'Directories, events, local platforms' },
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

          <div className="flex flex-wrap gap-3 mt-12 justify-center reveal" ref={addRevealRef}>
            {['practitioners', 'yoga teachers', 'healers', 'retreat centers', 'training schools', 'communities', 'musicians', 'artists', 'coaches', 'therapists'].map(tag => (
              <span key={tag} className="px-4 py-2 rounded-full border border-border text-body-sm text-content-muted hover:border-accent/40 hover:text-accent transition-all">
                {tag}
              </span>
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
            one home. everything connected. <em className="italic gradient-text">nothing rented.</em>
          </h2>
          <p className="text-body text-content-secondary max-w-prose mb-12">
            stop duct-taping seven platforms together. get one that was built for you.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'your site', desc: 'custom-designed, fast, SEO-ready. no templates. no page builders. no monthly Squarespace fee. a site that looks like you and loads in under a second.' },
              { title: 'bookings + events', desc: 'classes, workshops, retreats, trainings. calendar sync, waitlists, payments. Zoom links auto-sent. no Acuity. no Calendly. no Eventbrite.' },
              { title: 'community + membership', desc: "courses, content libraries, member areas, subscriptions. your own space — not someone else's algorithm. no Kajabi. no Teachable. no Patreon." },
              { title: 'operations', desc: 'email automations, CRM, analytics, payments, invoicing. everything wired together so you can teach instead of troubleshoot.' },
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

      {/* ═══════ FEATURED WORK ═══════ */}
      <section id="work" className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#F5F4F2]">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            The Work
          </p>
          <h2 className="font-serif text-display-sm font-light mb-4">Selected builds.</h2>
          <p className="text-body text-content-secondary max-w-prose mb-16">
            Different problems, different architectures. Same principle: original work, custom infrastructure, long-term partnership.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((study) => (
              <div
                key={study.slug}
                className="bg-dark-card border border-border rounded-2xl overflow-hidden hover:border-accent/40 transition-all group"
              >
                <a href={`/work/${study.slug}`} className="block">
                  <div className={`w-full border-b border-border bg-gradient-to-br ${study.gradient} p-6`}>
                    <h3 className="font-serif text-h3 font-light group-hover:text-accent transition-colors">{study.client}</h3>
                    <p className="text-meta uppercase text-gold mt-1">{study.type}</p>
                  </div>
                  <div className="p-6 pb-3">
                    <p className="text-body-sm text-content-secondary leading-relaxed line-clamp-3">{study.challenge}</p>
                  </div>
                </a>
                <div className="px-6 pb-5 flex items-center gap-4">
                  <a href={`/work/${study.slug}`} className="text-body-sm text-accent hover:text-content-primary transition-colors inline-flex items-center gap-1">
                    Case study <span aria-hidden="true">&rarr;</span>
                  </a>
                  {study.url ? (
                    <a
                      href={study.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body-sm text-content-muted hover:text-accent transition-colors inline-flex items-center gap-1"
                    >
                      Visit site <span aria-hidden="true">&rarr;</span>
                    </a>
                  ) : study.status === 'In progress' ? (
                    <span className="text-meta uppercase text-content-muted">Private portal</span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="/work"
              className="text-body-sm text-accent hover:text-content-primary transition-colors inline-flex items-center gap-2"
            >
              All {caseStudies.length} case studies <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════ QUOTE 4 ═══════ */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-content mx-auto text-center reveal" ref={addRevealRef}>
          <p className="font-serif text-display-sm font-light italic text-content-primary max-w-[800px] mx-auto">
            &ldquo;not a freelancer who disappears. not an agency that bills by the hour. a partner who stays.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══════ CLIENT SHOWCASE ═══════ */}
      <section className="py-section px-6 md:px-12">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            Built & Live
          </p>
          <h2 className="font-serif text-display-sm font-light mb-4">
            every site is a <em className="italic gradient-text">custom build.</em>
          </h2>
          <p className="text-body text-content-secondary max-w-prose mb-12">
            no templates. no themes. each one designed for the practitioner's specific work, brand, and audience.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Jugat Guru', role: 'CEO of KRI. global kundalini yoga leadership. practice portal + landing page.', tag: '49K, kundalini yoga', url: 'https://jugatguru.xyz', gradient: 'from-amber-900/20 to-transparent' },
              { name: 'Gurmukh', role: 'legendary kundalini teacher. golden bridge yoga. international retreats + trainings.', tag: '66K, yoga legend', url: 'https://gurmukh.xyz', gradient: 'from-rose-900/20 to-transparent' },
              { name: 'Deva Premal + Miten', role: 'sacred music icons. world tours, mantra albums, online concerts + community.', tag: '227K, sacred music', url: 'https://devapremalmiten.xyz', gradient: 'from-orange-900/20 to-transparent' },
              { name: 'Skylar Acamesis', role: 'medical intuitive + energy healer. private sessions + masterminds.', tag: '7.8K, energy healing', url: 'https://skylaracamesis.xyz', gradient: 'from-violet-900/20 to-transparent' },
              { name: 'El Arte de Renacer', role: 'rebirthing + breathwork school. teacher trainings across latin america.', tag: '39K, rebirthing', url: 'https://elartederenacer.xyz', gradient: 'from-teal-900/20 to-transparent' },
              { name: 'Amakura', role: 'biodisciplinary collective. regenerative living + creative projects in zapotal, oaxaca.', tag: 'collective, oaxaca', url: 'https://amakura.xyz', gradient: 'from-lime-900/20 to-transparent' },
              { name: 'ShivEnergetics', role: 'reiki master teacher. levels 1-9. retreats in granada, spain.', tag: 'energy healing, granada', url: 'https://shivenergetics.xyz', gradient: 'from-emerald-900/20 to-transparent' },
              { name: 'Sadhana Works', role: 'kundalini yoga studio. classes, workshops, teacher training in palma.', tag: 'yoga studio, palma', url: 'https://sadhanaworks.xyz', gradient: 'from-sky-900/20 to-transparent' },
              { name: 'Mujer Despierta', role: "women's empowerment platform. circles, retreats + online programs.", tag: "women's circles, 39K", url: 'https://mujerdespierta.xyz', gradient: 'from-fuchsia-900/20 to-transparent' },
            ].map((client, i) => (
              <a
                key={i}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-dark-card border border-border rounded-2xl overflow-hidden hover:border-accent/40 transition-all bg-gradient-to-br ${client.gradient}`}
              >
                <div className="p-6">
                  <h3 className="font-serif text-h4 font-light group-hover:text-accent transition-colors">{client.name}</h3>
                  <p className="text-body-sm text-content-secondary mt-2 leading-relaxed">{client.role}</p>
                  <p className="text-meta text-content-muted mt-2">{client.tag}</p>
                  <span className="text-body-sm text-accent mt-4 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Visit site <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ QUOTE 5 ═══════ */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-content mx-auto text-center reveal" ref={addRevealRef}>
          <p className="font-serif text-display-sm font-light italic text-content-primary max-w-[800px] mx-auto">
            &ldquo;send me the mess. i'll build the business.&rdquo;
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
            i don't pitch. i build it first and send you the link. not a freelancer who disappears. not an agency that bills by the hour. a partner who stays.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { step: '01', title: 'you send me the mess', desc: "a voice memo. a google doc. a screenshot of your instagram. your Linktree. whatever you have. i'll take it from there — i'll research your work, study your audience, and map out what you actually need." },
              { step: '02', title: 'i build it before we talk', desc: "no proposals. no wireframes. no 'discovery phase.' i build a working version of your platform and send you the link. you see it live. you feel it. then we talk." },
              { step: '03', title: 'you get the keys', desc: "your site, your domain, your data, your code. everything is yours from day one. i stay as your technical partner for as long as you want — but you're never locked in." },
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
            i'm the last technical hire <em className="italic gradient-text">you'll ever need.</em>
          </h2>
          <p className="text-body text-content-secondary max-w-prose mb-12">
            not a freelancer who disappears. not an agency that bills by the hour. a partner who stays.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'one person replaces 7 tools', desc: 'site, bookings, events, courses, community, email, payments. one person builds it, connects it, and maintains it.' },
              { title: 'AI-native', desc: 'i build with AI, not around it. your platform gets smarter automations, better content tools, and workflows that would take an agency weeks — done in hours.' },
              { title: 'you own everything', desc: 'your code, your data, your domain. from day one. if you ever want to leave, you take it all with you. no lock-in. ever.' },
              { title: 'decades, not projects', desc: "i don't do handoffs. i stay as your technical partner for as long as you want. your platform evolves with your teaching." },
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
          <h2 className="font-serif text-display-sm font-light mb-4">ready to stop duct-taping?</h2>
          <p className="text-body text-content-secondary mb-10">send me the mess. i'll hand you back a business.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="https://cal.astralintegration.studio/astral/discovery-call" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-accent text-white rounded-full text-body-sm font-medium btn-glow">book a discovery call</a>
            <a href="https://wa.me/34611144170" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-transparent text-content-secondary border border-border rounded-full text-body-sm font-medium hover:border-border-hover hover:text-content-primary transition-all">WhatsApp</a>
          </div>
        </div>
      </section>

      {/* ═══════ ABOUT (short) ═══════ */}
      <section id="about" className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#F5F4F2]">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <div className="grid md:grid-cols-[200px_1fr] gap-10 items-start">
            <div className="w-[200px] h-[240px] rounded-2xl border border-border relative overflow-hidden mx-auto md:mx-0">
              <img src="/founder.jpeg" alt="Jordi Amat" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent" />
            </div>

            <div>
              <h2 className="font-serif text-h2 font-light mb-4">Jordi Amat.</h2>
              <p className="text-body text-content-secondary leading-relaxed mb-4">
                i'm Jordi. i'm a senior full-stack engineer who's spent the last decade building platforms for practitioners, healers, yoga teachers, and spiritual leaders. i live in Mazunte, Oaxaca &mdash; a small village on the Pacific coast of Mexico. i've shipped 170+ sites. i work with AI tools that let me move at a speed that used to require a team. and i charge a fraction of what an agency would because my overhead is a hammock and a satellite dish.
              </p>
              <a
                href="/about"
                className="text-body-sm text-accent hover:text-content-primary transition-colors inline-flex items-center gap-2"
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
