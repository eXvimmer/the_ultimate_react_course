import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import store from "./redux/store";
import { deposit, withdraw } from "./redux/actions/accounts";
import { createCustomer, updateName } from "./redux/actions/customers";

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(deposit(5000));
store.dispatch(createCustomer("Barbara Palvin", "92409480928209"));
store.dispatch(updateName("Mustafa Hayati"));
store.dispatch(withdraw(10000));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
