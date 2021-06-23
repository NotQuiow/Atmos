import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@material-ui/icons/KeyboardArrowUpRounded";
import { weatherContext } from "../App";
import Skeleton from "@material-ui/lab/Skeleton";
import { getIfDay } from "../Helpers/getTime";

const useStyles = makeStyles({
  divider: {
    margin: "1rem 0",
  },
});

const CurrentWeathter = () => {
  const { current, daily, loading } = useContext(weatherContext);
  const classes = useStyles();
  return (
    <>
      <div className="current-weather">
        <div>
          {loading ? (
            <Skeleton animation="wave" height={112} width={120}>
              <Typography variant="h1">.</Typography>
            </Skeleton>
          ) : (
            <Typography variant="h1">
              {Math.round(current.temp)}&deg;
            </Typography>
          )}
          <div className="low-high">
            {loading ? (
              <Skeleton animation="wave" width={25} />
            ) : (
              <Typography variant="caption">
                <KeyboardArrowDownRoundedIcon
                  color="disabled"
                  fontSize="small"
                />
                {Math.round(daily[0].temp.min)}&deg;
              </Typography>
            )}
            {loading ? (
              <Skeleton animation="wave" width={25} />
            ) : (
              <Typography variant="caption">
                <KeyboardArrowUpRoundedIcon color="disabled" fontSize="small" />
                {Math.round(daily[0].temp.max)}&deg;
              </Typography>
            )}
          </div>
          {loading ? (
            <Skeleton animation="wave" width={50} />
          ) : (
            <Typography variant="body2">{current.weather[0].main}</Typography>
          )}
          {loading ? (
            <Skeleton animation="wave" />
          ) : (
            <Typography variant="caption" color="textSecondary">
              Feels like {Math.round(current.feels_like)}&deg;
            </Typography>
          )}
        </div>
        <div className="current-icon">
          {loading ? (
            <Skeleton
              component="i"
              animation="wave"
              variant="circle"
              width={100}
              height={100}
            >
              <i className="wi wi-moon-full"></i>
            </Skeleton>
          ) : (
            <i
              className={`wi wi-owm${
                !getIfDay(current.sunrise, current.sunset) ? "-night" : ""
              }-${current.weather[0].id}`}
            ></i>
          )}
          {loading ? (
            <Skeleton width={80} animation="wave" />
          ) : (
            <Typography
              color="textSecondary"
              variant="caption"
              className="weather-desc"
            >
              {current.weather[0].description}
            </Typography>
          )}
        </div>
      </div>
      <Divider classes={{ root: classes.divider }} />
    </>
  );
};

export default CurrentWeathter;
