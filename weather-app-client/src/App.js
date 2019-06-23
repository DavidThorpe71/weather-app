import React, { PureComponent } from "react";
import "./App.css";

class App extends PureComponent {
  getWeather = async () => {
    const data = await fetch("/weather", {
      method: "Post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ requestedLocation: "Singapore" })
    }).then(res => res.json());
    console.log({ data });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Weather app</p>
          <button onClick={this.getWeather}>Get weather test</button>
        </header>
      </div>
    );
  }
}

export default App;
