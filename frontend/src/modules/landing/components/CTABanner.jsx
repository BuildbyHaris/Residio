import React from 'react';
import { Home, ArrowRight } from 'lucide-react';

function CTABanner() {
  return (
    <div className="bg-brand-orange rounded-2xl px-6 md:px-10 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden my-12 md:my-16">
      {/* Decorative circles */}
      <div className="absolute top-4 right-10 w-32 h-32 border-2 border-dashed border-white/20 rounded-full hidden md:block" />
      <div className="absolute -bottom-10 right-40 w-48 h-48 border-2 border-dashed border-white/20 rounded-full hidden md:block" />

      <div className="flex items-center gap-5 relative z-10">
        {/* Icon Badge */}
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0">
          <Home className="w-7 h-7 text-brand-orange" />
        </div>

        <div>
          <h3 className="text-white font-bold text-lg md:text-xl">
            Ready to find your perfect stay?
          </h3>
          <p className="text-white/80 text-sm mt-1">
            Join thousands of students living better with Residio.
          </p>
        </div>
      </div>

      <button className="bg-white text-brand-orange font-medium rounded-full px-6 py-3 flex items-center gap-2 hover:bg-brand-peachLight transition-colors relative z-10 cursor-pointer flex-shrink-0">
        Get Started
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default CTABanner;