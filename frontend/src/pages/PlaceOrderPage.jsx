import {
  Avatar,
  Button,
  Card,
  Container,
  Grid,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutStep from "../components/CheckoutStep";
import { useEffect } from "react";
import { createOrder } from "../actions/orderActions";
import Spinner from "../components/Spinner";

const PlaceOrderPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, loading: loadingCreate, success: successCreate } = orderCreate;

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 500 ? 0 : 20);
  cart.taxPrice = addDecimals(Number(0.15 * cart.itemsPrice).toFixed(2));
  cart.totalPrice = addDecimals(
    (
      Number(cart.itemsPrice) +
      Number(cart.shippingPrice) +
      Number(cart.taxPrice)
    ).toFixed(2),
  );

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/order/${order._id}`);
    }
  }, [successCreate, history, userInfo, order]);

  const handlePlaceOrder = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        itemsPrice: cart.itemsPrice,
      }),
    );
  };

  return (
    <Container>
      <CheckoutStep step1 step2 step3 step4 />
      <Grid container spacing={3}>
        <Grid item md={8}>
          <div style={{ marginBottom: "1rem" }}>
            <h2>Shipping</h2>
            <p>
              <strong>Address: </strong>
              {shippingAddress.address}, {shippingAddress.city},{" "}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <h2>Payment Method</h2>
            <strong>Method: </strong>
            {paymentMethod}
          </div>

          <div>
            <h2>Order Items</h2>
            <Table>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.product}>
                    <TableCell>
                      <Avatar
                        alt={item.name}
                        src={item.image}
                        variant="square"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        <Link to={`/products/${item._id}`}>{item.name}</Link>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Grid>

        <Grid item md={4}>
          <Card>
            <List>
              <ListItem divider>
                <h2>Order Summary</h2>
              </ListItem>
              <ListItem
                divider
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h4>Items</h4>
                <div>${cart.itemsPrice}</div>
              </ListItem>

              <ListItem
                divider
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h4>Shipping</h4>
                <div>${cart.shippingPrice}</div>
              </ListItem>

              <ListItem
                divider
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h4>Total</h4>
                <div>${cart.totalPrice}</div>
              </ListItem>

              <ListItem
                divider
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h4>Items</h4>
                <div>${cart.itemsPrice}</div>
              </ListItem>

              <ListItem style={{ display: "flex" }}>
                <Button
                  fullWidth
                  disabled={cartItems.length === 0}
                  onClick={handlePlaceOrder}
                  type="button"
                  variant="contained"
                  color="primary"
                >
                  Place Order
                </Button>
              </ListItem>
              {loadingCreate && <Spinner />}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlaceOrderPage;
