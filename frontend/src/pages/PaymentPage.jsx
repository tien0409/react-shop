import {
  Button,
  Container,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutStep from "../components/CheckoutStep";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMedthod] = useState("PayPal");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <Container>
      <Grid justify="center" container>
        <Grid item md={6} xs={12}>
          <CheckoutStep step1 step2 step3 />
          <Typography variant="h3" style={{ marginBottom: "1rem" }}>
            Payment Method
          </Typography>

          <form onSubmit={handleSubmit}>
            <FormLabel component="legend">Select Method</FormLabel>
            <RadioGroup name="paymentMethod" value={paymentMethod}>
              <FormControlLabel
                value={paymentMethod}
                control={<Radio />}
                label="PayPal"
              />
            </RadioGroup>

            <Button type="submit" variant="contained" color="primary">
              Continue
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PaymentPage;
