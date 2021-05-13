import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import RatingCustom from "./Rating";

const useStyles = makeStyles(() => ({
  imageProduct: {
    height: "130px",
  },
}));

const Product = ({ product }) => {
  const classes = useStyles();

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  return (
    <Card>
      <CardMedia
        className={classes.imageProduct}
        src={product.image}
        image={product.image}
        title="product name"
      />
      <CardContent>
        <Typography variant="h5">
          <strong>{product.name}</strong>
        </Typography>
        <Typography variant="body2">
          {product.description}
          <br />
        </Typography>
        <RatingCustom rating={product.rating} />
        <Typography variant="body2">
          <strong>${addDecimals(product.price)}</strong>
        </Typography>
      </CardContent>
      <CardActions>
        <Grid justify="flex-end" container>
          <Link style={{ textAlign: "right" }} to={`products/${product._id}`}>
            <Button color="primary" variant="contained">
              Details
            </Button>
          </Link>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default Product;
