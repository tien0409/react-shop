import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
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

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();
  const queryRedirect = useQuery().get("redirect");
  const redirect = queryRedirect ? queryRedirect : "";

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <FormContainer>
      <Typography className={classes.title} variant="h3">
        Sign In
      </Typography>
      <form style={{ padding: "0 1rem" }} onSubmit={handleSubmit}>
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
          <Button type="submit" variant="contained" color="primary">
            Sign In
          </Button>
        </div>

        {loading && <Spinner />}
        {error && <Message variant="error">{error}</Message>}

        <div style={{ marginTop: "1rem" }}>
          <Grid container>
            <Grid md={6} item>
              <Link to="/">Forgot password?</Link>
            </Grid>
            <Grid md={6} item>
              <div style={{ textAlign: "right" }}>
                Don't have an account? &nbsp;
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                >
                  Sign up
                </Link>
              </div>
            </Grid>
          </Grid>
        </div>
      </form>
    </FormContainer>
  );
};

export default LoginPage;
