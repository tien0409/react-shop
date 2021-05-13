import { Button, FormControl, InputBase, TextField } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  input: {
    backgroundColor: "#ddd",
    borderRadius: "5px",
    padding: "0 5px",
  },
  form: {
    display: "flex",
    alignItems: "center",
    marginRight: "2rem",
  },
  btn: {
    backgroundColor: "#222",
  },
}));

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <InputBase
        className={classes.input}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        fullWidth
        name="keyword"
        type="text"
        variant="outlined"
        id="keyword"
        placeholder="Search"
      />
      <Button
        className={classes.btn}
        type="submit"
        variant="contained"
        color="secondary"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBox;
