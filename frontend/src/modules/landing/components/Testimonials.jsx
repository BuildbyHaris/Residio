import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import TestimonialCard from './TestimonialCard';

function Testimonials() {
  return (
    <section className="bg-brand-peach py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-ink-900">
            What Students Say
          </h2>
          <a
            href="#view-all"
            className="text-brand-orange font-medium text-sm flex items-center gap-1 hover:text-brand-orangeDark transition-colors"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center z-10 hover:bg-brand-peachLight transition-colors cursor-pointer hidden md:flex">
            <ChevronLeft className="w-5 h-5 text-ink-700" />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(function (testimonial) {
              return (
                <TestimonialCard
                  key={testimonial.id}
                  quote={testimonial.quote}
                  name={testimonial.name}
                  college={testimonial.college}
                  avatar={testimonial.avatar}
                  rating={testimonial.rating}
                />
              );
            })}
          </div>

          {/* Right Arrow */}
          <button className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center z-10 hover:bg-brand-peachLight transition-colors cursor-pointer hidden md:flex">
            <ChevronRight className="w-5 h-5 text-ink-700" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-orange" />
          <span className="w-2.5 h-2.5 rounded-full bg-border-light" />
          <span className="w-2.5 h-2.5 rounded-full bg-border-light" />
        </div>
      </div>
    </section>
  );
}

export default Testimonials;