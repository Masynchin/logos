import { fromEvent, Observable, Subject } from "rxjs";
import { MyElement } from "../elements";
import { Input } from "../input";

export class Signal implements Input<any>, MyElement {
  private title: string;
  private subject: Subject<any>;

  constructor(title: string) {
    this.title = title;
    this.subject = new Subject<any>();
  }

  observe(): Observable<any> {
    return this.subject;
  }

  renderTo(document: Document, element: HTMLElement): void {
    const input = document.createElement("button");
    input.appendChild(document.createTextNode(this.title));
    element.appendChild(input);
    fromEvent(input, "click").subscribe(this.subject);
  }
}
