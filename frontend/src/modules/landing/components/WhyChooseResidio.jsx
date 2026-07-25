import React from 'react';
import { features } from '../data/features';
import FeatureCard from './FeatureCard';

function WhyChooseResidio() {
  return (
    <section className="bg-brand-peach py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <h2 className="text-2xl md:text-3xl font-bold text-ink-900 text-center mb-10">
          Why Choose Residio?
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(function (feature) {
            return (
              <FeatureCard
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseResidio;