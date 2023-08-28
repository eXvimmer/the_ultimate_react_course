import { Component } from "react";
import { iWeatherData } from "../../types";
import Day from "../Day";

interface WeatherProps {
  displayLocation: string;
  weather: iWeatherData["daily"];
}

export class Weather extends Component<WeatherProps> {
  render() {
    const {
      displayLocation,
      weather: {
        time: dates,
        weathercode: codes,
        temperature_2m_max: max,
        temperature_2m_min: min,
      },
    } = this.props;

    return (
      <div>
        <h2>Weather {displayLocation}</h2>
        <ul className="weather">
          {dates.map((date, i) => (
            <Day
              key={date}
              date={date}
              min={min[i]}
              max={max[i]}
              code={codes[i]}
              isToday={i === 0}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Weather;
