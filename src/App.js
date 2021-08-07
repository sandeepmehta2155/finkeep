import "./styles.css";

import * as useComponent from "./index";

export default function App() {
  return (
    <div className="App">
      <useComponent.Header />
      <useComponent.SideNav />
      <useComponent.CreateNote />
    </div>
  );
}
