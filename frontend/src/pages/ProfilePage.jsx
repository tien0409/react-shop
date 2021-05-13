import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getAllOrders } from "../actions/orderActions";
import { getUserDetails, updateUserDetails } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { ORDER_DETAILS_RESET } from "../constants/orderConstants";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const {
    user,
    loading: loadingUserDetails,
    error: errorUserDetails,
  } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, success: successUpdate } = userUpdate;

  const orderList = useSelector((state) => state.orderList);
  const {
    orders,
    loading: loadingOrderList,
    error: errorOrderList,
  } = orderList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || successUpdate) {
        dispatch({ type: USER_UPDATE_RESET });
        dispatch(getUserDetails(userInfo._id));
        dispatch(getAllOrders());
      } else {
        dispatch({ type: ORDER_DETAILS_RESET });
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, dispatch, history, user, successUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    } else {
      dispatch(
        updateUserDetails({
          _id: userInfo._id,
          name,
          password,
          email,
        }),
      );
    }
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item md={4}>
          {loadingUserDetails ? (
            <Spinner />
          ) : errorUserDetails ? (
            <Message variant="error">{errorUserDetails}</Message>
          ) : (
            <>
              <h2 style={{ marginBottom: "1rem" }}>User Profile</h2>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1rem" }}>
                  <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    name="name"
                    type="text"
                    variant="outlined"
                    id="name"
                    label="Name"
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    name="email"
                    type="email"
                    variant="outlined"
                    id="email"
                    label="Email"
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    name="password"
                    type="password"
                    variant="outlined"
                    id="password"
                    label="Password"
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <TextField
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    name="confirmPassword"
                    type="password"
                    variant="outlined"
                    id="confirmPassword"
                    label="Confirm Password"
                  />
                </div>
                <Button type="submit" variant="contained" color="primary">
                  Update
                </Button>

                {loadingUpdate && <Spinner />}
              </form>
            </>
          )}
        </Grid>

        <Grid item md={8}>
          {loadingOrderList ? (
            <Spinner />
          ) : errorOrderList ? (
            <Message variant="error">{errorOrderList}</Message>
          ) : (
            <>
              <h2 style={{ marginBottom: "1rem" }}>My Orders</h2>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>DATE</TableCell>
                      <TableCell>TOTAL</TableCell>
                      <TableCell>PAID</TableCell>
                      <TableCell>DELIVERED</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell>{order._id}</TableCell>
                        <TableCell>
                          {order.createdAt.substring(0, 10)}
                        </TableCell>
                        <TableCell>{order.totalPrice}</TableCell>
                        <TableCell>
                          {order.isPaid ? <CheckIcon /> : <ClearIcon />}
                        </TableCell>
                        <TableCell>
                          {order.isDelivered ? <CheckIcon /> : <ClearIcon />}
                        </TableCell>
                        <TableCell>
                          <Link to={`/order/${order._id}`}>
                            <Button variant="contained" color="primary">
                              Details
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
