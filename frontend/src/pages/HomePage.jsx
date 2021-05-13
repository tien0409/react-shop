import { Grid, Paper, Typography, Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../actions/productActions";
import { makeStyles } from "@material-ui/core/styles";
import Message from "../components/Message";
import Product from "../components/Product";
import Spinner from "../components/Spinner";

const useStyles = makeStyles(() => ({
  homeTitle: {
    marginBottom: "1rem",
  },
}));

const HomePage = ({ match }) => {
  const [hover, setHover] = useState(false);
  const [productHover, setProductHover] = useState("");
  const keyword = match.params.keyword;

  const classes = useStyles();
  const dispatch = useDispatch();

  const productsList = useSelector((state) => state.productsList);
  const { loading, products, error } = productsList;

  useEffect(() => {
    dispatch(getAllProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <Container>
      <Typography className={classes.homeTitle} variant="h4">
        Products List
      </Typography>
      {loading && <Spinner />}
      {error && <Message variant="error">{error}</Message>}
      <Grid container spacing={3}>
        {products?.map((product) => (
          <Grid item xs={12} md={3} key={product._id}>
            <Paper
              onMouseOver={() => {
                setHover(true);
                setProductHover(product._id);
              }}
              onMouseOut={() => {
                setHover(false);
                setProductHover("");
              }}
              elevation={hover && product._id === productHover ? 7 : 1}
            >
              <Product product={product} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
