import { useState, type ReactNode } from 'react';
import { publications, researchAreas, labInfo } from '../data';
import {
  Mail, GraduationCap, Github, BookOpen, ExternalLink, User, MapPin,
  ChevronDown, ChevronUp, FileText, Code, Video, Globe, Home,
} from 'lucide-react';

/**
 * Personal CV page for the PI (Chenxi Xiao), modeled on megayeye.github.io.
 * Single-page layout: sticky left sidebar (photo + contact) + main content
 * (About, Research, Publications, Contact). Shares data with the lab site.
 * Routed via ?page=cv from App.tsx.
 */
// Deterministic colored tag: each keyword string hashes to one palette color,
// so the same keyword always renders in the same color (see Publications.tsx).
const TAG_PALETTE = [
  'bg-rose-100 text-rose-700',
  'bg-indigo-100 text-indigo-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-sky-100 text-sky-700',
  'bg-violet-100 text-violet-700',
  'bg-teal-100 text-teal-700',
  'bg-orange-100 text-orange-700',
  'bg-fuchsia-100 text-fuchsia-700',
  'bg-cyan-100 text-cyan-700',
];
function tagColor(tag: string) {
  let h = 0;
  for (let i = 0; i < tag.length; i++) h = (h * 31 + tag.charCodeAt(i)) >>> 0;
  return TAG_PALETTE[h % TAG_PALETTE.length];
}

