import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { CheckCircle } from 'lucide-react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';

const offeringStreams = [
  { name: 'Retreats', logic: 'Screening, preparation sequence, capacity limits, deposit + balance', example: '7-day ceremony retreat — intake questionnaire, medical history, dietary prep, 12-person cap' },
  { name: 'Therapy / Sessions', logic: 'Recurring scheduling, session notes, progress tracking', example: 'Integration therapy — weekly sessions, client portal, secure notes' },
  { name: 'Homestays', logic: 'Availability-based, seasonal pricing, guest info', example: 'Private casita — nightly rate, seasonal pricing, check-in instructions' },
  { name: 'Programs', logic: 'Fixed duration, enrollment, daily structure', example: '21-day detox — daily check-ins, meal plans, progress tracking' },
  { name: 'Workshops', logic: 'Event-based, capacity, one-time payment', example: 'Saturday breathwork — 20 spots, $40, automated confirmation' },
];

export default function RetreatsPage() {
  useDocumentMeta({
    title: 'For Retreats & Centers — Astral Integration',
    description: 'A retreat booking isn\'t a hotel reservation. Custom intake flows, multi-stream revenue, capacity management, and preparation sequences — built for how retreat centers actually work.',
    ogUrl: 'https://astralintegration.studio/retreats',
  });

  const [formData, setFormData] = useState({ name: '', email: '', site: '', message: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [activeStream, setActiveStream] = useState(0);
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
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
          subject: `Retreat/Center Inquiry: ${formData.name}`,
          message: [
            `FROM: /retreats page`,
            '',
            formData.site ? `CURRENT SITE: ${formData.site}` : '',
            '',
            formData.message ? `MESSAGE:\n${formData.message}` : '',
          ].filter(Boolean).join('\n'),
        },
        'v57Ta98pwBDWpoe8o'
      );
      setFormStatus('success');
      setFormData({ name: '', email: '', site: '', message: '' });
      setFormErrors({});
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
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
            For Retreats & Centers
          </p>
          <h1 className="font-serif text-display font-light mb-8 max-w-[800px]">
            A retreat booking isn't<br />a hotel <em className="italic gradient-text">reservation.</em>
          </h1>
          <p className="text-body text-content-secondary max-w-prose">
            Your center runs retreats, therapy, homestays, workshops — each with its own intake, pricing, and client journey. A "Book Now" button doesn't cut it when someone needs screening, preparation materials, and capacity management before they walk through the door.
          </p>
        </div>
      </section>

      {/* Multi-Stream Revenue — unique interactive element for Retreats */}
      <section className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#F5F4F2]">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            The Architecture
          </p>
          <h2 className="font-serif text-display-sm font-light mb-4">
            One platform. Different logic per offering.
          </h2>
          <p className="text-body text-content-secondary max-w-prose mb-16">
            A retreat booking requires screening and preparation. A homestay is availability-based. Therapy needs recurring sessions. Each stream gets its own logic while sharing a unified brand and client database.
          </p>

          {/* Interactive stream selector */}
          <div className="max-w-[700px]">
            <div className="flex flex-wrap gap-2 mb-6">
              {offeringStreams.map((stream, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStream(i)}
                  className={`px-4 py-2 rounded-full text-body-sm transition-all ${
                    activeStream === i
                      ? 'bg-accent text-white'
                      : 'bg-dark-card border border-border text-content-secondary hover:border-border-hover'
                  }`}
                >
                  {stream.name}
                </button>
              ))}
            </div>

            <div className="bg-dark-card border border-border rounded-2xl p-6 md:p-8">
              <h3 className="font-serif text-h3 mb-3">{offeringStreams[activeStream].name}</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-meta uppercase text-content-muted mb-2">Booking Logic</p>
                  <p className="text-body-sm text-content-secondary">{offeringStreams[activeStream].logic}</p>
                </div>
                <div>
                  <p className="text-meta uppercase text-content-muted mb-2">Example</p>
                  <p className="text-body-sm text-content-primary">{offeringStreams[activeStream].example}</p>
                </div>
              </div>
            </div>

            <p className="text-body-sm text-content-muted mt-4">
              All streams share one client database, one brand, one login. The logic underneath is different. That's the architecture.
            </p>
          </div>
        </div>
      </section>

      {/* The Journey — unique to Retreats */}
      <section className="py-section px-6 md:px-12">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            The Full Journey
          </p>
          <h2 className="font-serif text-display-sm font-light mb-4">
            From inquiry to integration.
          </h2>
          <p className="text-body text-content-secondary max-w-prose mb-16">
            The platform handles every phase — not just the booking.
          </p>

          <div className="max-w-prose space-y-6">
            {[
              { phase: 'Discovery', desc: 'Guest finds your center. Each offering has its own page, its own story, its own booking flow — not a generic grid.' },
              { phase: 'Intake', desc: 'Custom intake per offering type. A retreat asks about medical history and intentions. A homestay asks about dates and dietary needs. The questions match the depth of the work.' },
              { phase: 'Preparation', desc: 'After booking, automated preparation sequences — packing lists, dietary guidelines, intention prompts, logistical details. Timed and customized by offering.' },
              { phase: 'Experience', desc: 'Capacity management, check-in, on-site coordination. You run the retreat. The platform handles the logistics.' },
              { phase: 'Integration', desc: 'Post-retreat resources, integration guidance, follow-up sequences. Membership invitations for ongoing connection. The relationship continues.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-body-sm font-medium ${
                    i === 0 ? 'bg-accent text-white' : 'bg-dark-card border border-border text-content-muted'
                  }`}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  {i < 4 && <div className="w-px h-full bg-border mt-2" />}
                </div>
                <div className="pb-6">
                  <h3 className="text-body text-content-primary font-medium mb-2">{item.phase}</h3>
                  <p className="text-body-sm text-content-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* "Why not Booking.com?" — unique objection for Retreats */}
      <section className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#F5F4F2]">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            The Honest Question
          </p>
          <h2 className="font-serif text-display-sm font-light mb-4">
            "Why not use Airbnb or Booking.com?"
          </h2>
          <p className="text-body text-content-secondary max-w-prose mb-8">
            Because your work isn't hospitality. Here's what those platforms assume:
          </p>
          <div className="max-w-prose grid md:grid-cols-2 gap-6">
            <div className="bg-dark-card border border-border rounded-xl p-6">
              <p className="text-meta uppercase text-content-muted mb-3">They assume</p>
              <ul className="space-y-2">
                {[
                  'Anyone with a credit card can book',
                  'All rooms are interchangeable',
                  'The stay is the product',
                  'No preparation needed',
                  'Checkout = goodbye',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-body-sm text-content-muted">
                    <span className="text-content-muted mt-0.5 flex-shrink-0">&times;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-dark-card border border-accent/30 rounded-xl p-6">
              <p className="text-meta uppercase text-accent mb-3">Your reality</p>
              <ul className="space-y-2">
                {[
                  'Guests need screening and preparation',
                  'Each offering has different requirements',
                  'The experience needs context before arrival',
                  'Prep materials are part of the container',
                  'Integration continues after they leave',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-body-sm text-content-primary">
                    <span className="text-accent mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-body-sm text-content-muted mt-6 max-w-prose">
            Plus: every booking on Airbnb costs you 15-20% in commissions. Direct bookings through your platform cost you zero in platform fees.
          </p>
        </div>
      </section>

      {/* Case Study: Sacred Counsel */}
      <section className="py-section px-6 md:px-12">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            Proof
          </p>
          <h2 className="font-serif text-display-sm font-light mb-16">
            5 revenue streams. One platform.
          </h2>

          <div className="bg-dark-card border border-border rounded-2xl overflow-hidden">
            <div className="relative w-full border-b border-border bg-gradient-to-br from-amber-900/25 via-amber-900/5 to-transparent p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-serif text-h2 font-light">Sacred Counsel</h3>
                <p className="text-meta uppercase text-gold mt-1">Retreat Center — Valle de Bravo, Mexico</p>
              </div>
              <div className="flex items-center gap-3 text-meta flex-wrap">
                <span className="text-content-muted">20+ years</span>
                <span className="text-content-muted">&middot;</span>
                <span className="text-content-muted">5 offering types</span>
                <span className="text-content-muted">&middot;</span>
                <a href="https://sacredcounsel.space" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-content-primary transition-colors">View Live</a>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-meta uppercase text-content-muted mb-3">The Problem</p>
                  <p className="text-body-sm text-content-secondary leading-relaxed">
                    Ayahuasca retreats, integration therapy, private homestays, and a 21-day metabolic detox — each with its own intake process, pricing, and client journey. Five distinct revenue streams, five different booking logics, no unified system.
                  </p>
                </div>
                <div>
                  <p className="text-meta uppercase text-content-muted mb-3">What Was Built</p>
                  <p className="text-body-sm text-content-secondary leading-relaxed">
                    Stream-specific intake flows, automated preparation sequences, capacity management per offering type, and a shared client relationship layer. All five revenue streams flow through one platform with offering-specific logic underneath.
                  </p>
                </div>
              </div>
              <a href="/work/sacred-counsel" className="mt-6 text-body-sm text-accent hover:text-content-primary transition-colors inline-flex items-center gap-2">
                Full case study <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          <div className="mt-8">
            <a href="/work" className="text-body-sm text-accent hover:text-content-primary transition-colors inline-flex items-center gap-2">
              All 8 case studies <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#F5F4F2]">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            The Model
          </p>
          <h2 className="font-serif text-display-sm font-light mb-4">
            Scoped to your center's complexity.
          </h2>
          <p className="text-body text-content-secondary max-w-prose mb-16">
            A single-offering retreat space is a different build than a center with five revenue streams. I scope and price based on what the work actually requires.
          </p>

          <div className="bg-dark-card border border-accent/30 ring-1 ring-accent/20 rounded-2xl p-8 md:p-10 max-w-prose">
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { label: 'Platform build', value: '$5,000 – $10,000', detail: 'Scoped to your needs' },
                { label: 'Ongoing partnership', value: '$1,000 – $2,000/mo', detail: 'Maintenance & evolution' },
                { label: 'Timeline', value: '2 – 6 weeks', detail: 'To launch' },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-meta uppercase text-content-muted mb-1">{item.label}</p>
                  <p className="font-serif text-h3 font-light text-accent">{item.value}</p>
                  <p className="text-meta text-content-muted mt-1">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-border space-y-2">
              <p className="text-body-sm text-content-muted">
                <strong className="text-content-secondary">You own everything.</strong> Code, data, domain, client records. From day one.
              </p>
              <p className="text-body-sm text-content-muted">
                <strong className="text-content-secondary">No platform commissions.</strong> Unlike Airbnb's 15-20%, your direct bookings cost zero in platform fees.
              </p>
              <p className="text-body-sm text-content-muted">
                <strong className="text-content-secondary">Long-term partner.</strong> My pricing is structured so my success is tied to yours.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <a href="/pricing" className="text-body-sm text-accent hover:text-content-primary transition-colors inline-flex items-center gap-2">
              Full pricing & FAQ <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA / Contact */}
      <section className="py-section px-6 md:px-12 bg-dark-card">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <div className="max-w-prose">
            <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-accent" />
              Let's Talk
            </p>
            <h2 className="font-serif text-display-sm font-light mb-4">
              Tell me about your center.
            </h2>
            <p className="text-body text-content-secondary mb-4">
              What offerings do you run? What does the booking process look like today? I'll tell you what the architecture needs to look like.
            </p>
            <p className="text-body-sm text-content-muted mb-10">
              No cost. No pitch. Just a conversation about your center's infrastructure.
            </p>

            {formStatus !== 'success' ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="retreat-name" className="block text-body-sm text-content-muted mb-3">Name</label>
                    <input type="text" id="retreat-name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`w-full px-5 py-4 bg-dark-bg border rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors ${formErrors.name ? 'border-red-400 focus:ring-red-400/20' : 'border-border'}`} placeholder="Your name" />
                    {formErrors.name && <p className="mt-2 text-body-sm text-red-400">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="retreat-email" className="block text-body-sm text-content-muted mb-3">Email</label>
                    <input type="email" id="retreat-email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`w-full px-5 py-4 bg-dark-bg border rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors ${formErrors.email ? 'border-red-400 focus:ring-red-400/20' : 'border-border'}`} placeholder="your@email.com" />
                    {formErrors.email && <p className="mt-2 text-body-sm text-red-400">{formErrors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="retreat-site" className="block text-body-sm text-content-muted mb-3">Your current site (optional)</label>
                  <input type="text" id="retreat-site" value={formData.site} onChange={(e) => setFormData({ ...formData, site: e.target.value })} className="w-full px-5 py-4 bg-dark-bg border border-border rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors" placeholder="yourcenter.com" />
                </div>
                <div>
                  <label htmlFor="retreat-message" className="block text-body-sm text-content-muted mb-3">Tell me about your center</label>
                  <textarea id="retreat-message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} className="w-full px-5 py-4 bg-dark-bg border border-border rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors resize-none" placeholder="What offerings do you run? How does booking work today? What's the biggest pain point?" />
                </div>
                <button type="submit" disabled={formStatus === 'sending'} className="px-10 py-4 bg-accent text-white rounded-full text-body-sm font-medium btn-glow disabled:opacity-50 disabled:cursor-not-allowed">
                  {formStatus === 'sending' ? 'Sending...' : formStatus === 'error' ? 'Error - try again' : 'Send Message'}
                </button>
              </form>
            ) : (
              <div className="py-16 text-center">
                <CheckCircle className="w-12 h-12 text-accent mx-auto mb-6" />
                <h3 className="font-serif text-h2 mb-4">Message received.</h3>
                <p className="text-body text-content-secondary mb-3">I'll review your center's setup and get back to you within 24-48 hours.</p>
                <p className="text-body-sm text-content-muted mb-8">Check your inbox for a reply from hello@astralintegration.studio</p>
                <button onClick={() => setFormStatus('idle')} className="text-body-sm text-accent hover:underline">Send another message</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
