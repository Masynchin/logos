import { combineLatest, Observable } from "rxjs";
import { Figure } from "../figure";
import { WidgetFigures } from "./figures";
import { Style } from "../style";
import { WidgetStyle } from "./style";
import { Widget } from "../widget";

export class MainWidget implements Widget<[Figure[], Style]> {
  private figures: WidgetFigures;
  private style: WidgetStyle;

  constructor(document: Document) {
    this.figures = new WidgetFigures(
      document,
      document.getElementById("editor")
    );
    this.style = new WidgetStyle(document);
  }

  asObservable(): Observable<[Figure[], Style]> {
    return combineLatest([
      this.figures.asObservable(),
      this.style.asObservable(),
    ]);
  }
}