export default function CVPage() {
  const pi = labInfo; // PI metadata lives in labInfo
  const [pubsExpanded, setPubsExpanded] = useState(false);
  const visiblePubs = pubsExpanded ? publications : publications.slice(0, 5);

  const highlightAuthor = (authorsStr: string) => {
    const parts = authorsStr.split(new RegExp(`(${pi.piName})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === pi.piName.toLowerCase()
        ? <strong key={i} className="font-semibold text-gray-900">{part}</strong>
        : part
    );
  };

  return (
    <div className="cv-page min-h-screen bg-white text-gray-900">
      {/* Top nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 h-15 flex items-center justify-between py-3">
          <a href="#cv-top" className="text-lg font-extrabold tracking-tight">
            Chenxi<span className="text-indigo-600">.</span>
          </a>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#cv-about" className="hover:text-gray-900 transition-colors">About</a>
            <a href="#cv-research" className="hover:text-gray-900 transition-colors">Research</a>
            <a href="#cv-publications" className="hover:text-gray-900 transition-colors">Publications</a>
            <a href="#cv-contact" className="hover:text-gray-900 transition-colors">Contact</a>
            <a href="/" className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700">
              <Home size={15} /> Lab
            </a>
          </div>
        </div>
      </nav>

      <div id="cv-top" className="max-w-6xl mx-auto px-5 py-9 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 items-start">

        {/* ---------- Sidebar ---------- */}
        <aside className="md:sticky md:top-24 flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src="/images/members/chenxi_bio.PNG"
            alt="Chenxi Xiao"
            className="w-44 md:w-56 aspect-square object-cover rounded-2xl border border-gray-200 bg-gray-50"
            referrerPolicy="no-referrer"
          />
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight">Chenxi Xiao, PhD</h1>
          <p className="text-indigo-600 font-semibold">Assistant Professor</p>
          <p className="text-gray-600 text-sm mt-0.5">
            School of Information Science and Technology<br />ShanghaiTech University
          </p>
          <p className="text-gray-500 text-sm mt-1">SIST 1D-303, Shanghai</p>

          <div className="flex flex-wrap gap-1.5 justify-center md:justify-start mt-4 mb-5">
            {pi.interests.map((tag: string) => (
              <span key={tag} className="text-xs font-medium text-gray-700 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <ul id="cv-contact" className="flex flex-col gap-2.5 text-sm w-full">
            <ContactRow href={`mailto:${pi.email.replace('[at]', '@')}`} icon={<Mail size={16} />}>
              {pi.email}
            </ContactRow>
            <ContactRow href={pi.scholarUrl} icon={<GraduationCap size={16} />}>Google Scholar</ContactRow>
            <ContactRow href={pi.githubUrl} icon={<Github size={16} />}>GitHub</ContactRow>
            <ContactRow href="http://orcid.org/0000-0002-7819-9633" icon={<BookOpen size={16} />}>ORCID</ContactRow>
            <ContactRow href="https://rim-laboratory.github.io/" icon={<ExternalLink size={16} />}>RIM Lab</ContactRow>
          </ul>
        </aside>

        {/* ---------- Main ---------- */}
        <main className="min-w-0">

          {/* About */}
          <section id="cv-about" className="pb-9">
            <h2 className="text-2xl font-extrabold tracking-tight mb-3">About</h2>
            <p className="text-gray-700 leading-relaxed">
              Dr. Chenxi Xiao is an Assistant Professor in the School of Information Science and Technology (SIST)
              at ShanghaiTech University, where he leads the{' '}
              <a href="https://rim-laboratory.github.io/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline">
                Robot Interaction and Manipulation (RIM) Lab
              </a>. Prior to joining ShanghaiTech, he received his Ph.D. from Purdue University, where he worked
              in the Intelligent Systems and Assistive Technologies (ISAT) Laboratory under the supervision of
              Prof. Juan Wachs.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              His research centers on giving robots a rich sense of touch — spanning{' '}
              <strong className="font-semibold text-gray-900">visuo-tactile sensing</strong>,{' '}
              <strong className="font-semibold text-gray-900">dexterous manipulation</strong>,{' '}
              <strong className="font-semibold text-gray-900">tactile sensors</strong>,{' '}
              <strong className="font-semibold text-gray-900">embodied data collection &amp; synthesis</strong>,
              and <strong className="font-semibold text-gray-900">teleoperation</strong>. He develops autonomous
              frameworks for efficient tactile exploration and object manipulation, and designs tactile sensors
              and haptic interfaces that convey physical sensation back to humans.
            </p>
          </section>

          {/* Research */}
          <section id="cv-research" className="border-t border-gray-100 pt-8 pb-9">
            <h2 className="text-2xl font-extrabold tracking-tight mb-1">Research Areas</h2>
            <p className="text-gray-600 mb-5">Themes running through the lab's work.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {researchAreas.map((area: any) => (
                <div key={area.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                  <img src={area.image} alt={area.title} className="w-full h-36 object-cover bg-gray-50" loading="lazy" referrerPolicy="no-referrer" />
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2">{area.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{area.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Publications */}
          <section id="cv-publications" className="border-t border-gray-100 pt-8 pb-9">
            <h2 className="text-2xl font-extrabold tracking-tight mb-1">Publications</h2>
            <p className="text-gray-600 mb-5">
              Selected publications in robotics, tactile sensing, dexterous manipulation, and embodied AI.{' '}
              <em className="text-gray-500">(<strong className="text-gray-700 not-italic">Chenxi Xiao</strong> highlighted in author lists.)</em>
            </p>
            <div className="flex flex-col gap-4">
              {visiblePubs.map((pub: any) => (
                <article key={pub.id} className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-5 bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-shadow">
                  <img src={pub.image} alt={pub.title} className="w-full h-32 sm:h-full object-cover rounded-xl bg-gray-50" loading="lazy" referrerPolicy="no-referrer" />
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 leading-snug mb-2">{pub.title}</h3>
                    <p className="text-sm text-gray-600 mb-1.5">{highlightAuthor(pub.authors)}</p>
                    <p className="text-xs font-semibold text-indigo-600 mb-3">{pub.venue} ({pub.year})</p>
                    {pub.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {pub.tags.map((tag: string) => (
                          <span key={tag} className={`px-2 py-0.5 rounded-full text-xs font-medium ${tagColor(tag)}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {pub.abstract && pub.abstract !== "Abstract not available from DBLP. Please update manually." && (
                      <p className="text-sm text-gray-500 leading-relaxed mb-3">{pub.abstract}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {pub.links?.pdf && pub.links.pdf !== '#' && (
                        <a href={pub.links.pdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors">
                          <FileText size={14} /> PDF
                        </a>
                      )}
                      {pub.links?.code && (
                        <a href={pub.links.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors">
                          <Code size={14} /> Code
                        </a>
                      )}
                      {pub.links?.webpage && (
                        <a href={pub.links.webpage} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors">
                          <Globe size={14} /> Webpage
                        </a>
                      )}
                      {pub.links?.video && (
                        <a href={pub.links.video} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors">
                          <Video size={14} /> Video
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {publications.length > 5 && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setPubsExpanded(!pubsExpanded)}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                >
                  {pubsExpanded ? <>Show less <ChevronUp size={16} /></> : <>Show more <ChevronDown size={16} /></>}
                </button>
              </div>
            )}
          </section>

          {/* Contact */}
          <section id="cv-contact" className="border-t border-gray-100 pt-8 pb-12">
            <h2 className="text-2xl font-extrabold tracking-tight mb-4">Contact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <ContactCard icon={<Mail size={18} />} label="Email">
                <a href={`mailto:${pi.email.replace('[at]', '@')}`} className="text-indigo-600 hover:text-indigo-700">{pi.email}</a>
              </ContactCard>
              <ContactCard icon={<MapPin size={18} />} label="Address">{pi.address}</ContactCard>
              <ContactCard icon={<User size={18} />} label="Scholar">
                <a href={pi.scholarUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700">Google Scholar profile</a>
              </ContactCard>
              <ContactCard icon={<ExternalLink size={18} />} label="Lab">
                <a href="https://rim-laboratory.github.io/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700">RIM Lab, ShanghaiTech</a>
              </ContactCard>
            </div>
          </section>
        </main>
      </div>

      <footer className="border-t border-gray-100 py-7 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Chenxi Xiao ·{' '}
        <a href="https://rim-laboratory.github.io/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600">RIM Lab</a>, ShanghaiTech University
      </footer>
    </div>
  );
}

function ContactRow({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  return (
    <li>
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-gray-700 hover:text-indigo-600 transition-colors break-all">
        <span className="text-gray-400 flex-none">{icon}</span>
        <span>{children}</span>
      </a>
    </li>
  );
}

function ContactCard({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-xl p-4">
      <span className="text-indigo-600 mt-0.5">{icon}</span>
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">{label}</p>
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  );
}
