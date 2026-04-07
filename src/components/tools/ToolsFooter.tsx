import { Link } from 'react-router-dom';
import { TOOLS } from '../../config/tools';
import AstralBranding from './AstralBranding';

export default function ToolsFooter() {
  const toolsList = Object.values(TOOLS);

  return (
    <footer className="border-t border-border bg-dark-bg">
      <div className="max-w-content mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Branding */}
          <div className="flex flex-col gap-4">
            <Link
              to="/tools"
              className="font-serif text-xl font-light text-content-muted hover:text-content-secondary transition-colors"
            >
              Astral <em className="italic text-accent/60">Tools</em>
            </Link>
            <p className="text-body-sm text-content-muted max-w-xs">
              Free tools for soul-led businesses. Built with love.
            </p>
          </div>

          {/* Tools Links */}
          <div className="flex flex-col gap-3">
            <span className="text-meta uppercase text-content-muted mb-2">Tools</span>
            {toolsList.map((tool) => (
              <Link
                key={tool.id}
                to={tool.path}
                className="text-body-sm text-content-secondary hover:text-content-primary transition-colors"
              >
                {tool.icon} {tool.name}
              </Link>
            ))}
          </div>

          {/* Agency Link */}
          <div className="flex flex-col gap-3">
            <span className="text-meta uppercase text-content-muted mb-2">Need More?</span>
            <Link
              to="/"
              className="text-body-sm text-content-secondary hover:text-accent transition-colors"
            >
              Custom Development
            </Link>
            <a
              href="https://cal.astralintegration.studio/astral/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="text-body-sm text-accent hover:text-accent-soft transition-colors"
            >
              Book a Strategy Call
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-body-sm text-content-muted">
            © {new Date().getFullYear()} Astral Integration
          </p>
          <AstralBranding />
        </div>
      </div>
    </footer>
  );
}
