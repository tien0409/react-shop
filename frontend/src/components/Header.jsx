import { Route } from "react-router-dom";
import {
  AppBar,
  Button,
  Container,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { logout } from "../actions/userActions";
import LinkHeader from "./LinkHeader";
import SearchBox from "./SearchBox";

const useStyles = makeStyles(() => ({
  header: {
    color: "#fff",
  },
  headerBrand: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElManage, setAnchorElManage] = useState(null);

  const classes = useStyles();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandle = () => {
    setAnchorEl(null);
    setAnchorElManage(null);
    dispatch(logout());
  };

  return (
    <AppBar className={classes.header} position="static">
      <Container>
        <Toolbar>
          <Typography variant="h4" className={classes.headerBrand}>
            <Link style={{ color: "#fff" }} to="/">
              Shop
            </Link>
          </Typography>
          <Route render={({ history }) => <SearchBox history={history} />} />
          <LinkHeader to="/cart" name="Cart" />
          {userInfo && userInfo.isAdmin && (
            <>
              <Button
                onClick={(e) => setAnchorElManage(e.currentTarget)}
                style={{ marginLeft: "8px" }}
                color="inherit"
              >
                Manage
                <ExpandMoreIcon />
              </Button>
              <Menu
                anchorEl={anchorElManage}
                open={Boolean(anchorElManage)}
                onClose={() => setAnchorElManage(null)}
              >
                <MenuItem>
                  <Link style={{ color: "#111" }} to="/admin/users">
                    Users
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link style={{ color: "#111" }} to="/admin/products">
                    Products
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link style={{ color: "#111" }} to="/admin/orders">
                    Orders
                  </Link>
                </MenuItem>
              </Menu>
            </>
          )}
          {userInfo ? (
            <>
              <Button
                onClick={(e) => setAnchorEl(e.currentTarget)}
                style={{ marginLeft: "8px" }}
                color="inherit"
              >
                {userInfo.name}
                <ExpandMoreIcon />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem>
                  <Link style={{ color: "#111" }} to="/profile">
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={logoutHandle}>Log out</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <LinkHeader to="/login" name="Login" />
              <LinkHeader to="/register" name="Register" />
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
