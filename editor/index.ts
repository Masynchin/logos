import {
  combineLatest,
  fromEvent,
  map,
  Observable,
  pluck,
  startWith,
} from "rxjs";

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

const icon = document.getElementById("icon");
iconSettings$.subscribe((iconSettings) => {
  icon.style.width = iconSettings.width;
  icon.style.stroke = iconSettings.stroke;
  icon.style.strokeWidth = iconSettings.strokeWidth;
});
