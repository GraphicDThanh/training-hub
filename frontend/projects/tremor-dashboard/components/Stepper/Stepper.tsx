// Components
import { Text } from "@tremor/react";

// Types
import { Step } from "@/types";

// Styles
import "@/styles/stepper.css";

interface StepperProps {
  currentStep: number;
  steps: Step[];
  total: number;
  extendClass?: string;
}

const Stepper = ({ currentStep, steps, total, extendClass }: StepperProps) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === total;
  const firstStep = steps[0];
  const lastStep = steps[total - 1];
  const bodySteps = steps.slice(1, total - 1);

  // Fist Item class
  const firstItemRightLineClass = `1234 h-0.5 w-full ${
    isFirstStep ? "bg-zinc-400" : "bg-white"
  }`;

  // Last Item class
  const lastItemLeftLineClass = `h-0.5 w-[50%] ${
    isLastStep ? "bg-white" : "bg-zinc-400"
  }`;
  const lastItemDotClass = isLastStep ? "stepper-dot-active" : "stepper-dot";
  const lastItemTextClass = `stepper-text-content mt-2 ${
    isLastStep ? "text-white" : "text-silver dark:silver"
  }`;

  // Body Item
  const bodyItems = bodySteps.map(step => {
    const stepIndex = step.index;
    const leftLineClass = `h-0.5 w-[50%] ${
      currentStep >= stepIndex ? "bg-white" : "bg-zinc-400"
    }`;
    const dotClass =
      currentStep >= stepIndex ? "stepper-dot-active" : "stepper-dot";
    const rightLineClass = `h-0.5 w-[50%] ${
      currentStep > stepIndex ? "bg-white" : "bg-zinc-400"
    }`;
    const textClass = `stepper-text-content mt-2 ${
      currentStep >= stepIndex ? "text-white" : "text-silver dark:text-silver"
    }`;

    return (
      <li key={step.content} data-testid={`step-content-${step.index}`}>
        <div className="flex items-center w-full h-4">
          {/* Left line */}
          <span className={leftLineClass}></span>
          {/* Dot */}
          <span className={dotClass}></span>
          {/* Right line */}
          <span className={rightLineClass}></span>
        </div>
        <Text
          className={`${textClass} text-xs`}>{`${step.index}. ${step.content}`}</Text>
      </li>
    );
  });

  return (
    <ul
      data-testid="stepper"
      className={`grid grid-cols-${total} pt-6 pb-4 bg-zinc-700 dark:stepper-dark-bg shadow-box-icon-primary rounded-lg absolute -translate-y-10 z-10 w-11/12 dark:bg-gradient-pickled ${extendClass}`}>
      {/* First Item */}
      <li data-testid="step-content-0">
        <div className="flex items-center w-full h-4 pl-[50%]">
          <span className="stepper-dot-active"></span>
          <span className={firstItemRightLineClass}></span>
        </div>
        <Text className="stepper-text-content text-xs text-white mt-2">{`${firstStep.index}. ${firstStep.content}`}</Text>
      </li>
      {/* Body Items */}
      {bodyItems}
      {/* Last Item */}
      <li data-testid="last-step-content">
        <div className="flex items-center w-full h-4">
          <span className={lastItemLeftLineClass}></span>
          <span className={lastItemDotClass}></span>
        </div>
        <p
          className={
            lastItemTextClass
          }>{`${lastStep.index}. ${lastStep.content}`}</p>
      </li>
    </ul>
  );
};

export default Stepper;
