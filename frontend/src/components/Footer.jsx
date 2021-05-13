import { Container, Grid } from "@material-ui/core";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Grid
          style={{ paddingTop: "2rem" }}
          justify="center"
          alignItems="center"
          container
        >
          Copyright &copy; React-Shop
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
