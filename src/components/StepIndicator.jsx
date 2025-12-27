import React from 'react';

const StepIndicator = ({ steps, currentStep }) => {
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-slate-400 font-display uppercase tracking-widest">
                    Step {currentStep + 1} of {steps.length}
                </span>
                <span className="text-xs font-black text-slate-900 font-display tracking-wide">
                    {steps[currentStep]}
                </span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                {steps.map((_, index) => (
                    <div
                        key={index}
                        className={`h-full flex-1 transition-all duration-500 ease-out border-r border-white/50 last:border-none 
              ${index <= currentStep ? 'bg-slate-900' : 'bg-transparent'}
              ${index === currentStep ? 'bg-emerald-500' : ''}
            `}
                    />
                ))}
            </div>
        </div>
    );
};

export default StepIndicator;
