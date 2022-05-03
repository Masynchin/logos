import {
  combineLatest,
  fromEvent,
  map,
  Observable,
  pluck,
  startWith,
} from "rxjs";
import { SVG } from "@svgdotjs/svg.js";
import { MyCircle, MyPolyline, WithStrokes } from "./figures";

type Icon = {
  width: string;
  stroke: string;
  strokeWidth: string;
};

const width$ = fromEvent<Event>(document.getElementById("width"), "input").pipe(
  pluck("target", "value"),
  startWith(300)
);
const stroke$ = fromEvent(document.getElementById("stroke"), "input").pipe(
  pluck("target", "value"),
  startWith("#000000")
);

const strokeWidth$ = fromEvent(
  document.getElementById("strokeWidth"),
  "input"
).pipe(pluck("target", "value"), startWith(5));

const iconSettings$: Observable<Icon> = combineLatest([
  width$,
  stroke$,
  strokeWidth$,
]).pipe(
  map(([width, stroke, strokeWidth]: [string, string, string]) => {
    return { width, stroke, strokeWidth };
  })
);

const logo = SVG()
  .addTo(document.getElementById("logo"))
  .viewbox("0 0 161 125");

iconSettings$.subscribe((iconSettings) => {
  const stroke = {
    color: iconSettings.stroke,
    width: +iconSettings.strokeWidth,
  };
  logo.clear().width(iconSettings.width);
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
