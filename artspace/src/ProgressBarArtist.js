//react
import React, { useState } from 'react';
import './styles/ProgressBarArtist.css';

function ProgressBar({ currentStep }) {
  const stepWidth = 100 / 4;
  const progressWidth = `${(currentStep - 1) * stepWidth}%`;
  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: progressWidth }}></div>
    </div>
  );
}

function Step({ label, isActive, isCompleted }) {
  let className = 'step';
  if (isActive) className += ' active';
  if (isCompleted) className += ' completed';

  return <div className={className}>{label}</div>;
}

function ProgressBarArtist() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="ProgrssBarArtist">
      <ProgressBar currentStep={currentStep} />
      <div className="steps">
        <Step label="Start" isActive={currentStep === 1} />
        <Step label="Sketching" isActive={currentStep === 2} isCompleted={currentStep > 2} />
        <Step label="Drawing" isActive={currentStep === 3} isCompleted={currentStep > 3} />
        <Step label="Finalizing" isActive={currentStep === 4} isCompleted={currentStep > 4} />
        <Step label="Complete" isCompleted={currentStep > 5} />
      </div>
      <button onClick={nextStep} className="next-button" disabled={currentStep === 5}>
        Next
      </button>
    </div>
  );
}

export default ProgressBarArtist;
