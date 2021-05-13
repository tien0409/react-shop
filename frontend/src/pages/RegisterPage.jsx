import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { useQuery } from "../utils/useQuery";

const useStyles = makeStyles(() => ({
  title: {
    marginLeft: "1rem",
    marginBottom: "1.5rem",
    fontWeight: "bolder",
  },
}));

const RegisterPage = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();
  const queryRedirect = useQuery().get("redirect");
  const redirect = queryRedirect ? queryRedirect : "";

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleSubmit = (e) => {
    setMessage("");
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  return (
    <FormContainer>
      <Typography className={classes.title} variant="h3">
        Sign Up
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
        <div style={{ marginBottom: "1rem" }}>
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </div>

        {loading && <Spinner />}
        {error && <Message variant="error">{error}</Message>}
        {message && <Message variant="error">{message}</Message>}

        <div style={{ marginTop: "1rem" }}>
          <Grid container>
            <Grid md={12} item>
              <div style={{ textAlign: "right" }}>
                You have account?&nbsp;
                <Link to={redirect ? `/login/redirect=${redirect}` : "/login"}>
                  Sign in
                </Link>
              </div>
            </Grid>
          </Grid>
        </div>
      </form>
    </FormContainer>
  );
};

export default RegisterPage;
