import Rating from "@material-ui/lab/Rating";
import { Box } from "@material-ui/core";

const RatingCustom = ({ rating }) => {
  return (
    <Box component="fieldset" my={1} borderColor="transparent">
      <Rating disabled name="simple-controlled" value={rating} />
    </Box>
  );
};

export default RatingCustom;
