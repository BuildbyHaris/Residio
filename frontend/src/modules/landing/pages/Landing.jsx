import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import PopularStays from '../components/PopularStays';
import WhyChooseResidio from '../components/WhyChooseResidio';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div className="font-sans text-ink-900">
      <Navbar />
      <HeroSection />
      <PopularStays />
      <WhyChooseResidio />
      <HowItWorks />
      <Testimonials />
      <div className="px-6 md:px-10 max-w-7xl mx-auto">
        <CTABanner />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;