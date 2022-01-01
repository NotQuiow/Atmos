import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import { weatherContext } from "../App";
import { getTime } from "../Helpers/getTime";
import Skeleton from "@material-ui/lab/Skeleton";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZoneName: "short",
};

const CityDetails = ({ city }) => {
  const { loading } = useContext(weatherContext);
  return (
    <section className="city-details">
      <Typography variant="h5" gutterBottom component="h1">
        {loading ? <Skeleton animation="wave" width={200} /> : city.cityName}
      </Typography>
      <Typography variant="body2">
        {loading ? <Skeleton animation="wave" width={150} /> : city.fullCity}
      </Typography>
      <Typography variant="caption" component="p">
        {loading ? (
          <Skeleton animation="wave" width={260} />
        ) : (
          getTime(options, city.timezone, Date.now() / 1000)
        )}
      </Typography>
    </section>
  );
};

export default CityDetails;
