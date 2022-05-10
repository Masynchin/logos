import { combineLatest, Observable } from "rxjs";
import { Figure } from "../figure";
import { WidgetFigures } from "./figures";
import { LogoSettings } from "../logoSettings";
import { WidgetLogoSettings } from "./logoSettings";
import { Widget } from "../widget";

export class MainWidget implements Widget<[Figure[], LogoSettings]> {
  private figures: WidgetFigures;
  private logoSettings: WidgetLogoSettings;

  constructor(document: Document) {
    this.figures = new WidgetFigures(
      document,
      document.getElementById("editor")
    );
    this.logoSettings = new WidgetLogoSettings(document);
  }

  asObservable(): Observable<[Figure[], LogoSettings]> {
    return combineLatest([
      this.figures.asObservable(),
      this.logoSettings.asObservable(),
    ]);
  }
}
