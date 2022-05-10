import { fromEvent, map, Observable, pluck, BehaviorSubject } from "rxjs";
import { MyElement } from "../elements";
import { Input } from "../input";

export class InputText implements Input<string>, MyElement {
  private value: string;
  private pattern: string;
  private subject: BehaviorSubject<string>;

  constructor(value: string, pattern: string) {
    this.value = value;
    this.pattern = pattern;
    this.subject = new BehaviorSubject<string>(this.value);
  }

  observe(): Observable<string> {
    return this.subject;
  }

  renderTo(document: Document, element: HTMLElement): void {
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("pattern", this.pattern);
    input.setAttribute("value", this.value);
    element.appendChild(input);
    fromEvent(input, "input")
      .pipe(pluck("target", "value"), map(String))
      .subscribe(this.subject);
  }
}
