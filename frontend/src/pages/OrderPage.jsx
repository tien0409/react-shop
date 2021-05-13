import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import {
  deliverOrder,
  orderDetailsById,
  payOrder,
} from "../actions/orderActions";
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
} from "@material-ui/core";
import {
  ORDER_DELIVER_RESET,
  ORDER_DETAILS_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
import { PayPalButton } from "react-paypal-button-v2";
import { makeStyles } from "@material-ui/core/styles";
import { CART_RESET } from "../constants/cartConstants";
import { removeCart } from "../actions/cartActions";

const useStyles = makeStyles(() => ({
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const OrderPage = () => {
  const [sdkReady, setSdkReady] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successDeliver || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch({ type: ORDER_DETAILS_RESET });
      dispatch(orderDetailsById(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, history, order, userInfo, successPay, successDeliver]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
    dispatch(removeCart());
  };

  const handleDeliver = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Spinner />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <Container>
      <h1 style={{ padding: "0 16px" }}>Order {order._id}</h1>
      <hr style={{ marginLeft: "16px" }} />
      <Grid container spacing={3}>
        <Grid item md={8}>
          <List>
            <ListItem
              style={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <h2 style={{ marginBottom: "0.75rem" }}>Shipping</h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  color: "#666",
                }}
              >
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>Name: </strong>
                  {order.user.name}
                </p>
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>Email: </strong>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>Address: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
              </div>

              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="error">Not Delivered</Message>
              )}
            </ListItem>

            <ListItem
              style={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <h2 style={{ marginBottom: "0.75rem" }}>Payment Method</h2>
              <p style={{ marginBottom: "0.5rem", color: "#666" }}>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="error">Not Paid</Message>
              )}
            </ListItem>

            <ListItem>
              <Table>
                {order.orderItems.length === 0 ? (
                  <Message variant="error">Order is empty</Message>
                ) : (
                  <TableBody>
                    {order.orderItems.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          <Avatar
                            variant="square"
                            alt={item.name}
                            src={item.image}
                          />
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/product/${item.product}`}
                            style={{
                              fontSize: 19,
                              color: "#222",
                            }}
                          >
                            {item.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </ListItem>
          </List>
        </Grid>

        <Grid item md={4}>
          <Card>
            <List>
              <ListItem style={{ justifyContent: "center" }} divider>
                <h2>Order Summary</h2>
              </ListItem>

              <ListItem className={classes.listItem} divider>
                <h3>Items</h3>
                <div>${order.itemsPrice}</div>
              </ListItem>

              <ListItem className={classes.listItem} divider>
                <h3>Shipping</h3>
                <div>${order.shippingPrice}</div>
              </ListItem>

              <ListItem className={classes.listItem} divider>
                <h3>Tax</h3>
                <div>${order.taxPrice}</div>
              </ListItem>

              <ListItem className={classes.listItem}>
                <h3>Total</h3>
                <div>${order.totalPrice}</div>
              </ListItem>

              {!order.isPaid && (
                <ListItem style={{ flexDirection: "column" }}>
                  {!sdkReady ? (
                    <Spinner />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={handleSuccessPayment}
                    />
                  )}
                  {loadingPay && <Spinner />}
                </ListItem>
              )}

              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListItem>
                    <Button
                      fullWidth
                      type="button"
                      variant="contained"
                      color="primary"
                      onClick={handleDeliver}
                    >
                      Mark As Delivered
                    </Button>
                  </ListItem>
                )}
              {loadingDeliver && <Spinner />}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderPage;
