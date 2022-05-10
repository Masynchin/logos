import { map, Observable, Subject, takeUntil } from "rxjs";
import { MyPolyline } from "../figure/polyline";
import { Widget } from "../widget";
import { InputText } from "../input/text";
import { H3, Label, Li, Section, TextElement, Ul } from "../elements";
import { Signal } from "../input/signal";

export class WidgetPolyline implements Widget<MyPolyline> {
  private pointsStream: InputText;
  private deleteSignal: Signal;
  private document: Document;
  private editor: HTMLElement;

  constructor(document: Document, editor: HTMLElement) {
    this.document = document;
    this.editor = editor;
    this.pointsStream = new InputText(
      "0 0, 161 0, 161 125, 121 100, 0 100, 0 0",
      "(\\d+ \\d+)(,\\d+ \\d+)*"
    );
    this.deleteSignal = new Signal("Delete");
  }

  asObservable(): Observable<MyPolyline> {
    new Section([
      new H3("Circle"),
      this.deleteSignal,
      new Ul([
        new Li(new Label([new TextElement("Points: "), this.pointsStream])),
      ]),
    ]).renderTo(this.document, this.editor);
    return this.pointsStream.observe().pipe(
      map((points) => {
        return new MyPolyline(points);
      }),
      takeUntil(this.deleteSignal.observe())
    );
  }
}
