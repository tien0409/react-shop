import { Container, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  paperFormContainer: {
    padding: "3rem 2rem",
  },
}));

const FormContainer = ({ children }) => {
  const classes = useStyles();

  return (
    <Container>
      <Grid container justify="center">
        <Grid item xs={12} md={6}>
          <Paper
            elevation={5}
            square={true}
            className={classes.paperFormContainer}
          >
            {children}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FormContainer;
