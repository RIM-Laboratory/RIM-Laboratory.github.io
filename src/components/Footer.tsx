import { labInfo } from '../data';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-4">
        <p className="text-gray-500 text-center">
          © {new Date().getFullYear()} {labInfo.name}. All rights reserved.
        </p>
        <p className="text-sm text-gray-400 text-center">
          Built with React & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
