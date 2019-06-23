import React, { PureComponent } from "react";
import ReactAnimatedWeather from "react-animated-weather";
import "./App.css";

class App extends PureComponent {
  state = {
    requestedLocation: "",
    icon: "",
    location: "",
    summary: "",
    temperature: null,
    error: null
  };

  getWeather = async ({ requestedLocation }) => {
    const data = await fetch("/weather", {
      method: "Post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ requestedLocation })
    })
      .then(res => res.json())
      .catch(err => this.setState({ error: err.error }));
    if (data.error) {
      return this.setState({
        error: data.error
      });
    }
    const { icon, location, summary, temperature } = data;
    return this.setState({
      error: null,
      icon,
      location,
      summary,
      temperature
    });
  };

  render() {
    const { icon, location, summary, temperature, error } = this.state;
    const locations = ["London", "Paris", "New York", "Singapore", "Sydney"];
    return (
      <div className="App">
        <header className="App-header">
          <div className="header-content-wrapper">
            <h1>Weather app</h1>
          </div>
        </header>
        <main>
          <div className="location-select-wrapper">
            {locations.map(item => (
              <button
                className={
                  location &&
                  location.toLowerCase().includes(item.toLowerCase())
                    ? "selected"
                    : ""
                }
                key={item}
                onClick={() => this.getWeather({ requestedLocation: item })}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="weather-details-wrapper">
            {error && (
              <p>
                It looks like we are having some issues, please try again later
              </p>
            )}
            {!error && !location && !summary && !icon && !temperature && (
              <p className="no-location-text">
                Select a location from the list above to see the current weather
              </p>
            )}
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
          </div>
        </main>
      </div>
    );
  }
}

export default App;
