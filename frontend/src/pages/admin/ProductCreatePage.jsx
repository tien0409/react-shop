import {
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../actions/productActions";
import Spinner from "../../components/Spinner";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import { getAllCategories } from "../../actions/categoryActions";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstants";
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

const ProductCreatePage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categorySelect, setCategorySelect] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState(1);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const categoriesList = useSelector((state) => state.categoriesList);
  const { categories, loading, error } = categoriesList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    message: messageCreate,
    error: errorCreate,
    loading: loadingCreate,
    success: successCreate,
  } = productCreate;

  if (!userInfo || !userInfo.isAdmin) {
    history.push("/login");
  }

  useEffect(() => {
    if (!categories) {
      dispatch(getAllCategories());
    } else {
      setCategorySelect(categories[0]._id);
    }
    if (successCreate) {
      setMessage(messageCreate);
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setDescription("");
      setBrand("");
      setPrice(0);
      setCountInStock(1);
      setImage("");
      setUploading(false);
    }
  }, [dispatch, categories, successCreate, messageCreate]);

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

  const handleCreateProduct = (e) => {
    e.preventDefault();
    dispatch(
      createProduct(
        {
          name,
          description,
          brand,
          image,
          price,
          countInStock,
        },
        categorySelect,
      ),
    );
    console.log("message", messageCreate);
    setMessage(messageCreate);
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
            Create Product
          </Typography>
          <form style={{ padding: "0 1rem" }} onSubmit={handleCreateProduct}>
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
                Create
              </Button>
            </div>

            {loadingCreate && <Spinner />}
            {message && <Message variant="success">{message}</Message>}
            {errorCreate && <Message variant="error">{errorCreate}</Message>}
          </form>
        </FormContainer>
      )}
    </>
  );
};

export default ProductCreatePage;
