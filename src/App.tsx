import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { About } from './components/About';
import { Inventory } from './components/Inventory';
import { Founders } from './components/BoardMembers';
import { Contact } from './components/Contact';
import { ProjectAdvisors } from './components/ProjectAdvisors';
import { Toaster } from 'sonner';
import { LoadingScreen } from './components/LoadingScreen';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Router>
              <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                <Navigation />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/about/founders" element={<Founders />} />
                    <Route path="/about/advisors" element={<ProjectAdvisors />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </main>
                <Toaster position="top-right" />
              </div>
            </Router>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
