import { SVG } from "@svgdotjs/svg.js";
import { WithStrokes } from "./figure/withStroke";
import { MainStream } from "./stream/main";

class Editor {
  private document: Document;
  private logoElement: HTMLElement;

  constructor(document: Document, logoElement: HTMLElement) {
    this.document = document;
    this.logoElement = logoElement;
  }

  run(): void {
    const logo = SVG().addTo(this.logoElement).viewbox("0 0 161 125");

    new MainStream(this.document)
      .asObservable()
      .subscribe(([figures, logoSettings]) => {
        const stroke = {
          color: logoSettings.stroke,
          width: +logoSettings.strokeWidth,
        };
        logo.clear().width(logoSettings.width).fill("none");
        new WithStrokes(figures, stroke).render(logo);
      });
  }
}

new Editor(document, document.getElementById("logo")).run();
