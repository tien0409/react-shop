import DeleteIcon from "@material-ui/icons/Delete";
import {
  Avatar,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  NativeSelect,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { addToCart, removeItemFromCart } from "../actions/cartActions";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { useQuery } from "../utils/useQuery";

const useStyles = makeStyles((theme) => ({
  itemAvatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  linkItem: {
    color: "#111",
  },
}));

const CartPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const qtyParams = useQuery().get("qty");
  const qty = qtyParams ? Number(qtyParams) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!userInfo) {
    history.push("/login");
  }

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [id, qty, dispatch]);

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const handleCheckout = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item md={8}>
          <h1 style={{ marginLeft: "16px", marginBottom: "1rem" }}>
            Shopping Cart
          </h1>
          {cartItems.length === 0 ? (
            <Message variant="info">
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <Table>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.product}>
                    <TableCell>
                      <Avatar
                        className={classes.itemAvatar}
                        alt={item.name}
                        src={item.image}
                        variant="square"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        <Link
                          className={classes.linkItem}
                          to={`/products/${item.product}`}
                        >
                          {item.name}
                        </Link>
                      </Typography>
                    </TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>
                      <NativeSelect
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value)),
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((i) => (
                          <option value={i + 1} key={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </NativeSelect>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleRemoveItem(item._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Grid>

        <Grid item md={4}>
          <Card>
            <List>
              <ListItem
                divider
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="h5">
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </Typography>
                <Typography variant="h5">
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.price * qty, 0)
                    .toFixed(2)}
                </Typography>
              </ListItem>

              <ListItem style={{ display: "flex" }}>
                <Button
                  onClick={handleCheckout}
                  fullWidth
                  disabled={cartItems.length === 0}
                  type="button"
                  variant="contained"
                  color="primary"
                >
                  Proceed To CheckOut
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
