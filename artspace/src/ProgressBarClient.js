//react
import React, { useState } from 'react';
import './styles/ProgressBarClient.css';

function ProgressBarClient() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const getStepInfo = (step) => {
    switch (step) {
      case 1:
        return "Starting the artwork.";
      case 2:
        return "Sketching the initial design.";
      case 3:
        return "Creating the detailed drawing.";
      case 4:
        return "Finalizing and adding finishing touches.";
      case 5:
        return "Artwork is complete!";
      default:
        return "";
    }
  };

  return (
    <div className="progressC-body">
      <div className="progressC-container">
        <div className="progressC-bar" style={{ width: `${(currentStep - 1) * 25}%` }}></div>
      </div>

      <div className="stepsC">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i + 1} className={`stepC ${currentStep === i + 1 ? 'active' : (currentStep > i + 1 ? 'completed' : '')}`} onClick={() => setCurrentStep(i + 1)}>
            {i === 0 ? 'Start' : (i === 4 ? 'Complete' : `Step ${i}`)}
          </div>
        ))}
      </div>

      <div className="step-dialogC">
        <p>{getStepInfo(currentStep)}</p>
      </div>

      <button onClick={nextStep} className="next-buttonC" disabled={currentStep === 5}>Next</button>
    </div>
  );
}

export default ProgressBarClient;
