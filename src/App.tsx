/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import News from './components/News';
import Research from './components/Research';
import Team from './components/Team';
import Publications from './components/Publications';
import Patents from './components/Patents';
import Openings from './components/Openings';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import CVPage from './components/CVPage';

export default function App() {
  // Lightweight routing: ?page=cv renders the PI's personal CV page
  // (modeled on megayeye.github.io) instead of the lab home page.
  const [page, setPage] = useState<'home' | 'cv'>(() =>
    new URLSearchParams(window.location.search).get('page') === 'cv' ? 'cv' : 'home'
  );

  useEffect(() => {
    const onPop = () => {
      const p = new URLSearchParams(window.location.search).get('page') === 'cv' ? 'cv' : 'home';
      setPage(p);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  if (page === 'cv') {
    return (
      <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
        <CVPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      <main>
        <Hero />
        <News />
        <Openings />
        <Research />
        <Publications />
        <Team />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
