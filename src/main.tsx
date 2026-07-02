import { createRoot } from "react-dom/client";
import "@fontsource/geist-sans";
import "@fontsource/geist-mono";
import "@fontsource/instrument-serif";
import App from "./App";
import "./index.css";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <SpeedInsights />
    <Analytics />
  </>
);
