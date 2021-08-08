import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

export { SideNav } from "./Side-Nav/side-nav";
export { Header } from "./Header/header";
export { RouteComponents } from "./Route-Components/route-components";
export { CreateNote } from "./Create-note/create-note";
export { LoginPage } from "./Login-page/login-page";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
  rootElement
);
