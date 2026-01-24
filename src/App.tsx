import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import Home from './pages/Home';
import Career from './pages/Career';
import Projects from './pages/Projects';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { ScrollRestoration } from './components/ui/ScrollRestoration';

// Layout wrapper to conditionally show Header/Footer
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isProjectsPage = location.pathname === '/projects';

  return (
    <div className={`flex flex-col ${isProjectsPage ? '' : 'min-h-screen'}`}>
      {/* Scroll to top on route change */}
      <ScrollRestoration />

      {/* Header - always show but with different styling for Projects page */}
      <Header isOverlay={isProjectsPage} />

      {children}

      {/* Footer - hide on Projects page (immersive scroll) */}
      {!isProjectsPage && <Footer />}

      {/* ScrollToTop - hide on Projects page (has its own) */}
      {!isProjectsPage && <ScrollToTop />}
    </div>
  );
}

function App() {
  // ... (keeping existing logic)
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/career" element={<Career />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

