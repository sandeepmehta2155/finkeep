import { Routes, Route } from "react-router-dom";
import * as useComponent from "../index";

export const RouteComponents = () => {
  return (
    <Routes>
      <Route path="/" element={<useComponent.CreateNote />} />
      <Route path="/login" element={<useComponent.LoginPage />} />
    </Routes>
  );
};
