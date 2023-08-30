import { ChangeEvent, Component, ReactNode /*, MouseEvent */ } from "react";
import Weather from "./components/Weather";
import { iGeoData, iWeatherData } from "./types";

interface AppState {
  location: string;
  isLoading: boolean;
  displayLocation: string;
  weather?: iWeatherData["daily"];
}

function convertToFlag(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

class App extends Component<unknown, AppState> {
  state = {
    location: "",
    isLoading: false,
    displayLocation: "",
    weather: undefined,
  };

  handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      location: e.target.value,
    });
  };

  fetchWeather = async (/* e: MouseEvent<HTMLButtonElement> */) => {
    const { location } = this.state;
    if (!location) {
      return;
    }
    try {
      this.setState({ isLoading: true });
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );
      const geoData: iGeoData = await geoRes.json();

      if (!geoData.results) {
        throw new Error("Location not found");
      }

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results[0];
      this.setState({
        displayLocation: `${name} ${convertToFlag(country_code)}`,
      });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData: iWeatherData = await weatherRes.json();
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.error(err);
      this.setState({ weather: undefined, displayLocation: "" });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render(): ReactNode {
    const { location, isLoading, weather, displayLocation } = this.state;

    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <div>
          <input
            type="text"
            placeholder="e.g. Tokyo"
            autoFocus
            value={location}
            onChange={this.handleLocationChange}
          />
        </div>
        <button onClick={this.fetchWeather}>Get Weather</button>
        {isLoading && <p className="loader">loading...</p>}

        {weather && (
          <Weather displayLocation={displayLocation} weather={weather} />
        )}
      </div>
    );
  }
}

export default App;
