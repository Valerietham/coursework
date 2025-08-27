import { useState } from 'react';
import { Menu } from 'lucide-react';
import Lottie from '@lottielab/lottie-player/react';
import AuthenticationButton from './buttons/AuthenticationButton';

interface HeaderProps {
  title: string;
}

// Note: The responsive header has been completed although contents in individual homepage section is yet to be configured (about, adopt, contact).
// Update code as necessary when those sections are ready or remove the links if not needed.

const Header = ({ title }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="py-2 px-4 bg-gray-50 flex-shrink-0 sticky top-0 flex justify-between items-center relative z-20">
      {/* Logo and Name */}
      <div className="flex items-center">
        <Lottie
          src="https://cdn.lottielab.com/l/D72eg98GYPHH2m.json"
          className="h-10 w-10 mr-2"
          autoplay
        />
        <h1 className="text-xl text-orange-900 font-semibold text-left text-gray-800">
          {title}
        </h1>
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8">
        <a
          href="#about"
          className="text-gray-700 hover:text-orange-800 px-3 py-2 text-sm font-medium transition-colors"
        >
          About
        </a>
        <a
          href="#adopt"
          className="text-gray-700 hover:text-orange-800 px-3 py-2 text-sm font-medium transition-colors"
        >
          Adopt
        </a>
        <a
          href="#contact"
          className="text-gray-700 hover:text-orange-800 px-3 py-2 text-sm font-medium transition-colors"
        >
          Contact
        </a>
        <AuthenticationButton />
      </div>

      {/* Mobile Controls */}
      <div className="flex md:hidden items-center space-x-2">
        <AuthenticationButton />
        <button
          type="button"
          aria-label="Open menu"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          className="p-2 rounded-md text-gray-700 hover:text-orange-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-300"
          onClick={() => setIsOpen((v) => !v)}
        >
          <Menu />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="absolute top-full left-0 right-0 bg-white shadow-md border-t border-gray-100 md:hidden"
        >
          <nav className="flex flex-col py-2">
            <a
              href="#about"
              className="px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-800"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="#adopt"
              className="px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-800"
              onClick={() => setIsOpen(false)}
            >
              Adopt
            </a>
            <a
              href="#contact"
              className="px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-orange-800"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
