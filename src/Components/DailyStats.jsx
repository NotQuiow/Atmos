import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { weatherContext } from "../App";
import { getTime } from "../Helpers/getTime";

const useStyles = makeStyles({
  divider: {
    margin: "0.5rem 0",
  },
});
const options = {
  timeStyle: "short",
};
const DailyStats = ({ day }) => {
  const { timezone } = useContext(weatherContext);
  const classes = useStyles();
  return (
    <section className="daily-weather-stats">
      <div className="daily-temp">
        <Typography variant="caption" color="textSecondary">
          {getTime({ dateStyle: "medium" }, timezone, day.dt)}
        </Typography>
        <div>
          <Typography color="textSecondary" variant="caption">
            Temp :
          </Typography>
          <Typography variant="subtitle2" component="span">
            {" "}
            {Math.round(day.temp.day)}&deg;
          </Typography>
        </div>
        <div>
          <Typography variant="caption" color="textSecondary">
            {day.weather[0].description}
          </Typography>
        </div>
      </div>
      <Divider classes={{ root: classes.divider }} />
      <div className="weather-stats">
        <div className="weather_stats-row1">
          <div className="stats-card">
            <i className="wi wi-fw wi-sunrise"></i>
            <div>
              <Typography variant="caption" component="p" color="textSecondary">
                Sunrise
              </Typography>
              <Typography variant="subtitle2">
                {getTime(options, timezone, day.sunrise)}
              </Typography>
            </div>
          </div>
          <div className="stats-card">
            <i className="wi wi-fw wi-cloudy"></i>
            <div>
              <Typography variant="caption" component="p" color="textSecondary">
                Clouds
              </Typography>
              <Typography variant="subtitle2">{day.clouds}%</Typography>
            </div>
          </div>
          <div className="stats-card">
            <i
              className={`wi wi-fw wi-${
                day?.snow ? "snow" : day?.rain ? "rain" : "umbrella"
              }`}
            ></i>
            <div>
              <Typography variant="caption" component="p" color="textSecondary">
                {day?.snow ? "Snow" : day?.rain ? "Rain" : "UV Index"}
              </Typography>
              <Typography variant="subtitle2">
                {day?.snow
                  ? `${day.snow} mm`
                  : day?.rain
                  ? `${day.rain} mm`
                  : `${day.uvi}`}
              </Typography>
            </div>
          </div>
          <div className="stats-card">
            <i className="wi wi-fw wi-strong-wind"></i>
            <div>
              <Typography variant="caption" component="p" color="textSecondary">
                Wind
              </Typography>
              <Typography variant="subtitle2">{day.wind_speed} m/s</Typography>
            </div>
          </div>
        </div>
        <div className="weather_stats-row2">
          <div className="stats-card">
            <i className="wi wi-fw wi-sunset"></i>
            <div>
              <Typography variant="caption" component="p" color="textSecondary">
                Sunset
              </Typography>
              <Typography variant="subtitle2">
                {getTime(options, timezone, day.sunset)}
              </Typography>
            </div>
          </div>
          <div className="stats-card">
            <i className="wi wi-fw wi-barometer"></i>
            <div>
              <Typography variant="caption" component="p" color="textSecondary">
                Pressure
              </Typography>
              <Typography variant="subtitle2">{day.pressure} hPa</Typography>
            </div>
          </div>
          <div className="stats-card">
            <i className="wi wi-fw wi-raindrops"></i>
            <div>
              <Typography variant="caption" component="p" color="textSecondary">
                Precipitation
              </Typography>
              <Typography variant="subtitle2">
                {parseInt(day.pop * 100)}%
              </Typography>
            </div>
          </div>
          <div className="stats-card">
            <i className="wi wi-fw wi-humidity"></i>
            <div>
              <Typography variant="caption" component="p" color="textSecondary">
                Humidity
              </Typography>
              <Typography variant="subtitle2">{day.humidity}%</Typography>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyStats;
