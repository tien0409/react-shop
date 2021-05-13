import {
  TableContainer,
  Paper,
  TableCell,
  Table,
  TableHead,
  TableBody,
  TableRow,
  Button,
  Container,
} from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import ClearIcon from "@material-ui/icons/Clear";
import Message from "../../components/Message";
import Spinner from "../../components/Spinner";
import { getAllOrdersByAdmin } from "../../actions/orderActions";
import { ORDER_DETAILS_RESET } from "../../constants/orderConstants";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListAdmin = useSelector((state) => state.orderListAdmin);
  const { orders, loading, error } = orderListAdmin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch({ type: ORDER_DETAILS_RESET });
      dispatch(getAllOrdersByAdmin());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <Container>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>USER</TableCell>
                <TableCell>DATE</TableCell>
                <TableCell>TOTAL</TableCell>
                <TableCell>PAID</TableCell>
                <TableCell>DELIVERED</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.user && order.user.name}</TableCell>
                  <TableCell>{order.createdAt}</TableCell>
                  <TableCell>${order.totalPrice}</TableCell>
                  <TableCell>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <ClearIcon />
                    )}
                  </TableCell>
                  <TableCell>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <ClearIcon />
                    )}
                  </TableCell>
                  <TableCell>
                    <Link to={`/order/${order._id}`}>
                      <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                      >
                        Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default OrdersPage;
