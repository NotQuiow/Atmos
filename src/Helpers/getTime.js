export const getTime = (op, timezone, time) => {
  if (time) {
    return new Date(time * 1000).toLocaleString("en-US", {
      ...op,
      timeZone: timezone,
    });
  } else return "Unknown";
};
export const getDay = (op, timezone, time) => {
  if (
    new Date(time * 1000).toLocaleString("en-US", {
      day: "2-digit",
      timeZone: timezone,
    }) ==
    new Date(Date.now()).toLocaleString("en-US", {
      day: "2-digit",
      timeZone: timezone,
    })
  )
    return "Today";
  return new Date(time * 1000).toLocaleString("en-US", {
    ...op,
    timeZone: timezone,
  });
};

export const getIfDay = (sunrise, sunset) => {
  return Date.now() > sunrise * 1000 && Date.now() < sunset * 1000;
};

export const setBodyClass = (id, time) => {
  if (id == "800") {
    time
      ? (document.body.className = "clear-day")
      : (document.body.className = "clear-night");
    return;
  }
  let className = "";
  switch (id[0]) {
    case "2":
      className = "thunderstorm";
      break;
    case "3":
      className = "drizzle";
      break;
    case "5":
      className = "rain";
      break;
    case "6":
      className = "snow";
      break;
    case "7":
      className = "atmosphere";
      break;
    case "8":
      if (time) className = "clouds-day";
      else className = "clouds-night";
      break;
    default:
      className = "drizzle";
      break;
  }
  document.body.className = className;
};
