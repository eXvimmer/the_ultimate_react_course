import { Component } from "react";

class DateCounter extends Component<unknown, { count: number }> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      count: 0,
    };

    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleDecrement() {
    this.setState((prev) => ({ count: prev.count - 1 }));
  }

  handleIncrement() {
    this.setState((prev) => ({ count: prev.count + 1 }));
  }

  render() {
    const { count } = this.state;
    const date = new Date();
    date.setDate(date.getDate() + count);

    return (
      <div>
        <button onClick={this.handleDecrement}>-</button>
        <span>{date.toDateString()}</span>
        <button onClick={this.handleIncrement}>+</button>
      </div>
    );
  }
}

export default DateCounter;
