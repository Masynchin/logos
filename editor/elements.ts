export interface MyElement {
  renderTo(document: Document, element: HTMLElement): void;
}

export class Section implements MyElement {
  private children: MyElement[];

  constructor(children: MyElement[]) {
    this.children = children;
  }

  renderTo(document: Document, element: HTMLElement) {
    const section = document.createElement("section");
    this.children.forEach((c) => c.renderTo(document, section));
    element.appendChild(section);
  }
}

export class H3 implements MyElement {
  private title: string;

  constructor(title: string) {
    this.title = title;
  }

  renderTo(document: Document, element: HTMLElement): void {
    const h3 = document.createElement("h3");
    const headingTitle = document.createTextNode(this.title);
    h3.appendChild(headingTitle);
    element.appendChild(h3);
  }
}

export class Ul implements MyElement {
  private items: Li[];

  constructor(items: Li[]) {
    this.items = items;
  }

  renderTo(document: Document, element: HTMLElement): void {
    const ul = document.createElement("ul");
    this.items.forEach((i) => i.renderTo(document, ul));
    element.appendChild(ul);
  }
}

export class Li implements MyElement {
  private child: MyElement;

  constructor(child: MyElement) {
    this.child = child;
  }

  renderTo(document: Document, element: HTMLElement): void {
    const li = document.createElement("li");
    this.child.renderTo(document, li);
    element.appendChild(li);
  }
}

export class Label implements MyElement {
  private children: MyElement[];

  constructor(children: MyElement[]) {
    this.children = children;
  }

  renderTo(document: Document, element: HTMLElement): void {
    const label = document.createElement("label");
    this.children.forEach((c) => c.renderTo(document, label));
    element.appendChild(label);
  }
}

export class TextElement implements MyElement {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  renderTo(document: Document, element: HTMLElement): void {
    const text = document.createTextNode(this.text);
    element.appendChild(text);
  }
}

export class Input implements MyElement {
  private type: string;
  private value: string;

  constructor(type: string, value: string) {
    this.type = type;
    this.value = value;
  }

  renderTo(document: Document, element: HTMLElement): void {
    const input = document.createElement("input");
    input.type = this.type;
    input.value = this.value;
    element.appendChild(input);
  }
}
