import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./app/view";
import { AuthState } from "./app/components";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route element={<AuthState />}>
        <Route index element={<div>Hello</div>} />
      </Route>
    </Routes>
  );
}

export default App;
