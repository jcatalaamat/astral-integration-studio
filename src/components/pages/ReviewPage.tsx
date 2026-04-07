import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { CheckCircle } from 'lucide-react';
import Navigation from '../Navigation';
import Footer from '../Footer';

export default function ReviewPage() {
  useEffect(() => {
    document.title = 'Digital Realignment Review — Astral Integration';
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    work: '',
    engagement: '',
    unclear: '',
    becoming: '',
    clarity: '',
    links: '',
    whyNow: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.work.trim()) newErrors.work = 'Required';
    if (!formData.engagement.trim()) newErrors.engagement = 'Required';
    if (!formData.unclear.trim()) newErrors.unclear = 'Required';
    if (!formData.links.trim()) newErrors.links = 'Required';
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
          subject: 'Digital Realignment Review Request',
          message: `
DIGITAL REALIGNMENT REVIEW REQUEST

Name: ${formData.name}
Email: ${formData.email}

1. THE WORK
${formData.work}

2. HOW PEOPLE ENGAGE
${formData.engagement}

3. WHAT FEELS UNCLEAR/HEAVY/OUT OF SYNC
${formData.unclear}

4. WHAT THE WORK IS BECOMING
${formData.becoming || '(not answered)'}

5. WHAT CLARITY WOULD HELP DECIDE
${formData.clarity || '(not answered)'}

6. LINKS
${formData.links}

7. WHY NOW
${formData.whyNow || '(not answered)'}
          `.trim(),
        },
        'v57Ta98pwBDWpoe8o'
      );
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        work: '',
        engagement: '',
        unclear: '',
        becoming: '',
        clarity: '',
        links: '',
        whyNow: ''
      });
      setFormErrors({});
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-studio-bg font-sans">
      <Navigation />

      {/* HERO */}
      <section className="min-h-[70vh] flex items-center">
        <div className="max-w-content mx-auto px-6 md:px-12 py-32 md:py-40">
          <div className="max-w-3xl">
            <h1 className="text-display-sm md:text-display text-content-primary mb-8">
              Digital Realignment Review
            </h1>
            <p className="text-body text-content-secondary mb-12">
              Clarity, before further decisions
            </p>

            <p className="text-h2 md:text-h1 text-content-primary font-medium max-w-2xl">
              If your work already exists but your digital presence feels unclear or out of sync, this review helps you see what is actually happening and where coherence can be restored.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT THIS IS */}
      <section className="py-28 md:py-36 bg-studio-bgAlt">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="max-w-prose">
            <p className="text-meta text-content-tertiary uppercase tracking-wider mb-6">
              What This Is
            </p>

            <p className="text-body text-content-secondary leading-relaxed mb-12">
              A focused review of your current digital presence.
            </p>

            <p className="text-body text-content-secondary leading-relaxed mb-8">
              I look at:
            </p>

            <ul className="space-y-3 mb-12">
              {[
                'your website or digital home',
                'how your work is described',
                'how people are invited to engage',
                'the structure of your offerings',
                'the systems supporting the work'
              ].map((item, i) => (
                <li key={i} className="text-body text-content-secondary flex items-start gap-3">
                  <span className="text-accent mt-1.5 text-sm">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-lg text-content-primary font-medium">
              I reflect back what I see, highlighting patterns, gaps, and points of friction.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL RECEIVE */}
      <section className="py-28 md:py-36">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="max-w-prose">
            <p className="text-meta text-content-tertiary uppercase tracking-wider mb-6">
              What You'll Receive
            </p>

            <p className="text-body text-content-secondary leading-relaxed mb-8">
              A concise diagnosis that clarifies:
            </p>

            <ul className="space-y-3 mb-12">
              {[
                'how the work is currently coming across',
                'where meaning or value is diluted',
                'how people are likely engaging or disengaging',
                'what feels unnecessary or unresolved',
                'what the work appears ready to become',
                'what decision would restore coherence'
              ].map((item, i) => (
                <li key={i} className="text-body text-content-secondary flex items-start gap-3">
                  <span className="text-accent mt-1.5 text-sm">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-body text-content-secondary leading-relaxed mb-3">
              Delivered as:
            </p>
            <p className="text-body text-content-primary leading-relaxed">
              a written review, or a short Loom walkthrough
            </p>
          </div>
        </div>
      </section>

      {/* SCOPE */}
      <section className="py-28 md:py-36 bg-studio-bgAlt">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="max-w-prose">
            <p className="text-meta text-content-tertiary uppercase tracking-wider mb-6">
              Scope
            </p>

            <p className="text-lg text-content-primary font-medium">
              A contained review designed to create orientation and direction.
            </p>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="py-28 md:py-36">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="max-w-prose">
            <p className="text-meta text-content-tertiary uppercase tracking-wider mb-6">
              Who This Is For
            </p>

            <p className="text-body text-content-secondary leading-relaxed mb-8">
              Useful if:
            </p>

            <ul className="space-y-3 mb-12">
              {[
                'the work already exists',
                'you feel unsure how to present or offer it',
                'your systems no longer match the work',
                'you want to decide your next move with clarity'
              ].map((item, i) => (
                <li key={i} className="text-body text-content-secondary flex items-start gap-3">
                  <span className="text-accent mt-1.5 text-sm">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PRACTICAL DETAILS */}
      <section className="py-28 md:py-36 bg-studio-bgAlt">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="max-w-prose">
            <p className="text-meta text-content-tertiary uppercase tracking-wider mb-6">
              Practical Details
            </p>

            <ul className="space-y-0 mb-12">
              {[
                'Asynchronous',
                'Turnaround: 5–7 days',
                'Context provided via intake form'
              ].map((item, i) => (
                <li key={i} className="text-body text-content-primary py-4 border-b border-studio-divider last:border-b-0">
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-h2 text-content-primary font-medium">
              €450
            </p>
          </div>
        </div>
      </section>

      {/* INTAKE FORM */}
      <section id="intake" className="py-28 md:py-36">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="max-w-prose">
            <p className="text-meta text-content-tertiary uppercase tracking-wider mb-6">
              Request a Review
            </p>

            <p className="text-body text-content-secondary leading-relaxed mb-12">
              Complete the intake form below. I'll confirm fit and next steps by email.
            </p>

            {formStatus !== 'success' ? (
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Name & Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-body-sm text-content-tertiary mb-3">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-5 py-4 bg-studio-bgAlt border text-content-primary placeholder-content-tertiary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors ${
                        formErrors.name ? 'border-red-400' : 'border-studio-divider'
                      }`}
                      placeholder="Your name"
                    />
                    {formErrors.name && <p className="mt-2 text-body-sm text-red-400">{formErrors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-body-sm text-content-tertiary mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-5 py-4 bg-studio-bgAlt border text-content-primary placeholder-content-tertiary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors ${
                        formErrors.email ? 'border-red-400' : 'border-studio-divider'
                      }`}
                      placeholder="your@email.com"
                    />
                    {formErrors.email && <p className="mt-2 text-body-sm text-red-400">{formErrors.email}</p>}
                  </div>
                </div>

                {/* Question 1 */}
                <div>
                  <label htmlFor="work" className="block text-body text-content-primary mb-2">
                    1. Briefly describe the work you're currently doing.
                  </label>
                  <p className="text-body-sm text-content-tertiary mb-3">
                    What exists today, not what you hope it becomes.
                  </p>
                  <textarea
                    id="work"
                    value={formData.work}
                    onChange={(e) => setFormData({ ...formData, work: e.target.value })}
                    rows={4}
                    className={`w-full px-5 py-4 bg-studio-bgAlt border text-content-primary placeholder-content-tertiary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors resize-none ${
                      formErrors.work ? 'border-red-400' : 'border-studio-divider'
                    }`}
                  />
                  {formErrors.work && <p className="mt-2 text-body-sm text-red-400">{formErrors.work}</p>}
                </div>

                {/* Question 2 */}
                <div>
                  <label htmlFor="engagement" className="block text-body text-content-primary mb-2">
                    2. How do people engage with it right now?
                  </label>
                  <p className="text-body-sm text-content-tertiary mb-3">
                    Website, sessions, products, programs, community, etc.
                  </p>
                  <textarea
                    id="engagement"
                    value={formData.engagement}
                    onChange={(e) => setFormData({ ...formData, engagement: e.target.value })}
                    rows={4}
                    className={`w-full px-5 py-4 bg-studio-bgAlt border text-content-primary placeholder-content-tertiary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors resize-none ${
                      formErrors.engagement ? 'border-red-400' : 'border-studio-divider'
                    }`}
                  />
                  {formErrors.engagement && <p className="mt-2 text-body-sm text-red-400">{formErrors.engagement}</p>}
                </div>

                {/* Question 3 */}
                <div>
                  <label htmlFor="unclear" className="block text-body text-content-primary mb-2">
                    3. What feels unclear, heavy, or out of sync?
                  </label>
                  <p className="text-body-sm text-content-tertiary mb-3">
                    In your digital presence or offerings.
                  </p>
                  <textarea
                    id="unclear"
                    value={formData.unclear}
                    onChange={(e) => setFormData({ ...formData, unclear: e.target.value })}
                    rows={4}
                    className={`w-full px-5 py-4 bg-studio-bgAlt border text-content-primary placeholder-content-tertiary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors resize-none ${
                      formErrors.unclear ? 'border-red-400' : 'border-studio-divider'
                    }`}
                  />
                  {formErrors.unclear && <p className="mt-2 text-body-sm text-red-400">{formErrors.unclear}</p>}
                </div>

                {/* Question 4 */}
                <div>
                  <label htmlFor="becoming" className="block text-body text-content-primary mb-2">
                    4. What do you feel the work is becoming?
                  </label>
                  <p className="text-body-sm text-content-tertiary mb-3">
                    Even if it's not fully formed. (Optional)
                  </p>
                  <textarea
                    id="becoming"
                    value={formData.becoming}
                    onChange={(e) => setFormData({ ...formData, becoming: e.target.value })}
                    rows={4}
                    className="w-full px-5 py-4 bg-studio-bgAlt border border-studio-divider text-content-primary placeholder-content-tertiary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors resize-none"
                  />
                </div>

                {/* Question 5 */}
                <div>
                  <label htmlFor="clarity" className="block text-body text-content-primary mb-2">
                    5. What would clarity help you decide right now?
                  </label>
                  <p className="text-body-sm text-content-tertiary mb-3">
                    (Optional)
                  </p>
                  <textarea
                    id="clarity"
                    value={formData.clarity}
                    onChange={(e) => setFormData({ ...formData, clarity: e.target.value })}
                    rows={4}
                    className="w-full px-5 py-4 bg-studio-bgAlt border border-studio-divider text-content-primary placeholder-content-tertiary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors resize-none"
                  />
                </div>

                {/* Question 6 */}
                <div>
                  <label htmlFor="links" className="block text-body text-content-primary mb-2">
                    6. Links
                  </label>
                  <p className="text-body-sm text-content-tertiary mb-3">
                    Website, socials, products, documents — whatever is relevant.
                  </p>
                  <textarea
                    id="links"
                    value={formData.links}
                    onChange={(e) => setFormData({ ...formData, links: e.target.value })}
                    rows={3}
                    className={`w-full px-5 py-4 bg-studio-bgAlt border text-content-primary placeholder-content-tertiary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors resize-none ${
                      formErrors.links ? 'border-red-400' : 'border-studio-divider'
                    }`}
                  />
                  {formErrors.links && <p className="mt-2 text-body-sm text-red-400">{formErrors.links}</p>}
                </div>

                {/* Question 7 */}
                <div>
                  <label htmlFor="whyNow" className="block text-body text-content-primary mb-2">
                    7. Why are you seeking this review at this moment?
                  </label>
                  <p className="text-body-sm text-content-tertiary mb-3">
                    (Optional)
                  </p>
                  <textarea
                    id="whyNow"
                    value={formData.whyNow}
                    onChange={(e) => setFormData({ ...formData, whyNow: e.target.value })}
                    rows={4}
                    className="w-full px-5 py-4 bg-studio-bgAlt border border-studio-divider text-content-primary placeholder-content-tertiary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="px-10 py-4 bg-content-primary text-studio-bg hover:bg-content-primary/90 active:bg-content-primary/80 transition-colors text-body font-medium disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-content-primary/50 focus:ring-offset-2 focus:ring-offset-studio-bg"
                >
                  {formStatus === 'sending' ? 'Sending...' : formStatus === 'error' ? 'Error - try again' : 'Submit Request'}
                </button>
              </form>
            ) : (
              <div className="py-16 px-8 bg-studio-bgAlt border border-studio-divider text-center">
                <CheckCircle className="w-8 h-8 text-accent mx-auto mb-6" />
                <h3 className="text-h2 text-content-primary mb-4">Request received</h3>
                <p className="text-body text-content-secondary mb-3">
                  I'll respond within 48 hours to confirm and share payment details.
                </p>
                <p className="text-body-sm text-content-tertiary">
                  Check your inbox (and spam folder) for a reply from hello@astralintegration.studio
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="py-28 md:py-36 bg-studio-bgAlt">
        <div className="max-w-content mx-auto px-6 md:px-12">
          <div className="max-w-prose">
            <p className="text-body text-content-secondary leading-relaxed mb-8">
              Clarity changes what decisions feel possible.
            </p>
            <p className="text-lg text-content-primary font-medium">
              This review is designed to restore that clarity.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
