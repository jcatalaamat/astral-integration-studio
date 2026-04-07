import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { CheckCircle } from 'lucide-react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';

const progressionLevels = [
  { level: 'Level 1', label: 'Foundation', status: 'completed' as const },
  { level: 'Level 2', label: 'Intermediate', status: 'completed' as const },
  { level: 'Level 3', label: 'Advanced', status: 'current' as const },
  { level: 'Level 4', label: 'Practitioner', status: 'locked' as const },
  { level: 'Level 5', label: 'Teacher', status: 'locked' as const },
];

const systemCapabilities = [
  { title: 'Prerequisite enforcement', desc: 'Level 3 only unlocks when Level 2 is complete. The system knows the path because it\'s built around yours.' },
  { title: 'Practice hour tracking', desc: 'Students log hours. You verify. The system accumulates them toward certification thresholds. No spreadsheets.' },
  { title: 'Practitioner directory', desc: 'Certification complete → directory listing appears. Searchable by location, specialization, level. A living credential.' },
  { title: 'Cohort management', desc: 'Run multiple cohorts at different levels simultaneously. Track enrollment, progress, completion per group.' },
  { title: 'AI assistant on your methodology', desc: 'An assistant that speaks your terminology, guides students between sessions, and escalates complex questions to you.' },
];

