import {
  fromEvent,
  map,
  Observable,
  pluck,
  startWith,
  BehaviorSubject,
} from "rxjs";
import { MyElement } from "../elements";
import { Input } from "../input";

export class InputNumber implements Input<number>, MyElement {
  private value: string;
  private subject: BehaviorSubject<number>;

  constructor(value: string) {
    this.value = value;
    this.subject = new BehaviorSubject<number>(Number(this.value));
  }

  observe(): Observable<number> {
    return this.subject;
  }

  renderTo(document: Document, element: HTMLElement): void {
    const input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("value", this.value);
    element.appendChild(input);
    fromEvent(input, "input")
      .pipe(pluck("target", "value"), startWith(this.value), map(Number))
      .subscribe(this.subject);
  }
}
