import { combineLatest, map, Observable, takeUntil } from "rxjs";
import { MyCircle } from "../figure/circle";
import { Stream } from "../stream";
import { InputNumber } from "../input/number";
import { Signal } from "../input/signal";
import { H3, Label, Li, Section, TextElement, Ul } from "../elements";

export class StreamCircle implements Stream<MyCircle> {
  private xStream: InputNumber;
  private yStream: InputNumber;
  private radiusStream: InputNumber;
  private document: Document;
  private editor: HTMLElement;
  private deleteSignal: Signal;

  constructor(document: Document, editor: HTMLElement) {
    this.document = document;
    this.editor = editor;
    this.xStream = new InputNumber("50");
    this.yStream = new InputNumber("50");
    this.radiusStream = new InputNumber("10");
    this.deleteSignal = new Signal("Delete");
  }

  asObservable(): Observable<MyCircle> {
    new Section([
      new H3("Circle"),
      this.deleteSignal,
      new Ul([
        new Li(new Label([new TextElement("X: "), this.xStream])),
        new Li(new Label([new TextElement("Y: "), this.yStream])),
        new Li(new Label([new TextElement("Radius: "), this.radiusStream])),
      ]),
    ]).renderTo(this.document, this.editor);
    return combineLatest([
      this.xStream.observe(),
      this.yStream.observe(),
      this.radiusStream.observe(),
    ]).pipe(
      map(([x, y, radius]: [number, number, number]) => {
        return new MyCircle(x, y, radius);
      }),
      takeUntil(this.deleteSignal.observe())
    );
  }
}
