// modules/ownerVerification/components/VerificationStepper.jsx

import React from 'react';
import { HiCheck } from 'react-icons/hi';

const steps = [
  { id: 1, label: 'Personal', shortLabel: 'Personal' },
  { id: 2, label: 'Business', shortLabel: 'Business' },
  { id: 3, label: 'Documents', shortLabel: 'Docs' },
  { id: 4, label: 'Review', shortLabel: 'Review' },
];

const VerificationStepper = ({ currentStep, completedSteps }) => {
  return (
    <div className="w-full max-w-lg mx-auto mb-8 md:mb-10">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.has(step.id);
          const isCurrent = currentStep === step.id;
          const isPast = currentStep > step.id;

          return (
            <React.Fragment key={step.id}>
              {/* Step Circle + Label */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`
                    w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center 
                    font-semibold text-sm transition-all duration-500 ease-out
                    ${
                      isCompleted || isPast
                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                        : isCurrent
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 ring-4 ring-orange-100'
                        : 'bg-gray-100 text-gray-400'
                    }
                  `}
                >
                  {isCompleted || isPast ? (
                    <HiCheck className="w-5 h-5 animate-scaleIn" />
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={`
                    mt-2 text-xs font-medium transition-colors duration-300
                    ${
                      isCurrent
                        ? 'text-orange-500'
                        : isCompleted || isPast
                        ? 'text-green-600'
                        : 'text-gray-400'
                    }
                  `}
                >
                  <span className="hidden sm:inline">{step.label}</span>
                  <span className="sm:hidden">{step.shortLabel}</span>
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 md:mx-3 h-0.5 rounded-full bg-gray-100 relative -mt-5">
                  <div
                    className="absolute inset-y-0 left-0 bg-green-500 rounded-full transition-all duration-700 ease-out"
                    style={{
                      width:
                        isPast || isCompleted
                          ? '100%'
                          : isCurrent
                          ? '50%'
                          : '0%',
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default VerificationStepper;