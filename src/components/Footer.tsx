export default function Footer() {
  const whoIHelp = [
    { label: 'Practitioners', href: '/practitioners' },
    { label: 'Schools', href: '/schools' },
    { label: 'Retreats', href: '/retreats' },
    { label: 'Communities', href: '/communities' },
    { label: 'Organizations', href: '/organizations' },
  ];

  const workLinks = [
    { label: 'Case Studies', href: '/work' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Insights', href: '/insights' },
  ];

  const companyLinks = [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jcamat/', icon: 'in' },
    { label: 'GitHub', href: 'https://github.com/jcatalaamat', icon: 'gh' },
  ];

  return (
    <footer className="border-t border-border bg-dark-bg">
      <div className="max-w-content mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a
              href="/"
              className="font-serif text-xl font-light tracking-wide text-content-muted"
            >
              Astral <em className="italic text-accent/60">Integration</em>
            </a>
            <p className="text-body-sm text-content-muted mt-4 max-w-[280px]">
              Custom digital infrastructure for schools, practices, retreat centers, and original work.
            </p>
            <p className="text-body-sm text-content-muted mt-4">
              hello@astralintegration.studio
            </p>
          </div>

          {/* Who I Help */}
          <div>
            <p className="text-meta uppercase text-content-muted mb-4 tracking-wider">Who I Help</p>
            <div className="flex flex-col gap-3">
              {whoIHelp.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-body-sm text-content-muted hover:text-accent transition-colors w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Work */}
          <div>
            <p className="text-meta uppercase text-content-muted mb-4 tracking-wider">Work</p>
            <div className="flex flex-col gap-3">
              {workLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-body-sm text-content-muted hover:text-accent transition-colors w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-meta uppercase text-content-muted mb-4 tracking-wider">Company</p>
            <div className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-body-sm text-content-muted hover:text-accent transition-colors w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <p className="text-meta uppercase text-content-muted mb-4 tracking-wider">Connect</p>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-sm text-content-muted hover:text-accent transition-colors w-fit inline-flex items-center gap-2"
                >
                  <span className="w-6 h-6 rounded border border-border flex items-center justify-center text-[0.6rem] font-mono uppercase">{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-body-sm text-content-muted">
            © {new Date().getFullYear()} Astral Integration. Jordi Amat.
          </p>
          <p className="text-meta text-content-muted">
            Built with care in Mazunte, Oaxaca
          </p>
        </div>
      </div>
    </footer>
  );
}
