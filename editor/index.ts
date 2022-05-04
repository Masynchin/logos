import { SVG } from "@svgdotjs/svg.js";
import { WithStrokes } from "./figure/withStroke";
import { MainStream } from "./stream/main";

const logo = SVG()
  .addTo(document.getElementById("logo"))
  .viewbox("0 0 161 125");

const stream$ = new MainStream(document);

stream$.asObservable().subscribe(([figures, logoSettings]) => {
  const stroke = {
    color: logoSettings.stroke,
    width: +logoSettings.strokeWidth,
  };
  logo.clear().width(logoSettings.width);
  new WithStrokes(figures, stroke).render(logo);
});
