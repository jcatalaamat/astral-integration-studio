import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { CheckCircle } from 'lucide-react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';

export default function ContactPage() {
  useDocumentMeta({
    title: 'Contact — Astral Integration',
    description: 'Tell me about your work. I take on a small number of partnerships at a time — healers, schools, retreat centers, and original work that needs custom digital infrastructure.',
    ogUrl: 'https://astralintegration.studio/contact',
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    referral: '',
  });
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
    if (!formData.message.trim()) newErrors.message = 'Tell me a bit about your work';
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
          subject: 'New Inquiry from Contact Page',
          message: formData.message + (formData.referral ? `\n\nHow they found me: ${formData.referral}` : ''),
        },
        'v57Ta98pwBDWpoe8o'
      );
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '', referral: '' });
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
      <section className="pt-40 pb-16 px-6 md:px-12">
        <div className="max-w-content mx-auto">
          <p className="text-meta uppercase text-accent mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-accent" />
            Contact
          </p>
          <h1 className="font-serif text-display font-light mb-8 max-w-[800px]">
            Tell me about <em className="italic gradient-text">your work.</em>
          </h1>
          <p className="text-body text-content-secondary max-w-prose">
            I take on a small number of partnerships at a time. If you've created something original and need a technical partner who builds with you for the long haul, I'd like to hear about it.
          </p>
          <p className="text-body-sm text-content-muted mt-4 max-w-prose">
            No pitch. No pressure. Just a conversation about what you need and whether I can help.
          </p>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="pb-section px-6 md:px-12">
        <div className="max-w-content mx-auto reveal" ref={addRevealRef}>
          <div className="grid md:grid-cols-[1fr_360px] gap-12 md:gap-16 items-start">
            {/* Form */}
            <div>
              {formStatus !== 'success' ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-body-sm text-content-muted mb-3">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-5 py-4 bg-dark-card border rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors ${
                          formErrors.name ? 'border-red-400 focus:ring-red-400/20' : 'border-border'
                        }`}
                        placeholder="Your name"
                      />
                      {formErrors.name && <p className="mt-2 text-body-sm text-red-400">{formErrors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-body-sm text-content-muted mb-3">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-5 py-4 bg-dark-card border rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors ${
                          formErrors.email ? 'border-red-400 focus:ring-red-400/20' : 'border-border'
                        }`}
                        placeholder="your@email.com"
                      />
                      {formErrors.email && <p className="mt-2 text-body-sm text-red-400">{formErrors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-body-sm text-content-muted mb-3">
                      What are you working on?
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className={`w-full px-5 py-4 bg-dark-card border rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors resize-none ${
                        formErrors.message ? 'border-red-400 focus:ring-red-400/20' : 'border-border'
                      }`}
                      placeholder="Tell me about your work, your people, and what you're trying to build..."
                    />
                    {formErrors.message && <p className="mt-2 text-body-sm text-red-400">{formErrors.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="referral" className="block text-body-sm text-content-muted mb-3">
                      How did you find me? <span className="text-content-muted/60">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="referral"
                      value={formData.referral}
                      onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
                      className="w-full px-5 py-4 bg-dark-card border border-border rounded-xl text-content-primary placeholder-content-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors"
                      placeholder="Referral, search, social media..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="px-10 py-4 bg-accent text-white rounded-full text-body-sm font-medium btn-glow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'sending' ? 'Sending...' : formStatus === 'error' ? 'Error — try again' : 'Send Message'}
                  </button>
                </form>
              ) : (
                <div className="py-16 text-center bg-dark-card border border-border rounded-2xl">
                  <CheckCircle className="w-12 h-12 text-accent mx-auto mb-6" />
                  <h3 className="font-serif text-h2 mb-4">Message received.</h3>
                  <p className="text-body text-content-secondary mb-3">
                    I'll get back to you within 24–48 hours.
                  </p>
                  <p className="text-body-sm text-content-muted mb-8">
                    Check your inbox for a reply from hello@astralintegration.studio
                  </p>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="text-body-sm text-accent hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Calendly */}
              <div className="bg-dark-card border border-accent/30 rounded-2xl p-8">
                <h3 className="font-serif text-h3 mb-3">Prefer to talk live?</h3>
                <p className="text-body-sm text-content-secondary mb-6">
                  Book a free 30-minute strategy call. No pitch — just a conversation about your work and what the right infrastructure might look like.
                </p>
                <a
                  href="https://cal.astralintegration.studio/astral/discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-accent text-white rounded-full text-body-sm font-medium btn-glow"
                >
                  Book a Call
                </a>
              </div>

              {/* Email */}
              <div className="bg-dark-card border border-border rounded-2xl p-8">
                <h3 className="font-serif text-h3 mb-3">Email directly</h3>
                <a
                  href="mailto:hello@astralintegration.studio"
                  className="text-body-sm text-accent hover:text-content-primary transition-colors"
                >
                  hello@astralintegration.studio
                </a>
              </div>

              {/* Links */}
              <div className="bg-dark-card border border-border rounded-2xl p-8">
                <h3 className="font-serif text-h3 mb-4">Find me</h3>
                <div className="flex gap-6">
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

              {/* Note */}
              <div className="bg-dark-card border border-border rounded-2xl p-8">
                <p className="text-body-sm text-content-muted leading-relaxed">
                  I take on a small number of partnerships at a time to give each project the attention it deserves. Not every inquiry becomes a project — but every inquiry gets a thoughtful response.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
