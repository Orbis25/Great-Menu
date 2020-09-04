import React from "react";
import "./App.css";
import Router from "./router";
import { Provider as AuthProvider } from "./store/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
