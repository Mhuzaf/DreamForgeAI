import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './components/ui/theme-provider';
import { Toaster } from './components/ui/toaster';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import FAQPage from './pages/FAQ';
import MyCreationsPage from './pages/MyCreations';
import NotFound from './pages/NotFound';
import { CreditsProvider } from './contexts/CreditsContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { FeatureAccessProvider } from './contexts/FeatureAccessContext';
import UpgradePopup from './components/UpgradePopup';

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <SubscriptionProvider>
        <FeatureAccessProvider>
          <CreditsProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <Router>
                <div className="min-h-screen bg-background font-sans antialiased">
                  <Toaster />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/my-creations" element={<MyCreationsPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <UpgradePopup />
                </div>
              </Router>
            </ThemeProvider>
          </CreditsProvider>
        </FeatureAccessProvider>
      </SubscriptionProvider>
    </QueryClientProvider>
  );
}

export default App;
