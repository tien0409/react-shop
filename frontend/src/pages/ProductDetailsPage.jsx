import {
  Button,
  Chip,
  Container,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  NativeSelect,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import RatingCustom from "../components/Rating";
import {
  createProductReview,
  getProductDetails,
} from "../actions/productActions";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { useHistory, useParams } from "react-router";
import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_CREATE_REVIEW_RESET,
} from "../constants/productConstants";
import { Rating } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
  infoOptions: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: "0.75rem 0",
  },
  reviews: {
    marginLeft: "1rem",
  },
  nameProduct: {
    fontWeight: 600,
  },
  priceProduct: {
    fontWeight: 800,
    margin: "10px 0",
  },
  infoSpecial: {
    marginTop: "1rem",
  },
  infoProductSpecial: {
    margin: "0.5rem 0",
  },
  quantity: {
    display: "flex",
    alignItems: "center",
    marginTop: "1rem",
  },
  quantityLabel: {
    marginRight: "1rem",
  },
  btnGroup: {
    marginTop: "1rem",
  },
}));

const ProductDetailsPage = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, success, error, product } = productDetails;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    loading: loadingReview,
    success: successReview,
    error: errorReview,
  } = productCreateReview;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  if (success) {
    product.shippingPrice = product.price > 100 ? 0 : 10;
  }

  useEffect(() => {
    if (successReview) {
      alert("Reviewed Submitted");
      setComment("");
      setRating(0);
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));

    return () => {
      dispatch({ type: PRODUCT_DETAILS_RESET });
    };
  }, [dispatch, id, successReview]);

  const handleAddToCart = () => {
    if (!userInfo) {
      history.push("/login?redirect=cart");
    } else {
      history.push(`/cart/${id}?qty=${qty}`);
    }
  };

  const handleReview = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, comment, +rating));
  };

  return (
    <Container>
      <Grid container spacing={5} justify="center">
        {loading && <Spinner />}
        {error && <Message variant="error">{error}</Message>}
        {success && (
          <>
            <Grid item md={6}>
              <img
                style={{ width: "100%", objectFit: "cover" }}
                src={product.image}
                alt={product.name}
              />
            </Grid>
            <Grid item md={6}>
              <Typography className={classes.nameProduct} variant="h6">
                {product.name}
              </Typography>
              <Typography className={classes.infoOptions} variant="subtitle2">
                <RatingCustom rating={product.rating} />
                <Chip
                  className={classes.reviews}
                  label={`${product.reviews.length} review`}
                />
              </Typography>

              <hr />

              <Typography className={classes.priceProduct} variant="h6">
                ${addDecimals(product.price)}
              </Typography>
              <Typography variant="body2">{product.description}</Typography>

              <Grid className={classes.infoSpecial} container>
                <Grid className={classes.infoProductSpecial} item container>
                  <Grid md={4} item>
                    <strong>Weight</strong>
                  </Grid>
                  <Grid md={8} item>
                    2.00 LBS
                  </Grid>
                </Grid>
                <Grid className={classes.infoProductSpecial} item container>
                  <Grid md={4} item>
                    <strong>Gift wrapping: </strong>
                  </Grid>
                  <Grid md={8} item>
                    Options available
                  </Grid>
                </Grid>
                <Grid className={classes.infoProductSpecial} item container>
                  <Grid md={4} item>
                    <strong>Shipping:</strong>
                  </Grid>
                  <Grid md={8} item>
                    ${addDecimals(product.shippingPrice)}
                  </Grid>
                </Grid>
              </Grid>

              <div className={classes.quantity}>
                <InputLabel
                  className={classes.quantityLabel}
                  htmlFor="select__qty"
                >
                  Quantity
                </InputLabel>
                <NativeSelect
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  inputProps={{ name: "qty", id: "select__qty" }}
                >
                  {[...Array(product.countInStock).keys()].map((i) => (
                    <option value={i + 1} key={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </NativeSelect>
              </div>

              <Grid className={classes.btnGroup} item container spacing={3}>
                <Grid item md={6}>
                  <Button
                    onClick={handleAddToCart}
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Add To Cart
                  </Button>
                </Grid>
                <Grid item md={6}>
                  <Button fullWidth variant="contained" color="default">
                    Review
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid md={12} item>
              <h2>Review</h2>
              {product.reviews.length === 0 && (
                <Message variant="info">No Reviews</Message>
              )}

              <List>
                {product.reviews.map((review) => (
                  <ListItem
                    style={{
                      alignItems: "flex-start",
                      flexDirection: "column",
                    }}
                    key={review._id}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <strong>{review.name}</strong>
                      <RatingCustom rating={review.rating} />
                    </div>
                    <p>{review.comment}</p>
                  </ListItem>
                ))}
                <ListItem
                  style={{ flexDirection: "column", alignItems: "flex-start" }}
                >
                  <h2>Write a Customer Review</h2>
                  {userInfo ? (
                    <form
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <FormControl>
                        <FormLabel>Rating</FormLabel>
                        <NativeSelect
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          inputProps={{ name: "rating", id: "select__rating" }}
                        >
                          <option value="">Select...</option>
                          <option value={1}>1 - Poor</option>
                          <option value={2}>2 - Fair</option>
                          <option value={3}>3 - Good</option>
                          <option value={4}>4 - Very Good</option>
                          <option value={5}>5 - Excellent</option>
                        </NativeSelect>
                      </FormControl>

                      <FormControl style={{ margin: "10px 0" }}>
                        <FormLabel>Comment</FormLabel>
                        <TextareaAutosize
                          onChange={(e) => setComment(e.target.value)}
                          value={comment}
                          rowsMin={5}
                        />
                      </FormControl>

                      <Button
                        onClick={handleReview}
                        type="button"
                        variant="contained"
                        color="secondary"
                      >
                        Submit
                      </Button>
                      {loadingReview && <Spinner />}
                      {errorReview && (
                        <Message variant="error">{errorReview}</Message>
                      )}
                    </form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a reviews
                    </Message>
                  )}
                </ListItem>
              </List>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default ProductDetailsPage;
