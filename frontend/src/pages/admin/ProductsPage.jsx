import {
  TableContainer,
  Paper,
  TableCell,
  Table,
  TableHead,
  TableBody,
  TableRow,
  IconButton,
  Snackbar,
  Button,
  Container,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Message from "../../components/Message";
import Spinner from "../../components/Spinner";
import { deleteProduct, getAllProducts } from "../../actions/productActions";
import { PRODUCT_DELETE_RESET } from "../../constants/productConstants";

const useStyles = makeStyles((theme) => ({
  colorError: {
    color: theme.palette.error.light,
  },
  anchorOrigin: {
    position: "absolute",
    top: "80vh",
  },
}));

const ProductsPage = () => {
  const [openToast, setOpenToast] = useState(false);
  const [message, setMessage] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const productsList = useSelector((state) => state.productsList);
  const { loading, products, error } = productsList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    error: errorDelete,
    loading: loadingDelete,
    success: successDelete,
    message: messageDelete,
  } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successDelete) {
      setMessage(messageDelete);
      setOpenToast(true);
      dispatch({ type: PRODUCT_DELETE_RESET });
    } else {
      if (userInfo && userInfo.isAdmin) {
        dispatch(getAllProducts());
      } else {
        history.push("/login");
      }
    }
  }, [dispatch, history, successDelete, userInfo, messageDelete]);

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure?")) {
      setMessage("");
      dispatch(deleteProduct(id));
      setOpenToast(true);
    }
  };

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
                <TableCell>Name</TableCell>
                <TableCell>PRICE</TableCell>
                <TableCell>COUNT IN STOCk</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product._id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell align="center">{product.countInStock}</TableCell>
                  <TableCell>
                    <div className={classes.groupBtn}>
                      <Link to={`/admin/product/${product._id}`}>
                        <IconButton color="primary">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton
                        onClick={() => handleDeleteProduct(product._id)}
                        className={classes.colorError}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar
        className={classes.anchorOrigin}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openToast && !loading && !loadingDelete}
        onClose={(e) => setOpenToast(false)}
        message={message && message}
        autoHideDuration={3000}
      />

      <Button
        onClick={() => history.push("/admin/product/new")}
        color="primary"
        variant="contained"
      >
        Create Product
      </Button>

      {loadingDelete && <Spinner />}
      {errorDelete && <Message variant="error">{errorDelete}</Message>}
    </Container>
  );
};

export default ProductsPage;
