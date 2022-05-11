import { Observable } from "rxjs";

export interface Widget<T> {
  asObservable(): Observable<T>;
}
