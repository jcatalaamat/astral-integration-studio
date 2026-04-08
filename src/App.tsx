import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FreemiumProvider } from './context/FreemiumContext';
import HomePage from './components/pages/HomePage';
import WorkPage from './components/pages/WorkPage';
import AboutPage from './components/pages/AboutPage';
import ContactPage from './components/pages/ContactPage';
import InsightsPage from './components/pages/InsightsPage';
import BlogPostPage from './components/pages/BlogPostPage';
import AccessPage from './components/pages/AccessPage';
import PractitionersPage from './components/pages/PractitionersPage';
import SchoolsPage from './components/pages/SchoolsPage';
import RetreatsPage from './components/pages/RetreatsPage';
import CommunitiesPage from './components/pages/CommunitiesPage';
import OrganizationsPage from './components/pages/OrganizationsPage';
// CaseStudyPage removed — individual case study pages no longer exist
import HowItWorksPage from './components/pages/HowItWorksPage';
import PricingPage from './components/pages/PricingPage';
import ToolsHub from './components/pages/ToolsHub';
import { LifeOSLanding, LifeOSApp } from './components/pages/life-os';
import { ContentStudioLanding, ContentStudioApp } from './components/pages/content-studio';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <FreemiumProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Agency site */}
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          {/* Individual case study pages removed — cards link to live .xyz domains */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/insights/:slug" element={<BlogPostPage />} />
          <Route path="/access" element={<AccessPage />} />
          <Route path="/practitioners" element={<PractitionersPage />} />
          <Route path="/schools" element={<SchoolsPage />} />
          <Route path="/retreats" element={<RetreatsPage />} />
          <Route path="/communities" element={<CommunitiesPage />} />
          <Route path="/organizations" element={<OrganizationsPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/pricing" element={<PricingPage />} />

          {/* Tools Hub */}
          <Route path="/tools" element={<ToolsHub />} />

          {/* Life OS */}
          <Route path="/tools/life-os" element={<LifeOSLanding />} />
          <Route path="/tools/life-os/app" element={<LifeOSApp />} />

          {/* Content Studio */}
          <Route path="/tools/content-studio" element={<ContentStudioLanding />} />
          <Route path="/tools/content-studio/app" element={<ContentStudioApp />} />

          {/* Legacy redirects */}
          <Route path="/life-os" element={<Navigate to="/tools/life-os" replace />} />
          <Route path="/content-studio" element={<Navigate to="/tools/content-studio" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </FreemiumProvider>
  );
}

export default App;
