import {
  TableContainer,
  Paper,
  TableCell,
  Table,
  TableHead,
  TableBody,
  TableRow,
  Icon,
  IconButton,
  Snackbar,
  Container,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { deleteUser, getAllUsers } from "../../actions/userActions";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Message from "../../components/Message";
import Spinner from "../../components/Spinner";
import { USER_DELETE_RESET } from "../../constants/userConstants";

const useStyles = makeStyles((theme) => ({
  groupBtn: {
    display: "flex",
    justifyContent: "center",
  },
  colorError: {
    color: theme.palette.error.light,
  },
  anchorOrigin: {
    position: "absolute",
    top: "80vh",
  },
}));

const UsersPage = () => {
  const [openToast, setOpenToast] = useState(false);
  const [message, setMessage] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const usersList = useSelector((state) => state.usersList);
  const { users, loading, error } = usersList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    message: messageDelete,
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = userDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successDelete) {
      setMessage(messageDelete);
      setOpenToast(true);
      dispatch({ type: USER_DELETE_RESET });
    } else {
      if (userInfo && userInfo.isAdmin) {
        dispatch(getAllUsers());
      } else {
        history.push("/login");
      }
    }
  }, [dispatch, history, messageDelete, userInfo, successDelete]);

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure?")) {
      setMessage("");
      dispatch(deleteUser(id));
      setOpenToast(true);
    }
  };

  return (
    <Container>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>ADMIN</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <Icon>{user.isAdmin ? <CheckIcon /> : <ClearIcon />}</Icon>
                  </TableCell>
                  <TableCell>
                    {userInfo && user._id !== userInfo._id && (
                      <div className={classes.groupBtn}>
                        <Link to={`/admin/user/${user._id}`}>
                          <IconButton color="primary">
                            <EditIcon />
                          </IconButton>
                        </Link>
                        <IconButton
                          onClick={() => handleDeleteUser(user._id)}
                          className={classes.colorError}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar
        className={classes.anchorOrigin}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openToast && !loading && !loadingDelete}
        onClose={(e) => setOpenToast(false)}
        message={message && message}
        autoHideDuration={3000}
      />

      {loadingDelete && <Spinner />}
      {errorDelete && <Message variant="error">{errorDelete}</Message>}
    </Container>
  );
};

export default UsersPage;
