import { Alert } from "@material-ui/lab";

const Message = ({ children, variant, ...props }) => {
  return (
    <Alert {...props} severity={variant}>
      {children}
    </Alert>
  );
};

export default Message;
