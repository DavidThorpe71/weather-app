import React, { PureComponent } from "react";
import ReactAnimatedWeather from "react-animated-weather";
import "./App.css";

class App extends PureComponent {
  state = {
    requestedLocation: "",
    icon: "",
    location: "",
    summary: "",
    temperature: null
  };

  getWeather = async ({ requestedLocation }) => {
    const data = await fetch("/weather", {
      method: "Post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ requestedLocation })
    }).then(res => res.json());
    const { icon, location, summary, temperature } = data;
    this.setState({
      icon,
      location,
      summary,
      temperature
    });
  };

  render() {
    const { icon, location, summary, temperature } = this.state;
    const locations = ["London", "Paris", "New-York", "Singapore", "Sydney"];
    return (
      <div className="App">
        <header className="App-header">
          <h1>Weather app</h1>
          {locations.map(location => (
            <button
              onClick={() => this.getWeather({ requestedLocation: location })}
            >
              {location}
            </button>
          ))}
          <p>{location}</p>
          <p>{summary}</p>
          <p>{icon.replace(/-/gi, "_").toUpperCase()}</p>
          {icon && (
            <ReactAnimatedWeather
              icon={icon.replace(/-/gi, "_").toUpperCase()}
              color="#000"
              size={64}
              animate={true}
            />
          )}
          <p>{temperature}</p>
        </header>
      </div>
    );
  }
}

export default App;
