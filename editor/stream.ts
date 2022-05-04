import { Observable } from "rxjs";

export interface Stream<T> {
  asObservable(): Observable<T>;
}
