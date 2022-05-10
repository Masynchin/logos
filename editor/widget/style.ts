import {
  combineLatest,
  fromEvent,
  map,
  Observable,
  pluck,
  startWith,
} from "rxjs";
import { Style } from "../style";
import { Widget } from "../widget";

export class WidgetStyle implements Widget<Style> {
  private logoWidth: WidgetLogoWidth;
  private logoStroke: WidgetLogoStroke;
  private logoStrokeWidth: WidgetLogoStrokeWidth;

  constructor(document: Document) {
    this.logoWidth = new WidgetLogoWidth(document);
    this.logoStroke = new WidgetLogoStroke(document);
    this.logoStrokeWidth = new WidgetLogoStrokeWidth(document);
  }

  asObservable(): Observable<Style> {
    return combineLatest([
      this.logoWidth.asObservable(),
      this.logoStroke.asObservable(),
      this.logoStrokeWidth.asObservable(),
    ]).pipe(
      map(([width, stroke, strokeWidth]: [string, string, string]) => {
        return { width, stroke: { color: stroke, width: +strokeWidth } };
      })
    );
  }
}

class WidgetLogoWidth implements Widget<unknown> {
  private document: Document;

  constructor(document: Document) {
    this.document = document;
  }

  asObservable(): Observable<unknown> {
    return fromEvent(this.document.getElementById("width"), "input").pipe(
      pluck("target", "value"),
      startWith(300)
    );
  }
}

class WidgetLogoStroke implements Widget<unknown> {
  private document: Document;

  constructor(document: Document) {
    this.document = document;
  }

  asObservable(): Observable<unknown> {
    return fromEvent(this.document.getElementById("stroke"), "input").pipe(
      pluck("target", "value"),
      startWith("#000000")
    );
  }
}

class WidgetLogoStrokeWidth implements Widget<unknown> {
  private document: Document;

  constructor(document: Document) {
    this.document = document;
  }

  asObservable(): Observable<unknown> {
    return fromEvent(this.document.getElementById("strokeWidth"), "input").pipe(
      pluck("target", "value"),
      startWith(5)
    );
  }
}
