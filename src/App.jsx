import React, { useCallback, useEffect, useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import Search from "./Components/Search";
import Stats from "./Components/Stats";
import DailyAccord from "./Components/DailyAccord";
import CityDetails from "./Components/CityDetails";
import CurrentWeathter from "./Components/CurrentWeather";
import { getIfDay, setBodyClass } from "./Helpers/getTime";
import HourlyWeather from "./Components/HourlyWeather";
import "./index.css";
import Footer from "./Components/Footer";

const fetchData = async (uri) => {
  const res = await fetch(uri);
  if (!res.ok) {
    const message = await res.json();
    throw new Error(message.message);
  }
  const data = await res.json();
  return data;
};

export const weatherContext = React.createContext();

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          margin: "1rem 0",
        },
      },
    },
  },
  palette: {
    type: "dark",
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "rgba(150,150,150,0.2)",
    },
    background: {
      paper: "transparent",
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h1: {
      fontWeight: 500,
    },
  },
});
function App() {
  const [loading, setLoading] = useState(() => true);
  const [fullCity, setFullCity] = useState(() => null);
  const [cityName, setCityName] = useState(() => null);
  const [weatherData, setWeatherData] = useState({
    current: "",
    daily: "",
    hourly: "",
    lat: "",
    lon: "",
    minutely: "",
    timezone: "Asia/Kolkata",
  });
  const [err, setErr] = useState(null);
  const [snackbar, setSnackbar] = useState(false);

  const success = (pos) => {
    localStorage.setItem("gps-granted", true);
    onecall(pos.coords.latitude, pos.coords.longitude);
    fetchData(
      `${import.meta.env.VITE_MAPBOX_URL}${pos.coords.longitude},${
        pos.coords.latitude
      }.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}${
        import.meta.env.VITE_MAPBOX_OPTIONS
      }`
    )
      .then((data) => {
        setCityName(data.features[0].text);
        setFullCity(data.features[0].place_name);
        localStorage.setItem(
          "city",
          JSON.stringify({
            city: data.features[0].text,
            fullcity: data.features[0].place_name,
          })
        );
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const error = useCallback(() => {
    localStorage.removeItem("gps-granted");
    setLoading(false);
  }, []);

  const getGeoLocation = useCallback(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
      });
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("gps-granted")) {
      getGeoLocation();
    } else if (localStorage.getItem("geo")) {
      if (localStorage.getItem("city")) {
        const cityDetails = JSON.parse(localStorage.getItem("city"));
        setCityName(cityDetails.city);
        setFullCity(cityDetails.fullcity);
      }
      const geo = JSON.parse(localStorage.getItem("geo"));
      const lat = geo.lat;
      const lon = geo.lon;
      onecall(lat, lon);
    } else {
      setCityName("London");
      setFullCity("London, Greater London, England, United Kingdom");
      onecall(51.51, -0.13);
      localStorage.setItem(
        "city",
        JSON.stringify({
          city: "London",
          fullcity: "London, Greater London, England, United Kingdom",
        })
      );
    }
  }, []);

  const onecall = useCallback((lat, lon) => {
    fetchData(`${import.meta.env.VITE_ONECALL_URL}lat=${lat}&lon=${lon}`)
      .then((data) => {
        setBodyClass(
          data.current.weather[0].id.toString(),
          getIfDay(data.current.sunrise, data.current.sunset)
        );
        setWeatherData(data);
        setLoading(false);
        localStorage.setItem(
          "geo",
          JSON.stringify({ lat: data.lat, lon: data.lon })
        );
      })
      .catch((err) => {
        setErr(err.message);
        console.log(err);
      });
  }, []);

  const handleSearch = useCallback(
    (e, inpRef) => {
      e.preventDefault();
      if (
        inpRef.current.value.trim() === "" ||
        inpRef.current.value.toLowerCase() === cityName.toLowerCase()
      )
        return;
      setLoading(true);
      fetchData(
        `${import.meta.env.VITE_MAPBOX_URL}${encodeURIComponent(
          inpRef.current.value
        )}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}${
          import.meta.env.VITE_MAPBOX_OPTIONS
        }`
      )
        .then((data) => {
          inpRef.current.blur();
          if (data.features.length === 0) {
            setSnackbar(true);
            setLoading(false);
          } else {
            setCityName(data.features[0].text);
            setFullCity(data.features[0].place_name);
            onecall(data.features[0].center[1], data.features[0].center[0]);
            localStorage.setItem(
              "city",
              JSON.stringify({
                city: data.features[0].text,
                fullcity: data.features[0].place_name,
              })
            );
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    },
    [cityName]
  );

  const handleRefresh = () => {
    setLoading(true);
    onecall(weatherData.lat, weatherData.lon);
  };

  if (err) {
    return <Typography align="center">{err}</Typography>;
  }
  return (
    <ThemeProvider theme={theme}>
      <weatherContext.Provider
        value={{
          current: weatherData.current,
          hourly: weatherData.hourly,
          daily: weatherData.daily,
          timezone: weatherData.timezone,
          minutely: weatherData.minutely,
          loading,
        }}
      >
        <CssBaseline />
        <Container maxWidth="sm" component="main">
          <Search
            search={handleSearch}
            refresh={handleRefresh}
            geo={getGeoLocation}
          />
          <CityDetails
            city={{ cityName, fullCity, timezone: weatherData.timezone }}
          />
          <CurrentWeathter />
          <Stats />
          <HourlyWeather />
          <DailyAccord />
          <Footer />
        </Container>
      </weatherContext.Provider>
      <Snackbar
        open={snackbar}
        autoHideDuration={5000}
        onClose={() => setSnackbar(false)}
        message="No Such City Found"
      />
    </ThemeProvider>
  );
}

export default App;
