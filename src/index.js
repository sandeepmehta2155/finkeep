import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

export { SideNav } from "./Side-Nav/side-nav";
export { Header } from "./Header/header";
export { CreateNote } from "./Create-note/create-note";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