export default function SchoolsPage() {
  useDocumentMeta({
    title: 'For Schools & Academies — Astral Integration',
    description: 'Your certification program deserves more than a spreadsheet. Multi-level progression, student tracking, practitioner directories, and AI assistants — built for how schools actually work.',
    ogUrl: 'https://astralintegration.studio/schools',
  });

  const [formData, setFormData] = useState({ name: '', email: '', site: '', message: '' });
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
          subject: `School/Academy Inquiry: ${formData.name}`,
          message: [
            `FROM: /schools page`,
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
            For Schools & Academies
          </p>
          <h1 className="font-serif text-display font-light mb-8 max-w-[800px]">
            Your certification program<br />deserves more than a <em className="italic gradient-text">spreadsheet.</em>
          </h1>
          <p className="text-body text-content-secondary max-w-prose">
            You've built a multi-level training path with real prerequisites and real progression. But student records live in Google Sheets, practice hours are tracked on WhatsApp, and your graduates disappear the moment they certify. The methodology is solid. The infrastructure isn't.
          </p>
        </div>
      </section>

      {/* Visual: Student Progression — unique to Schools */}
      <section className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#0d0d14]">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            What Students See
          </p>
          <h2 className="font-serif text-display-sm font-light mb-4">
            A student dashboard that knows the curriculum.
          </h2>
          <p className="text-body text-content-secondary max-w-prose mb-16">
            Instead of asking you "what's my next step?" — your students see it. Completed levels, current enrollment, hours logged, what unlocks next. One dashboard, not three spreadsheets.
          </p>

          {/* Progression visualization */}
          <div className="max-w-[600px] bg-dark-card border border-border rounded-2xl p-6 md:p-8">
            <p className="text-meta uppercase text-content-muted mb-6">Student Progression</p>
            <div className="space-y-3">
              {progressionLevels.map((item, i) => (
                <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  item.status === 'completed' ? 'border-accent/30 bg-accent-glow' :
                  item.status === 'current' ? 'border-accent bg-accent/5' :
                  'border-border/50 opacity-50'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                    item.status === 'completed' ? 'bg-accent text-white' :
                    item.status === 'current' ? 'border-2 border-accent text-accent' :
                    'border border-border text-content-muted'
                  }`}>
                    {item.status === 'completed' ? '✓' : item.level.replace('Level ', '')}
                  </div>
                  <div className="flex-1">
                    <p className={`text-body-sm font-medium ${item.status === 'locked' ? 'text-content-muted' : 'text-content-primary'}`}>{item.level}: {item.label}</p>
                  </div>
                  <span className={`text-meta ${
                    item.status === 'completed' ? 'text-accent' :
                    item.status === 'current' ? 'text-accent' :
                    'text-content-muted'
                  }`}>
                    {item.status === 'completed' ? 'Complete' : item.status === 'current' ? 'In progress' : 'Locked'}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
              <div>
                <p className="text-meta text-content-muted">Practice hours</p>
                <p className="text-body-sm text-content-primary font-medium">127 / 200 logged</p>
              </div>
              <div>
                <p className="text-meta text-content-muted">Next certification</p>
                <p className="text-body-sm text-accent font-medium">Level 4: Practitioner</p>
              </div>
            </div>
          </div>

          <p className="text-body-sm text-content-muted mt-6 max-w-[600px]">
            This isn't a mockup. This is what I build. Your levels, your prerequisites, your certification requirements — baked into the system.
          </p>
        </div>
      </section>

      {/* System capabilities */}
      <section className="py-section px-6 md:px-12">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            The System
          </p>
          <h2 className="font-serif text-display-sm font-light mb-4">
            Infrastructure that thinks like a school.
          </h2>
          <p className="text-body text-content-secondary max-w-prose mb-16">
            Not Teachable with a certification bolted on. A platform built from the ground up around how schools with structured progression actually work.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-[800px]">
            {systemCapabilities.map((item, i) => (
              <div key={i} className="bg-dark-card border border-border rounded-xl p-6 hover:border-border-hover transition-colors">
                <h3 className="text-body text-content-primary font-medium mb-2">{item.title}</h3>
                <p className="text-body-sm text-content-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* "Why not Teachable?" — unique to Schools */}
      <section className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#0d0d14]">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            The Honest Question
          </p>
          <h2 className="font-serif text-display-sm font-light mb-4">
            "Why not use Teachable?"
          </h2>
          <p className="text-body text-content-secondary max-w-prose mb-8">
            Teachable is a course platform. Your school isn't a course — it's a multi-level certification system with prerequisites, practice hours, and a practitioner pipeline. Here's what Teachable can't do:
          </p>
          <div className="max-w-prose space-y-3">
            {[
              'Enforce prerequisites between levels — students can access any content they pay for',
              'Track practice hours toward certification thresholds',
              'Auto-populate a practitioner directory when someone completes certification',
              'Manage cohorts with different start dates at the same level',
              'Train an AI assistant on your specific methodology',
              'Give you a student progression dashboard across all levels',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-accent text-body-sm mt-0.5 flex-shrink-0">&times;</span>
                <p className="text-body-sm text-content-secondary">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-body text-content-primary font-medium mt-8 max-w-prose">
            Teachable was built for digital courses. Your school needs school infrastructure. That's what I build.
          </p>
        </div>
      </section>

      {/* Case Study: ShivEnergetics — featured deeply */}
      <section className="py-section px-6 md:px-12">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            Proof
          </p>
          <h2 className="font-serif text-display-sm font-light mb-16">
            300+ students. 9 levels. One platform.
          </h2>

          <div className="bg-dark-card border border-border rounded-2xl overflow-hidden">
            <div className="relative w-full border-b border-border bg-gradient-to-br from-sky-900/25 via-sky-900/5 to-transparent p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-serif text-h2 font-light">ShivEnergetics</h3>
                <p className="text-meta uppercase text-gold mt-1">Reiki Academy — Granada, Spain</p>
              </div>
              <div className="flex items-center gap-3 text-meta flex-wrap">
                <span className="text-content-muted">300+ students</span>
                <span className="text-content-muted">&middot;</span>
                <span className="text-content-muted">9 certification levels</span>
                <span className="text-content-muted">&middot;</span>
                <span className="text-content-muted">5 platforms → 1</span>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-meta uppercase text-content-muted mb-3">The Problem</p>
                  <p className="text-body-sm text-content-secondary leading-relaxed">
                    Teachable for courses. Calendly for bookings. Stripe for payments. WhatsApp for communication. Google Sheets for student records. No single place a student could see their path from first course to practitioner certification.
                  </p>
                </div>
                <div>
                  <p className="text-meta uppercase text-content-muted mb-3">What Was Built</p>
                  <p className="text-body-sm text-content-secondary leading-relaxed">
                    Prerequisite-gated progression across 9 levels. Practice hour logging. Automatic practitioner directory population. Retreat bookings. An AI assistant trained on the Reiki methodology. One platform.
                  </p>
                </div>
              </div>
              <blockquote className="mt-8 pt-8 border-t border-border">
                <p className="text-body text-content-secondary italic leading-relaxed mb-4">
                  "It finally feels like my school, not a patchwork of tools."
                </p>
                <footer className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-accent-glow flex items-center justify-center text-accent font-serif text-xs">S</div>
                  <div>
                    <span className="text-meta text-content-primary">Sera Shivnan</span>
                    <span className="text-meta text-content-muted ml-2">Reiki Master Teacher</span>
                  </div>
                </footer>
              </blockquote>
              <a href="/work/shivenergetics" className="mt-6 text-body-sm text-accent hover:text-content-primary transition-colors inline-flex items-center gap-2">
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
      <section className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#0d0d14]">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            The Model
          </p>
          <h2 className="font-serif text-display-sm font-light mb-4">
            Built for schools that are growing.
          </h2>
          <p className="text-body text-content-secondary max-w-prose mb-16">
            Every school is different — a practitioner launching her first certification needs different architecture than an academy with 300 students across 9 levels. I scope and price based on what the work actually requires.
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
                <strong className="text-content-secondary">You own everything.</strong> Code, data, domain, student records. From day one.
              </p>
              <p className="text-body-sm text-content-muted">
                <strong className="text-content-secondary">Long-term partner.</strong> My pricing is structured so my success is tied to yours — I stay invested in your school's growth.
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
              Tell me about your school.
            </h2>
            <p className="text-body text-content-secondary mb-4">
              How many levels? How many students? What does the certification path look like? I'll tell you what the architecture needs — and whether this is the right partnership.
            </p>
            <p className="text-body-sm text-content-muted mb-10">
              No cost. No pitch. Just a conversation about your school's infrastructure.
            </p>

            {formStatus !== 'success' ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="school-name" className="block text-body-sm text-content-muted mb-3">Name</label>
                    <input type="text" id="school-name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`w-full px-5 py-4 bg-dark-bg border rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors ${formErrors.name ? 'border-red-400 focus:ring-red-400/20' : 'border-border'}`} placeholder="Your name" />
                    {formErrors.name && <p className="mt-2 text-body-sm text-red-400">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="school-email" className="block text-body-sm text-content-muted mb-3">Email</label>
                    <input type="email" id="school-email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`w-full px-5 py-4 bg-dark-bg border rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors ${formErrors.email ? 'border-red-400 focus:ring-red-400/20' : 'border-border'}`} placeholder="your@email.com" />
                    {formErrors.email && <p className="mt-2 text-body-sm text-red-400">{formErrors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="school-site" className="block text-body-sm text-content-muted mb-3">Your current site (optional)</label>
                  <input type="text" id="school-site" value={formData.site} onChange={(e) => setFormData({ ...formData, site: e.target.value })} className="w-full px-5 py-4 bg-dark-bg border border-border rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors" placeholder="yourschool.com or current platform" />
                </div>
                <div>
                  <label htmlFor="school-message" className="block text-body-sm text-content-muted mb-3">Tell me about your school</label>
                  <textarea id="school-message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} className="w-full px-5 py-4 bg-dark-bg border border-border rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors resize-none" placeholder="How many certification levels? How many students? What tools are you using now?" />
                </div>
                <button type="submit" disabled={formStatus === 'sending'} className="px-10 py-4 bg-accent text-white rounded-full text-body-sm font-medium btn-glow disabled:opacity-50 disabled:cursor-not-allowed">
                  {formStatus === 'sending' ? 'Sending...' : formStatus === 'error' ? 'Error - try again' : 'Send Message'}
                </button>
              </form>
            ) : (
              <div className="py-16 text-center">
                <CheckCircle className="w-12 h-12 text-accent mx-auto mb-6" />
                <h3 className="font-serif text-h2 mb-4">Message received.</h3>
                <p className="text-body text-content-secondary mb-3">I'll review your school's setup and get back to you within 24-48 hours.</p>
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
