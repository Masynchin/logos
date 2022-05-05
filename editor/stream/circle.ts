import { combineLatest, map, Observable, tap } from "rxjs";
import { MyCircle } from "../figure/circle";
import { Stream } from "../stream";
import { InputNumber } from "../input/number";
import {
  H3,
  Input,
  Label,
  Li,
  MyElement,
  Section,
  TextElement,
  Ul,
} from "../elements";
export class StreamCircle implements Stream<MyCircle> {
  private xStream: InputNumber;
  private yStream: InputNumber;
  private radiusStream: InputNumber;
  private document: Document;
  private editor: HTMLElement;

  constructor(document: Document, editor: HTMLElement) {
    this.document = document;
    this.editor = editor;
    this.xStream = new InputNumber("50");
    this.yStream = new InputNumber("50");
    this.radiusStream = new InputNumber("10");
  }

  asObservable(): Observable<MyCircle> {
    new Section([
      new H3("Circle"),
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
      })
    );
  }
}
