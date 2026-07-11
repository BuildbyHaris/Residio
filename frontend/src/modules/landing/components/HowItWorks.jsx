import React from 'react';
import { steps } from '../data/steps';
import StepCard from './StepCard';
import StepConnector from './StepConnector';

function HowItWorks() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <h2 className="text-2xl md:text-3xl font-bold text-ink-900 text-center mb-12">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row items-start md:items-start justify-center gap-8 md:gap-4">
          {steps.map(function (step, index) {
            return (
              <React.Fragment key={step.id}>
                <StepCard
                  stepNumber={step.stepNumber}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                />
                {index < steps.length - 1 && <StepConnector />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;