import { ChangeEvent, Component, ReactNode, MouseEvent } from "react";

class App extends Component<unknown, { location: string }> {
  constructor(props: unknown) {
    super(props);

    this.state = {
      location: "",
    };

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.fetchWeather = this.fetchWeather.bind(this);
  }

  handleLocationChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      location: e.target.value,
    });
  }

  fetchWeather(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    // TODO: fetch weather data
  }

  render(): ReactNode {
    const { location } = this.state;

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
      </div>
    );
  }
}

export default App;
