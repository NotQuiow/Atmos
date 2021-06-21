import React, { useContext } from "react";
import Tabs from "@material-ui/core/Tabs";
import CloudIcon from "@material-ui/icons/Cloud";
import Tab from "@material-ui/core/Tab";
import { Divider, makeStyles, Typography } from "@material-ui/core";
import { weatherContext } from "../App";

const useStyles = makeStyles({
  indicator: {
    height: "100%",
    borderRadius: "15px",
  },
  divider: {
    margin: "2rem 0 10px 0",
  },
});
function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`,
  };
}

const DailyWeather = () => {
  const { hourly } = useContext(weatherContext);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <>
      <Divider classes={{ root: classes.divider }} />
      <Tabs
        classes={{ indicator: classes.indicator }}
        value={value}
        indicatorColor="secondary"
        variant="scrollable"
        scrollButtons="off"
        aria-label="Daily Weather Tabs"
      >
        {hourly.map((i) => (
          <Tab
            disableRipple
            label={
              <>
                <Typography variant="caption" gutterBottom>
                  Now
                </Typography>

                <Typography variant="button" color="inherit">
                  28&deg;
                </Typography>
              </>
            }
            {...a11yProps(0)}
          />
        ))}
      </Tabs>
      <Divider style={{ marginTop: "10px" }} />
    </>
  );
};

export default DailyWeather;
