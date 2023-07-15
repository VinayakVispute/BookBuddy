import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ErrorBoundary from "./Componenets/ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<h1 className="font-bold text-center mt-10"> Something went wrong !!!</h1>}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
