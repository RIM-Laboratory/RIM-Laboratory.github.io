import { labInfo } from '../data';
import { Github, Youtube, GraduationCap, Building2, Mail, MapPin } from 'lucide-react';

// Bilibili has no lucide icon — use its recognisable TV logo as inline SVG.
function BilibiliIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.249-.56.373-.933.373s-.684-.124-.933-.373c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.387-.947.258-.257.574-.386.946-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.249-.56.373-.933.373s-.684-.124-.933-.373c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z" />
    </svg>
  );
}

// Skip placeholder links — bare-domain roots like "https://twitter.com/" with no
// real profile path. Keep explicitly-set lab links (bilibili/youtube) even if bare.
const isPlaceholder = (url?: string) => {
  if (!url) return true;
  const u = url.trim();
  // Only treat as placeholder if it's a bare domain root AND not one of our lab links.
  if (!/^https?:\/\/[^/]+\/?$/i.test(u)) return false;
  return !/bilibili|youtube|shanghaitech/i.test(u);
};

export default function Footer() {
  const socials = [
    { url: labInfo.githubUrl, label: 'GitHub', icon: <Github size={24} /> },
    { url: labInfo.youtubeUrl, label: 'YouTube', icon: <Youtube size={24} /> },
    { url: labInfo.bilibiliUrl, label: 'Bilibili', icon: <BilibiliIcon size={24} /> },
    { url: labInfo.scholarUrl, label: 'Google Scholar', icon: <GraduationCap size={24} /> },
  ].filter((s) => !isPlaceholder(s.url));

  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-5">
        {/* Lab name + institution (linked to school page) */}
        <div className="text-center space-y-1">
          <p className="text-gray-700 font-semibold">{labInfo.name}</p>
          <a
            href={labInfo.institutionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <Building2 size={14} />
            {labInfo.institution}
          </a>
        </div>

        {/* Contact line */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-gray-500">
          <a
            href={`mailto:${labInfo.email.replace('[at]', '@')}`}
            className="inline-flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
          >
            <Mail size={15} /> {labInfo.email}
          </a>
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={15} /> {labInfo.address}
          </span>
        </div>

        {/* Social icon row */}
        {socials.length > 0 && (
          <div className="flex items-center justify-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 border border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-md transition-all"
              >
                {s.icon}
              </a>
            ))}
          </div>
        )}

        <p className="text-gray-400 text-center text-sm">
          © {new Date().getFullYear()} {labInfo.name}. All rights reserved.
        </p>
        <p className="text-xs text-gray-300 text-center">
          Built with React & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
