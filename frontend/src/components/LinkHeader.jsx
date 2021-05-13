import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  link: {
    color: "#fff",
  },
}));

const LinkHeader = ({ to, name }) => {
  const classes = useStyles();

  return (
    <Link to={to}>
      <Button className={classes.link} color="inherit">
        {name}
      </Button>
    </Link>
  );
};

export default LinkHeader;
