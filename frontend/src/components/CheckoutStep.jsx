import { Step, StepLabel, Stepper } from "@material-ui/core";

const steps = ["Sign in", "Shipping", "Payment", "Place Order"];

const CheckoutStep = (props) => {
  const activeStep = Object.keys(props).length - 1;

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default CheckoutStep;
