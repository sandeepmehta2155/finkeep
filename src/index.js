import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { UserAuthProvider } from "./Login-page/auth-context";

export { SideNav } from "./Side-Nav/side-nav";
export { Header } from "./Header/header";
export { RouteComponents } from "./Route-Components/route-components";
export { CreateNote } from "./Create-note/create-note";
export { LoginPage } from "./Login-page/login-page";
export { SignUpPage } from "./Login-page/signup-page";
export { RemainderPage } from "./Remainders/remainder";
export { TrashPage } from "./Trash-Page/trash-page";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <UserAuthProvider>
        <App />
      </UserAuthProvider>
    </Router>
  </StrictMode>,
  rootElement
);
