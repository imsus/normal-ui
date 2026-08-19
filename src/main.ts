import "./style.css";
import { initLayout } from "./layout";
import { renderScale, renderSemantic } from "./tokens";

initLayout("home");

renderScale("brand-scale", "brand", [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
]);
renderScale("neutral-scale", "neutral", [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
]);
renderSemantic("semantic-tokens");
