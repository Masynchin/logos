import { combineLatest, Observable } from "rxjs";
import { Figure } from "../figure";
import { StreamFigures } from "./figures";
import { LogoSettings } from "../logoSettings";
import { StreamLogoSettings } from "./logoSettings";
import { Stream } from "../stream";

export class MainStream implements Stream<[Figure[], LogoSettings]> {
  private figures: StreamFigures;
  private logoSettings: StreamLogoSettings;

  constructor(document: Document) {
    this.figures = new StreamFigures(
      document,
      document.getElementById("editor")
    );
    this.logoSettings = new StreamLogoSettings(document);
  }

  asObservable(): Observable<[Figure[], LogoSettings]> {
    return combineLatest([
      this.figures.asObservable(),
      this.logoSettings.asObservable(),
    ]);
  }
}
