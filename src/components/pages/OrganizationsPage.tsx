import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { CheckCircle } from 'lucide-react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';

const scaleProblems = [
  {
    title: 'Facilitator discovery',
    problem: 'Thousands of certified facilitators across countries and languages. Students find them through Facebook groups, WhatsApp, or personal referrals. No unified directory. No credential verification. No way to search by location or language.',
    solution: 'Searchable directory with location, language, specialty, and credential level. Auto-populated from certification data. Public-facing with admin oversight.',
  },
  {
    title: 'Class discovery',
    problem: 'Students need to find classes near them, in their language, with a qualified facilitator. Right now that means asking in a WhatsApp group and hoping someone answers.',
    solution: 'Unified class listing — searchable by location, date, language, and level. Facilitators manage their own schedules within the system. Students book directly.',
  },
  {
    title: 'Student journey',
    problem: 'A student takes a class in Berlin, another in São Paulo, another online. No unified record. No progression tracking. Each facilitator has their own spreadsheet.',
    solution: 'One login, one profile, one progression record. Practice hours, certifications, and class history — regardless of where in the world the classes happened.',
  },
  {
    title: 'Regional coordination',
    problem: 'Country coordinators managing facilitator licensing, event approvals, and territory logistics through email chains, spreadsheets, and monthly calls.',
    solution: 'Regional dashboards — facilitators, upcoming classes, license renewals, and activity metrics per territory. Real-time, self-serve, no more email threads.',
  },
  {
    title: 'Multi-language infrastructure',
    problem: 'The methodology is taught in English, Spanish, Portuguese, Hebrew, and growing. The digital presence is either English-only or a patchwork of translated pages.',
    solution: 'Native multi-language architecture. Not translation toggles — separate content management per language, unified under one system.',
  },
];

