import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Samples from './pages/Samples';
import Research from './pages/Research';
import Schools from './pages/Schools';
import Privacy from './pages/Privacy';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import ResultPage from './pages/ResultPage';
import CertificatePage from './pages/CertificatePage';
import MyResultsPage from './pages/MyResultsPage';
import Layout from '@/components/empathy/Layout';
// Add page imports here

const PreviewApp = () => {
  // Render the main app
  return (
    <Routes>
      {/* Add your page Route elements here */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/result/:id" element={<ResultPage />} />
        <Route path="/result/:id/certificate" element={<CertificatePage />} />
        <Route path="/results" element={<MyResultsPage />} />
        <Route path="/samples" element={<Samples />} />
        <Route path="/research" element={<Research />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};


function App() {

  return (
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <PreviewApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
  )
}

export default App