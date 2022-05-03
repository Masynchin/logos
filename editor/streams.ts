import {
  combineLatest,
  fromEvent,
  map,
  Observable,
  pluck,
  startWith,
} from "rxjs";
import { LogoSettings } from "./logo";

export class StreamLogoSettings {
  private logoWidth: StreamLogoWidth;
  private logoStroke: StreamLogoStroke;
  private logoStrokeWidth: StreamLogoStrokeWidth;

  constructor(document: Document) {
    this.logoWidth = new StreamLogoWidth(document);
    this.logoStroke = new StreamLogoStroke(document);
    this.logoStrokeWidth = new StreamLogoStrokeWidth(document);
  }

  asObservable(): Observable<LogoSettings> {
    return combineLatest([
      this.logoWidth.asObservable(),
      this.logoStroke.asObservable(),
      this.logoStrokeWidth.asObservable(),
    ]).pipe(
      map(([width, stroke, strokeWidth]: [string, string, string]) => {
        return { width, stroke, strokeWidth };
      })
    );
  }
}

class StreamLogoWidth {
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

class StreamLogoStroke {
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

class StreamLogoStrokeWidth {
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
