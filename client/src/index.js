import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./components/App";
import "./styling/index.css";


const root = createRoot(document.getElementById("root"));
root.render(<App />)
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
