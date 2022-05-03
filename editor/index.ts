import { SVG } from "@svgdotjs/svg.js";
import { MyCircle, MyPolyline, WithStrokes } from "./figures";
import { StreamLogoSettings } from "./streams";

const logo = SVG()
  .addTo(document.getElementById("logo"))
  .viewbox("0 0 161 125");

const logoSettings$ = new StreamLogoSettings(document).asObservable();

logoSettings$.subscribe((logoSettings) => {
  const stroke = {
    color: logoSettings.stroke,
    width: +logoSettings.strokeWidth,
  };
  logo.clear().width(logoSettings.width);
  new WithStrokes(
    [
      new MyPolyline([
        [0, 0],
        [161, 0],
        [161, 125],
        [121, 100],
        [0, 100],
        [0, 0],
      ]),
      new MyCircle(40, 50, 10),
      new MyCircle(80, 50, 10),
    ],
    stroke
  ).render(logo);
});