export default function OrganizationsPage() {
  useDocumentMeta({
    title: 'For Organizations — Astral Integration',
    description: 'Your methodology scaled. Your infrastructure didn\'t. Facilitator directories, class discovery, student journeys, regional dashboards, and multi-language support — built for organizations operating at global scale.',
    ogUrl: 'https://astralintegration.studio/organizations',
  });

  const [formData, setFormData] = useState({ name: '', email: '', org: '', message: '' });
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
          subject: `Organization Inquiry: ${formData.name}`,
          message: [
            `FROM: /organizations page`,
            '',
            formData.org ? `ORGANIZATION: ${formData.org}` : '',
            '',
            formData.message ? `MESSAGE:\n${formData.message}` : '',
          ].filter(Boolean).join('\n'),
        },
        'v57Ta98pwBDWpoe8o'
      );
      setFormStatus('success');
      setFormData({ name: '', email: '', org: '', message: '' });
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
            For Organizations
          </p>
          <h1 className="font-serif text-display font-light mb-8 max-w-[800px]">
            Your methodology scaled.<br />Your infrastructure <em className="italic gradient-text">didn't.</em>
          </h1>
          <p className="text-body text-content-secondary max-w-prose">
            Hundreds — or thousands — of certified facilitators across countries and languages. Students taking classes worldwide with no unified record. Regional coordinators managing by email. The methodology succeeded beyond anyone's expectations. The infrastructure is decades behind it.
          </p>
        </div>
      </section>

      {/* Scale Dimensions — unique framing for Organizations */}
      <section className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#F5F4F2]">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            The Scale You're Operating At
          </p>
          <h2 className="font-serif text-display-sm font-light mb-16">
            The infrastructure gap at every layer.
          </h2>

          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              { metric: '1,000+', label: 'Certified facilitators', detail: 'Across countries, languages, and time zones' },
              { metric: '10,000+', label: 'Students worldwide', detail: 'No unified journey record' },
              { metric: '15+', label: 'Languages', detail: 'Taught in, but platformed in 1-2' },
              { metric: '50+', label: 'Countries', detail: 'With no regional infrastructure' },
            ].map((item, i) => (
              <div key={i} className="text-center md:text-left">
                <p className="font-serif text-h2 font-light text-accent mb-1">{item.metric}</p>
                <p className="text-body-sm text-content-primary font-medium">{item.label}</p>
                <p className="text-meta text-content-muted mt-1">{item.detail}</p>
              </div>
            ))}
          </div>

          <p className="text-body text-content-secondary max-w-prose">
            These aren't hypothetical numbers. This is the scale at which methodologies like Access Consciousness, breathwork lineages, and certification-based healing modalities actually operate. The methodology scales through people. The infrastructure hasn't kept up.
          </p>
        </div>
      </section>

      {/* Problem → Solution pairs — deep dive */}
      <section className="py-section px-6 md:px-12">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            Problem by Problem
          </p>
          <h2 className="font-serif text-display-sm font-light mb-4">
            Five infrastructure gaps. Five solutions.
          </h2>
          <p className="text-body text-content-secondary max-w-prose mb-16">
            At this scale, the problems are interconnected. The facilitator directory feeds class discovery. Class completion feeds student progression. Regional dashboards aggregate it all. Here's how each layer works.
          </p>

          <div className="space-y-6">
            {scaleProblems.map((item, i) => (
              <div key={i} className="bg-dark-card border border-border rounded-2xl overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-serif text-sm font-medium flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className="font-serif text-h3">{item.title}</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-meta uppercase text-content-muted mb-3">The Problem</p>
                      <p className="text-body-sm text-content-secondary leading-relaxed">{item.problem}</p>
                    </div>
                    <div>
                      <p className="text-meta uppercase text-accent mb-3">The Architecture</p>
                      <p className="text-body-sm text-content-primary leading-relaxed">{item.solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* "Why not build custom?" — unique objection */}
      <section className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#F5F4F2]">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            The Honest Question
          </p>
          <h2 className="font-serif text-display-sm font-light mb-4">
            "Why not hire a dev team and build this internally?"
          </h2>
          <p className="text-body text-content-secondary max-w-prose mb-8">
            You can. Many organizations at this scale consider it. Here's what that typically looks like:
          </p>
          <div className="max-w-prose space-y-4 mb-8">
            <p className="text-body-sm text-content-secondary">
              <strong className="text-content-primary">6-12 months before launch</strong> — hiring, scoping, architecture decisions, project management. Before a single facilitator or student sees anything.
            </p>
            <p className="text-body-sm text-content-secondary">
              <strong className="text-content-primary">$200K+ in the first year</strong> — salaries, infrastructure, tools, project management overhead. And you're now managing a software team alongside everything else.
            </p>
            <p className="text-body-sm text-content-secondary">
              <strong className="text-content-primary">The team doesn't understand the work</strong> — they're engineers, not practitioners. Every product decision requires translation between the technical and the methodological.
            </p>
          </div>
          <p className="text-body text-content-primary font-medium max-w-prose">
            I build this faster because I understand the domain. Facilitator directories, certification pipelines, student progression, regional coordination — I've already built every piece of this for individual schools and practices. What changes at organization scale is the architecture, not the understanding.
          </p>
        </div>
      </section>

      {/* Prototype reference */}
      <section className="py-section px-6 md:px-12">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            Architecture Prototype
          </p>
          <h2 className="font-serif text-display-sm font-light mb-4">
            I've already started building this.
          </h2>
          <p className="text-body text-content-secondary max-w-prose mb-12">
            I built a working architectural prototype of what unified organizational infrastructure looks like — facilitator directory with search and filtering, class discovery by location and language, student journey tracking, and regional coordination dashboards. Not for any specific organization. As a demonstration of what's possible.
          </p>

          <div className="bg-dark-card border border-accent/30 ring-1 ring-accent/20 rounded-2xl p-8 md:p-10 max-w-prose">
            <h3 className="font-serif text-h3 mb-3">Working Prototype</h3>
            <p className="text-body-sm text-content-secondary mb-4">
              An interactive prototype showing unified infrastructure for a global facilitator network — class discovery, facilitator profiles, student journey tracking, and regional dashboards. Built as an architectural proof of concept.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['Facilitator Directory', 'Class Discovery', 'Student Journey', 'Regional Dashboard', 'Multi-language'].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-dark-bg border border-border rounded-full text-meta text-content-muted">{tag}</span>
              ))}
            </div>
            <a
              href="/access"
              className="inline-block px-8 py-3 border border-accent rounded-full text-accent text-body-sm font-medium hover:bg-accent hover:text-white transition-all hover:shadow-glow"
            >
              View Prototype
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
            A different conversation.
          </h2>
          <p className="text-body text-content-secondary max-w-prose mb-16">
            Organization-scale infrastructure is scoped per engagement. The approach: start with the highest-impact module — usually the facilitator directory or class discovery — prove the architecture works, then expand.
          </p>

          <div className="bg-dark-card border border-border rounded-2xl p-8 md:p-10 max-w-prose">
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { label: 'Platform build', value: 'Scoped', detail: 'Per engagement' },
                { label: 'Ongoing partnership', value: 'Custom', detail: 'Monthly or rev share' },
                { label: 'Timeline', value: '4 – 8 weeks', detail: 'Phased delivery' },
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
                <strong className="text-content-secondary">You own everything.</strong> Code, data, infrastructure. No vendor lock-in. No SaaS dependency.
              </p>
              <p className="text-body-sm text-content-muted">
                <strong className="text-content-secondary">Phased delivery.</strong> First module ships in weeks. Proves the architecture. Then we expand.
              </p>
              <p className="text-body-sm text-content-muted">
                <strong className="text-content-secondary">Long-term partnership.</strong> I stay as your technical partner. My pricing is structured so my success is tied to yours.
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
              This conversation starts differently.
            </h2>
            <p className="text-body text-content-secondary mb-4">
              Organization-scale infrastructure needs a real discovery conversation. Tell me about the organization — the facilitator network, the student journey, the coordination challenges — and I'll tell you what the architecture needs to look like.
            </p>
            <p className="text-body-sm text-content-muted mb-10">
              No pitch. No generic proposal. A conversation between a senior engineer who understands this domain and someone who knows the organization's infrastructure gaps.
            </p>

            {formStatus !== 'success' ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="org-name" className="block text-body-sm text-content-muted mb-3">Name</label>
                    <input type="text" id="org-name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`w-full px-5 py-4 bg-dark-bg border rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors ${formErrors.name ? 'border-red-400 focus:ring-red-400/20' : 'border-border'}`} placeholder="Your name" />
                    {formErrors.name && <p className="mt-2 text-body-sm text-red-400">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="org-email" className="block text-body-sm text-content-muted mb-3">Email</label>
                    <input type="email" id="org-email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`w-full px-5 py-4 bg-dark-bg border rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors ${formErrors.email ? 'border-red-400 focus:ring-red-400/20' : 'border-border'}`} placeholder="your@email.com" />
                    {formErrors.email && <p className="mt-2 text-body-sm text-red-400">{formErrors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="org-org" className="block text-body-sm text-content-muted mb-3">Organization</label>
                  <input type="text" id="org-org" value={formData.org} onChange={(e) => setFormData({ ...formData, org: e.target.value })} className="w-full px-5 py-4 bg-dark-bg border border-border rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors" placeholder="Organization name and website" />
                </div>
                <div>
                  <label htmlFor="org-message" className="block text-body-sm text-content-muted mb-3">Tell me about the infrastructure challenge</label>
                  <textarea id="org-message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5} className="w-full px-5 py-4 bg-dark-bg border border-border rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors resize-none" placeholder="How many facilitators? How many countries? What systems exist today? What's the biggest gap?" />
                </div>
                <button type="submit" disabled={formStatus === 'sending'} className="px-10 py-4 bg-accent text-white rounded-full text-body-sm font-medium btn-glow disabled:opacity-50 disabled:cursor-not-allowed">
                  {formStatus === 'sending' ? 'Sending...' : formStatus === 'error' ? 'Error - try again' : 'Start the Conversation'}
                </button>
              </form>
            ) : (
              <div className="py-16 text-center">
                <CheckCircle className="w-12 h-12 text-accent mx-auto mb-6" />
                <h3 className="font-serif text-h2 mb-4">Message received.</h3>
                <p className="text-body text-content-secondary mb-3">I'll review your organization's needs and get back to you within 24-48 hours with initial thoughts on architecture.</p>
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
