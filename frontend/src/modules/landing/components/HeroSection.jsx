import React from 'react';
import SearchWidget from './SearchWidget';
import StatItem from './StatItem';
import heroImage from "../../../assets/hero.png";

function HeroSection() {
  return (
    <section className="bg-brand-peach">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Column */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-ink-900 leading-tight">
              Find. Book. Live.
              <br />
              Your <span className="text-brand-orange">Perfect Stay.</span>
            </h1>
            <p className="mt-4 text-ink-500 text-sm md:text-base max-w-md">
              Discover verified hostels & PGs near your college or workplace — book in minutes.
            </p>

            <SearchWidget />

            <div className="flex items-center gap-8 mt-8">
              <StatItem icon="shield-check" value="500+" label="Verified Properties" />
              <StatItem icon="smile" value="10,000+" label="Happy Residents" />
            </div>
          </div>

          {/* Right Column */}
          <div className="hidden md:block">
            <div className="rounded-2xl overflow-hidden">
              <img
                src={heroImage}
                alt="Happy residents at Residio"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;