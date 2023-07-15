import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ErrorBoundary from "./Componenets/ErrorBoundary.jsx";
import { Link } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary
    fallback={
      <div>
        <h1 className="font-bold text-center mt-10">
          Something went wrong !!!
        </h1>
      </div>
    }
  >
    <App />
  </ErrorBoundary>
);
