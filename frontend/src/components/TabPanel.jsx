import { Box } from "@material-ui/core";

const TabPanel = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-page-${value}`}
      aria-labelledby={`panel-${value}-page`}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default TabPanel;
