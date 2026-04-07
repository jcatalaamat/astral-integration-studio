import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { CheckCircle } from 'lucide-react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';

const diagnosticItems = [
  'You use Linktree because your site can\'t do what you need',
  'Your course page has no way to enroll — just a Stripe link',
  'Payment and scheduling are two separate tools',
  'Your students ask "where do I sign up?" and you send 3 links',
  'You\'re copy-pasting between Calendly, Mailchimp, and a spreadsheet every week',
  'You know your site doesn\'t reflect the depth of your work',
];

const beforeAfter = [
  { before: 'Booking on Calendly', after: 'Booking on your site' },
  { before: 'Payments on Stripe', after: 'Payment in the same step' },
  { before: 'Courses on Teachable', after: 'Courses on your platform' },
  { before: 'Email list on Mailchimp', after: 'Email capture built in' },
  { before: 'Links on Linktree', after: 'One site that does it all' },
  { before: 'Brand on Squarespace', after: 'Brand that\'s actually yours' },
];

export default function PractitionersPage() {
  useDocumentMeta({
    title: 'For Practitioners — Astral Integration',
    description: 'You have the audience. You deserve the infrastructure. I replace your 6 disconnected tools with one platform — your brand, your domain, everything connected.',
    ogUrl: 'https://astralintegration.studio/practitioners',
  });

  const [formData, setFormData] = useState({ name: '', email: '', site: '', message: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(diagnosticItems.length).fill(false));
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  const checkedCount = checkedItems.filter(Boolean).length;

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
      const diagnosticResults = diagnosticItems
        .filter((_, i) => checkedItems[i])
        .map((item) => `  - ${item}`)
        .join('\n');

      await emailjs.send(
        'service_larviog',
        'template_7iyu04b',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: `Practitioner Inquiry: ${formData.name}`,
          message: [
            `FROM: /practitioners page`,
            '',
            formData.site ? `CURRENT SITE: ${formData.site}` : '',
            '',
            diagnosticResults ? `DIAGNOSTIC (${checkedCount}/${diagnosticItems.length} checked):\n${diagnosticResults}` : '',
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
            For Practitioners
          </p>
          <h1 className="font-serif text-display font-light mb-8 max-w-[800px]">
            You have the audience.<br />You deserve the <em className="italic gradient-text">infrastructure.</em>
          </h1>
          <p className="text-body text-content-secondary max-w-prose">
            You're running your practice on Wix + Stripe + Calendly + Linktree + a prayer. I replace all of it with one platform — your brand, your domain, everything connected. Most practitioners launch in 2–3 weeks.
          </p>
        </div>
      </section>

      {/* The Diagnostic */}
      <section className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#0d0d14]">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            The Diagnostic
          </p>
          <h2 className="font-serif text-display-sm font-light mb-4">Is this you?</h2>
          <p className="text-body text-content-secondary max-w-prose mb-12">
            Check the ones that apply. Be honest.
          </p>

          <div className="space-y-4 max-w-prose mb-10">
            {diagnosticItems.map((item, i) => (
              <label
                key={i}
                className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all ${
                  checkedItems[i]
                    ? 'bg-accent-glow border-accent/30'
                    : 'bg-dark-card border-border hover:border-border-hover'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checkedItems[i]}
                  onChange={() => {
                    const next = [...checkedItems];
                    next[i] = !next[i];
                    setCheckedItems(next);
                  }}
                  className="mt-1 accent-accent w-4 h-4 flex-shrink-0"
                />
                <span className={`text-body-sm ${checkedItems[i] ? 'text-content-primary' : 'text-content-secondary'}`}>
                  {item}
                </span>
              </label>
            ))}
          </div>

          {checkedCount >= 2 && (
            <div className="bg-dark-card border border-accent/20 rounded-xl p-6 max-w-prose animate-fadeUp">
              <p className="text-body text-content-primary font-medium mb-2">
                {checkedCount} out of {diagnosticItems.length}. Yeah — your infrastructure doesn't match your work.
              </p>
              <p className="text-body-sm text-content-secondary">
                The good news: this is exactly what I fix. Keep reading.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Before / After — unique to Practitioners */}
      <section className="py-section px-6 md:px-12">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            The Shift
          </p>
          <h2 className="font-serif text-display-sm font-light mb-4">
            6 tools become 1 platform.
          </h2>
          <p className="text-body text-content-secondary max-w-prose mb-16">
            Every practitioner I've worked with was running some version of this patchwork. Here's what changes.
          </p>

          <div className="max-w-prose">
            <div className="grid grid-cols-[1fr_auto_1fr] gap-x-6 gap-y-4 items-center">
              <p className="text-meta uppercase text-content-muted text-right">Before</p>
              <div />
              <p className="text-meta uppercase text-accent">After</p>
              {beforeAfter.map((item, i) => (
                <div key={i} className="contents">
                  <p className="text-body-sm text-content-muted text-right line-through decoration-content-muted/40">{item.before}</p>
                  <span className="text-accent text-body-sm" aria-hidden="true">&rarr;</span>
                  <p className="text-body-sm text-content-primary font-medium">{item.after}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Relevant Work */}
      <section className="py-section px-6 md:px-12 bg-gradient-to-b from-dark-bg to-[#0d0d14]">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            Practitioners I've Built For
          </p>
          <h2 className="font-serif text-display-sm font-light mb-16">
            They were where you are.
          </h2>

          <div className="space-y-8">
            <div className="bg-dark-card border border-border rounded-2xl overflow-hidden">
              <div className="relative w-full border-b border-border bg-gradient-to-br from-violet-900/25 via-violet-900/5 to-transparent p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="font-serif text-h2 font-light">Uria Tsur</h3>
                  <p className="text-meta uppercase text-gold mt-1">Vocal Freedom Facilitator — 18+ Cities</p>
                </div>
                <div className="flex items-center gap-3 text-meta">
                  <span className="text-content-muted">300+ subscribers</span>
                  <span className="text-content-muted">&middot;</span>
                  <span className="text-content-muted">8 platforms → 1</span>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-body-sm text-content-secondary leading-relaxed mb-4">
                  Was managing events across 8 ticketing platforms, losing audience data, spending hours on admin. Now has one platform: ticketing, membership (300+ subscribers), and a facilitator training course. Bilingual English/Hebrew.
                </p>
                <blockquote className="mt-6 pt-6 border-t border-border">
                  <p className="text-body-sm text-content-secondary italic leading-relaxed mb-3">
                    "I was managing tickets on 8 platforms, WhatsApp groups for everything, total chaos. Jordi put it all in one place. Now I just focus on my workshops and the community runs itself."
                  </p>
                  <footer className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-accent-glow flex items-center justify-center text-accent font-serif text-xs">U</div>
                    <div>
                      <span className="text-meta text-content-primary">Uria Tsur</span>
                      <span className="text-meta text-content-muted ml-2">Vocal Facilitator & Musician</span>
                    </div>
                  </footer>
                </blockquote>
                <a href="/work/uria-tsur" className="mt-6 text-body-sm text-accent hover:text-content-primary transition-colors inline-flex items-center gap-2">
                  Full case study <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>

            <div className="bg-dark-card border border-border rounded-2xl overflow-hidden">
              <div className="relative w-full border-b border-border bg-gradient-to-br from-lime-900/25 via-lime-900/5 to-transparent p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="font-serif text-h2 font-light">Inner Ascend</h3>
                  <p className="text-meta uppercase text-gold mt-1">Healing Membership & Facilitator Pipeline</p>
                </div>
                <div className="flex items-center gap-3 text-meta">
                  <span className="text-content-muted">97 practices</span>
                  <span className="text-content-muted">&middot;</span>
                  <span className="text-content-muted">AI assistant</span>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-body-sm text-content-secondary leading-relaxed">
                  A trauma-informed healing practice with a loyal following — but no way to stay with people between ceremonies. Now has a 12-month curriculum of 97 practices, a personalized AI healing assistant, and a pipeline into facilitator training.
                </p>
                <a href="/work/inner-ascend" className="mt-6 text-body-sm text-accent hover:text-content-primary transition-colors inline-flex items-center gap-2">
                  Full case study <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <a href="/work" className="text-body-sm text-accent hover:text-content-primary transition-colors inline-flex items-center gap-2">
              All 8 case studies <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* Why not just hire a developer? */}
      <section className="py-section px-6 md:px-12">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            The Honest Question
          </p>
          <h2 className="font-serif text-display-sm font-light mb-4">
            "Why not just hire a web developer?"
          </h2>
          <p className="text-body text-content-secondary max-w-prose mb-8">
            You can. But here's what that looks like:
          </p>
          <div className="max-w-prose space-y-4">
            <div className="flex gap-4 items-start">
              <span className="text-content-muted text-body-sm mt-0.5 flex-shrink-0">1.</span>
              <p className="text-body-sm text-content-secondary">You write a spec (which means you need to already know what you need).</p>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-content-muted text-body-sm mt-0.5 flex-shrink-0">2.</span>
              <p className="text-body-sm text-content-secondary">They build what you spec'd. You realize it doesn't quite work the way you imagined.</p>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-content-muted text-body-sm mt-0.5 flex-shrink-0">3.</span>
              <p className="text-body-sm text-content-secondary">You pay for revisions. Three rounds later, the budget's gone and the booking flow still doesn't make sense.</p>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-content-muted text-body-sm mt-0.5 flex-shrink-0">4.</span>
              <p className="text-body-sm text-content-secondary">They leave. Something breaks six months later and you're either paying emergency rates or starting over.</p>
            </div>
          </div>
          <p className="text-body text-content-primary font-medium mt-8 max-w-prose">
            I don't build what you spec. I learn your work, make architectural decisions, and stay as your technical partner. When your practice grows — new offerings, new audiences, new revenue streams — the platform grows with it.
          </p>
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
            Built for practitioners who are ready.
          </h2>
          <p className="text-body text-content-secondary max-w-prose mb-16">
            Every project is scoped to what the work actually requires. My pricing is structured so my success is tied to yours — I don't build and disappear.
          </p>

          <div className="bg-dark-card border border-accent/30 ring-1 ring-accent/20 rounded-2xl p-8 md:p-10 max-w-prose">
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { label: 'Platform build', value: '$1,500 – $3,000', detail: 'Scoped to your needs' },
                { label: 'Ongoing partnership', value: '$250 – $500/mo', detail: 'Maintenance & evolution' },
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
                <strong className="text-content-secondary">You own everything.</strong> Code, data, domain, content. From day one.
              </p>
              <p className="text-body-sm text-content-muted">
                <strong className="text-content-secondary">Long-term partner.</strong> I stay as your technical partner — maintaining and evolving the platform as your work grows.
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
              Send me your site. I'll tell you what's broken.
            </h2>
            <p className="text-body text-content-secondary mb-4">
              No cost. No pitch. I'll look at your setup — your site, your tools, your booking flow — and tell you exactly what's working, what's leaking, and what it would take to fix it.
            </p>
            <p className="text-body-sm text-content-muted mb-10">
              Or just tell me about your work and where you're stuck.
            </p>

            {formStatus !== 'success' ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="prac-name" className="block text-body-sm text-content-muted mb-3">Name</label>
                    <input type="text" id="prac-name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`w-full px-5 py-4 bg-dark-bg border rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors ${formErrors.name ? 'border-red-400 focus:ring-red-400/20' : 'border-border'}`} placeholder="Your name" />
                    {formErrors.name && <p className="mt-2 text-body-sm text-red-400">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="prac-email" className="block text-body-sm text-content-muted mb-3">Email</label>
                    <input type="email" id="prac-email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`w-full px-5 py-4 bg-dark-bg border rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors ${formErrors.email ? 'border-red-400 focus:ring-red-400/20' : 'border-border'}`} placeholder="your@email.com" />
                    {formErrors.email && <p className="mt-2 text-body-sm text-red-400">{formErrors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="prac-site" className="block text-body-sm text-content-muted mb-3">Your current site (optional)</label>
                  <input type="text" id="prac-site" value={formData.site} onChange={(e) => setFormData({ ...formData, site: e.target.value })} className="w-full px-5 py-4 bg-dark-bg border border-border rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors" placeholder="yoursite.com or Instagram handle" />
                </div>
                <div>
                  <label htmlFor="prac-message" className="block text-body-sm text-content-muted mb-3">What are you working on?</label>
                  <textarea id="prac-message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} className="w-full px-5 py-4 bg-dark-bg border border-border rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors resize-none" placeholder="Tell me about your work, your people, and where your current setup is falling short..." />
                </div>
                <button type="submit" disabled={formStatus === 'sending'} className="px-10 py-4 bg-accent text-white rounded-full text-body-sm font-medium btn-glow disabled:opacity-50 disabled:cursor-not-allowed">
                  {formStatus === 'sending' ? 'Sending...' : formStatus === 'error' ? 'Error - try again' : 'Send Message'}
                </button>
              </form>
            ) : (
              <div className="py-16 text-center">
                <CheckCircle className="w-12 h-12 text-accent mx-auto mb-6" />
                <h3 className="font-serif text-h2 mb-4">Message received.</h3>
                <p className="text-body text-content-secondary mb-3">I'll look at your setup and get back to you within 24–48 hours.</p>
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
