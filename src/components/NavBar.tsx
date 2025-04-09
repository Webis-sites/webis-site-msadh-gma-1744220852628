'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface NavItem {
  name: string;
  href: string;
  label: string;
}

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { name: 'home', href: '/', label: 'בית' },
    { name: 'menu', href: '/menu', label: 'תפריט' },
    { name: 'gallery', href: '/gallery', label: 'גלריה' },
    { name: 'about', href: '/about', label: 'אודות' },
    { name: 'booking', href: '/booking', label: 'הזמנת מקום' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 dir-rtl',
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-neumorphic-light'
          : 'bg-white/50 backdrop-blur-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-primary font-bold text-2xl">
              <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                מסעדה גמא
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 rtl:space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'relative px-5 py-2 rounded-lg text-base font-medium transition-all duration-200',
                  'hover:text-primary hover:scale-105',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50',
                  'mx-1',
                  pathname === item.href
                    ? 'text-primary shadow-neumorphic-inset bg-white/90'
                    : 'text-gray-700 shadow-neumorphic-light bg-white/70'
                )}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
            <button
              className="px-5 py-2 rounded-lg text-white font-medium transition-all duration-200
                         bg-gradient-to-r from-primary to-secondary shadow-neumorphic
                         hover:shadow-neumorphic-hover hover:scale-105
                         focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            >
              הזמנה עכשיו
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className={clsx(
                'inline-flex items-center justify-center p-2 rounded-md',
                'text-gray-700 hover:text-primary hover:bg-gray-100',
                'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary',
                'transition-all duration-200 shadow-neumorphic',
                isOpen && 'shadow-neumorphic-inset'
              )}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">
                {isOpen ? 'סגור תפריט' : 'פתח תפריט'}
              </span>
              {isOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
              className="px-2 pt-2 pb-3 space-y-2 bg-white/90 backdrop-blur-md shadow-inner"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <Link
                    href={item.href}
                    className={clsx(
                      'block px-4 py-3 rounded-md text-base font-medium text-right',
                      'transition-all duration-200',
                      pathname === item.href
                        ? 'text-primary bg-white/80 shadow-neumorphic-inset'
                        : 'text-gray-700 hover:text-primary hover:bg-gray-50 shadow-neumorphic-light'
                    )}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <button
                  className="w-full mt-3 px-4 py-3 rounded-md text-white font-medium text-right
                           bg-gradient-to-r from-primary to-secondary shadow-neumorphic
                           hover:shadow-neumorphic-hover active:shadow-neumorphic-inset
                           transition-all duration-200"
                >
                  הזמנה עכשיו
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;