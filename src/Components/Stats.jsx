import React, { useContext } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import { weatherContext } from "../App";
import { getTime } from "../Helpers/getTime";

const options = {
  timeStyle: "short",
};
const Stats = () => {
  const { daily, current, timezone, loading } = useContext(weatherContext);
  return (
    <>
      {loading ? (
        <Skeleton variant="rect" animation="wave" height={240} />
      ) : (
        <Paper elevation={0}>
          <div className="weather-stats">
            <div className="weather_stats-row1">
              <div className="stats-card">
                <i className="wi wi-fw wi-sunrise"></i>
                <div>
                  <Typography
                    variant="caption"
                    component="p"
                    color="textSecondary"
                  >
                    Sunrise
                  </Typography>
                  <Typography variant="subtitle2">
                    {getTime(options, timezone, current.sunrise)}
                  </Typography>
                </div>
              </div>
              <div className="stats-card">
                <i
                  className={`wi wi-fw ${
                    current.snow?.["1h"]
                      ? "wi-snow"
                      : current.rain?.["1h"]
                      ? "wi-rain"
                      : "wi-barometer"
                  }`}
                ></i>
                <div>
                  <Typography variant="caption" color="textSecondary">
                    {current.snow?.["1h"]
                      ? "Snow"
                      : current.rain?.["1h"]
                      ? "Rain"
                      : "Pressure"}
                  </Typography>
                  <Typography variant="subtitle2">
                    {current.snow?.["1h"]
                      ? `${current.snow["1h"]} mm`
                      : current.rain?.["1h"]
                      ? `${current.rain["1h"]} mm`
                      : `${current.pressure} hPa`}
                  </Typography>
                </div>
              </div>
              <div className="stats-card">
                <i className="wi wi-fw wi-cloudy "></i>
                <div>
                  <Typography variant="caption" color="textSecondary">
                    Clouds
                  </Typography>
                  <Typography variant="subtitle2">{current.clouds}%</Typography>
                </div>
              </div>
              <div className="stats-card">
                <i className="wi wi-fw wi-humidity"></i>
                <div>
                  <Typography variant="caption" color="textSecondary">
                    Humidity
                  </Typography>
                  <Typography variant="subtitle2">
                    {current.humidity}%
                  </Typography>
                </div>
              </div>
            </div>
            <div className="weather_stats-row2">
              <div className="stats-card">
                <i className="wi wi-fw wi-sunset"></i>
                <div>
                  <Typography variant="caption" color="textSecondary">
                    Sunset
                  </Typography>
                  <Typography variant="subtitle2">
                    {getTime(options, timezone, current.sunset)}
                  </Typography>
                </div>
              </div>
              <div className="stats-card">
                <i className="wi wi-fw wi-strong-wind"></i>
                <div>
                  <Typography variant="caption" color="textSecondary">
                    Wind
                  </Typography>
                  <Typography variant="subtitle2">
                    {current.wind_speed} m/s
                  </Typography>
                </div>
              </div>
              <div className="stats-card">
                <i className="wi wi-fw wi-raindrops"></i>
                <div>
                  <Typography variant="caption" color="textSecondary">
                    Precipitation
                  </Typography>
                  <Typography variant="subtitle2">
                    {parseInt(daily[0].pop * 100)}%
                  </Typography>
                </div>
              </div>
              <div className="stats-card">
                <i className="wi wi-fw wi-umbrella"></i>
                <div>
                  <Typography variant="caption" color="textSecondary">
                    UV Index
                  </Typography>
                  <Typography variant="subtitle2">{current.uvi}</Typography>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      )}
    </>
  );
};

export default Stats;
