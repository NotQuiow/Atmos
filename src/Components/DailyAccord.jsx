import React, { useContext, useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { weatherContext } from "../App";
import { getDay } from "../Helpers/getTime";
import DailyStats from "./DailyStats";
import Divider from "@material-ui/core/Divider";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles({
  root: {
    boxShadow: "none",
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
  accordSumRoot: {
    minHeight: 46,
    "&$expanded": {
      minHeight: 46,
    },
  },
  accordSumContent: {
    justifyContent: "space-between",
    "&$expanded": {
      margin: "12px 0",
    },
  },

  accordDetailsRoot: {
    display: "block",
  },
  divider: {
    margin: "1rem 0",
  },
});
const options = {
  weekday: "long",
};
const DailyAccord = () => {
  const classes = useStyles();
  const { daily, timezone, loading } = useContext(weatherContext);
  const [expanded, setExpanded] = useState();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <>
      <Divider classes={{ root: classes.divider }} />
      {loading ? (
        <Skeleton variant="rect" height={46 * 8} animation="wave" />
      ) : (
        daily.map((day, i) => (
          <Accordion
            classes={{ root: classes.root, expanded: classes.expanded }}
            key={day.dt}
            expanded={expanded === `panel${i}`}
            onChange={handleChange(`panel${i}`)}
          >
            <AccordionSummary
              classes={{
                root: classes.accordSumRoot,
                content: classes.accordSumContent,
                expanded: classes.expanded,
              }}
            >
              <Typography variant="subtitle2">
                {getDay(options, timezone, day.dt)}
              </Typography>

              <div className="daily-icons">
                <div>
                  <i className={`wi wi-owm-${day.weather[0].id}`}></i>
                  {day.weather[0].main == "Rain" && (
                    <Typography
                      variant="caption"
                      className="if-rain"
                      color="textSecondary"
                    >
                      {parseInt(day.pop * 100)}%
                    </Typography>
                  )}
                </div>
                <div className="accord-max-min">
                  <Typography variant="subtitle2">
                    {Math.round(day.temp.max)}&deg;
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {Math.round(day.temp.min)}&deg;
                  </Typography>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails classes={{ root: classes.accordDetailsRoot }}>
              <DailyStats day={day} />
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </>
  );
};

export default DailyAccord;
