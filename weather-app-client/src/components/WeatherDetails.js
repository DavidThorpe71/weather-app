import React from "react";
import ReactAnimatedWeather from "react-animated-weather";
import ReactLoading from "react-loading";

const WeatherDetails = props => {
  const { loading, location, temperature, icon, summary } = props;
  return (
    <>
      {loading && <ReactLoading className="loading-circle" type="spin" />}
      {location && <p className="location">{location}</p>}
      {temperature && <p className="temp">{temperature}&#176;F</p>}
      {icon && (
        <ReactAnimatedWeather
          icon={icon.replace(/-/gi, "_").toUpperCase()}
          color="#fff"
          size={100}
          animate={true}
        />
      )}
      {summary && <p>{summary}</p>}
    </>
  );
};

export default WeatherDetails;
