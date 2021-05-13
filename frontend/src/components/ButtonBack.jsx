import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#212121",
    color: "#fff",
  },
}));

const ButtonBack = (props) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Button
      {...props}
      onClick={(e) => history.push(props.to)}
      className={classes.button}
      variant="contained"
      color="primary"
    >
      Back
    </Button>
  );
};

export default ButtonBack;
