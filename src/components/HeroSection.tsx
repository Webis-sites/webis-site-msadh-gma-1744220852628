'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  // Handle RTL setup
  useEffect(() => {
    document.documentElement.dir = 'rtl';
  }, []);

  return (
    <section 
      className={clsx(
        'relative h-screen w-full overflow-hidden',
        className
      )}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="מסעדה גמא - תמונת רקע"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center md:px-8">
        {/* Glassmorphism Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto shadow-glass"
        >
          {/* Hero Title */}
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            מסעדה מוביל בישראל
          </motion.h1>
          
          {/* Hero Description */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            חווית לקוח מושלמת בכל ביקור
          </motion.p>
          
          {/* CTA Button - Neumorphic Style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <button 
              className="
                px-8 py-4 text-lg md:text-xl font-bold rounded-full
                text-white bg-gradient-to-r from-primary to-secondary
                shadow-neumorphic hover:shadow-neumorphic-hover active:shadow-neumorphic-pressed
                transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0
                focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
              "
            >
              קבע תור עכשיו
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;