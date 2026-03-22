/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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

export default function App() {
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
