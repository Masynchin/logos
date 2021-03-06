import { SVG } from "@svgdotjs/svg.js";
import { WithStrokes } from "./figure/withStroke";
import { MainWidget } from "./widget/main";

class Editor {
  private document: Document;
  private logoElement: HTMLElement;

  constructor(document: Document, logoElement: HTMLElement) {
    this.document = document;
    this.logoElement = logoElement;
  }

  run(): void {
    const logo = SVG().addTo(this.logoElement).viewbox("0 0 161 125");

    new MainWidget(this.document)
      .asObservable()
      .subscribe(([figures, style]) => {
        logo.clear().width(style.width).fill("none");
        new WithStrokes(figures, style.stroke).render(logo);
      });
  }
}

new Editor(document, document.getElementById("logo")).run();
