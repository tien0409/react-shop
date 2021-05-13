import {
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutStep from "../components/CheckoutStep";

const ShippingPage = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (shippingAddress) {
      setAddress(shippingAddress.address);
      setCity(shippingAddress.city);
      setPostalCode(shippingAddress.postalCode);
      setCountry(shippingAddress.country);
    }
  }, [shippingAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <Container>
      <Grid container justify="center">
        <Grid item md={6} xs={12}>
          <CheckoutStep step1 step2 />

          <form onSubmit={handleSubmit}>
            <div className="form__group">
              <FormControl fullWidth>
                <TextField
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  name="address"
                  type="text"
                  variant="outlined"
                  id="address"
                  label="Address"
                />
              </FormControl>
            </div>
            <div className="form__group">
              <FormControl fullWidth>
                <TextField
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  name="city"
                  type="text"
                  variant="outlined"
                  id="city"
                  label="City"
                />
              </FormControl>
            </div>
            <div className="form__group">
              <FormControl fullWidth>
                <TextField
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  name="postalCode"
                  type="text"
                  variant="outlined"
                  id="postalCode"
                  label="Postal Code"
                />
              </FormControl>
            </div>
            <div className="form__group">
              <FormControl fullWidth>
                <TextField
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  name="country"
                  type="text"
                  variant="outlined"
                  id="country"
                  label="Country"
                />
              </FormControl>
            </div>

            <Button
              disabled={!address || !city || !postalCode || !country}
              type="submit"
              variant="contained"
              color="primary"
            >
              Continue
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShippingPage;
