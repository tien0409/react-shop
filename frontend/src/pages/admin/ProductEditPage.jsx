import {
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, updateProduct } from "../../actions/productActions";
import Spinner from "../../components/Spinner";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import { getAllCategories } from "../../actions/categoryActions";
import { PRODUCT_UPDATE_RESET } from "../../constants/productConstants";
import ButtonBack from "../../components/ButtonBack";

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: "1rem",
    marginBottom: "1.5rem",
    fontWeight: "bolder",
  },
  formSelect: {
    minWidth: "140px",
  },
}));

const ProductEditPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categorySelect, setCategorySelect] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState(1);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    message: messageUpdate,
  } = productUpdate;

  const categoriesList = useSelector((state) => state.categoriesList);
  const { categories } = categoriesList;

  if (!userInfo || !userInfo.isAdmin) {
    history.push("/login");
  }

  useEffect(() => {
    if (!product || product?._id !== id) {
      dispatch(getProductDetails(id));
    } else if (!categories) {
      dispatch(getAllCategories());
    } else {
      setName(product.name);
      setDescription(product.description);
      setBrand(product.brand);
      setPrice(product.price);
      setCountInStock(product.countInStock);
      setCategorySelect(categories[0]._id);
    }

    return () => {
      dispatch({ type: PRODUCT_UPDATE_RESET });
    };
  }, [dispatch, product, categories, id]);

  const handleUploadFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: product._id,
        name,
        description,
        brand,
        image,
        price,
        countInStock,
        categoryId: categorySelect,
      }),
    );
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <FormContainer>
          <ButtonBack
            style={{ marginLeft: "1rem", marginBottom: "1rem" }}
            to="/admin/products"
          />

          <Typography className={classes.title} variant="h3">
            Update Product
          </Typography>
          <form style={{ padding: "0 1rem" }} onSubmit={handleUpdateProduct}>
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                name="description"
                type="text"
                variant="outlined"
                id="description"
                label="Description"
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <TextField
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                fullWidth
                name="brand"
                type="text"
                variant="outlined"
                id="brand"
                label="Brand"
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <TextField
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                name="price"
                type="number"
                variant="outlined"
                id="price"
                label="Price"
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <TextField
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                fullWidth
                name="countInStock"
                type="number"
                variant="outlined"
                id="countInStock"
                label="Count In Stock"
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <FormControl className={classes.formSelect} variant="filled">
                <InputLabel htmlFor="category">Category</InputLabel>
                <Select
                  native
                  value={categorySelect}
                  onChange={(e) => setCategorySelect(e.target.value)}
                  inputProps={{
                    name: "category",
                    id: "category",
                  }}
                >
                  {categories?.map((category) => (
                    <option
                      key={category.name}
                      aria-label={category.name}
                      value={category._id}
                    >
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <TextField
                disabled
                fullWidth
                type="text"
                variant="outlined"
                value={image}
                id="image"
                label="Image Path"
              />
              <input
                style={{ display: "none" }}
                type="file"
                name="image"
                id="button-file"
                onChange={handleUploadFile}
              />
              <label htmlFor="button-file">
                {uploading ? (
                  <Spinner />
                ) : (
                  <Button variant="contained" component="span">
                    Upload Image
                  </Button>
                )}
              </label>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </div>

            {loadingUpdate && <Spinner />}
            {messageUpdate && (
              <Message variant="success">{messageUpdate}</Message>
            )}
            {errorUpdate && <Message variant="error">{errorUpdate}</Message>}
          </form>
        </FormContainer>
      )}
    </>
  );
};

export default ProductEditPage;
