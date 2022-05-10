import { Observable, Subject } from "rxjs";
import { Figure } from "../figure";
import { Widget } from "../widget";
import { WidgetCircle } from "./circle";
import { WidgetPolyline } from "./polyline";
import { dynamicCombineLatest } from "../extra";

export class WidgetFigures implements Widget<Figure[]> {
  private widgets: Widget<Figure>[];
  private dynamicObservables: Observable<any[]>;
  private add: Subject<Observable<any>>;

  constructor(document: Document, editor: HTMLElement) {
    const { dynamicObservables, add } = dynamicCombineLatest([]);
    this.dynamicObservables = dynamicObservables;
    this.add = add;
    this.widgets = [
      new WidgetCircle(document, editor),
      new WidgetCircle(document, editor),
      new WidgetPolyline(document, editor),
    ];
  }
  asObservable(): Observable<Figure[]> {
    this.widgets.forEach((s) => this.add.next(s.asObservable()));
    return this.dynamicObservables;
  }
}
