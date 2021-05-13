import { Button, Checkbox, TextField, Typography } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../components/FormContainer";
import Spinner from "../../components/Spinner";
import Message from "../../components/Message";
import {
  getUserDetails,
  updateUserDetailsByAdmin,
} from "../../actions/userActions";
import ButtonBack from "../../components/ButtonBack";
import {
  USER_UPDATE_ADMIN_RESET,
  USER_DETAILS_RESET,
} from "../../constants/userConstants";

const useStyles = makeStyles(() => ({
  userDetailsPage: {
    paddingTop: "1.5rem",
  },
  title: {
    marginLeft: "1rem",
    marginBottom: "1.5rem",
    fontWeight: "bolder",
  },
  checkboxAdmin: {
    padding: 0,
    paddingBottom: "4px",
    paddingRight: "5px",
    margin: "0.5rem 0",
  },
  btnBack: {
    backgroundColor: "#212121",
    color: "#fff",
    padding: "0.5rem 2rem",
  },
}));

const UserProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const userUpdateAdmin = useSelector((state) => state.userUpdateAdmin);
  const {
    success: successUpdateAdmin,
    loading: loadingUpdateAdmin,
    error: errorUpdateAdmin,
  } = userUpdateAdmin;

  if (!userInfo || !userInfo.isAdmin) {
    history.push("/login");
  }

  useEffect(() => {
    if (successUpdateAdmin) {
      dispatch({ type: USER_UPDATE_ADMIN_RESET });
      dispatch({ type: USER_DETAILS_RESET });
      history.push("/admin/users");
    } else {
      if (!user || user?._id !== id || successUpdateAdmin) {
        dispatch(getUserDetails(id, true));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [history, dispatch, user, id, successUpdateAdmin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUserDetailsByAdmin({
        _id: user._id,
        name,
        email,
        password,
        isAdmin,
      }),
    );
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <FormContainer>
          <ButtonBack
            style={{ marginLeft: "1rem", marginBottom: "1rem" }}
            to="/admin/users"
          />

          <Typography className={classes.title} variant="h3">
            Update User
          </Typography>

          <form style={{ padding: "0 1rem" }} onSubmit={handleSubmit}>
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

            <div>
              <Typography variant="body1">
                <Checkbox
                  name="isAdmin"
                  className={classes.checkboxAdmin}
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(!isAdmin)}
                />
                Admin
              </Typography>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <Button
                onClick={handleSubmit}
                type="submit"
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </div>

            {loadingUpdateAdmin && <Spinner />}
            {errorUpdateAdmin && <Message variant="error">{error}</Message>}
          </form>
        </FormContainer>
      )}
    </>
  );
};

export default UserProfilePage;
