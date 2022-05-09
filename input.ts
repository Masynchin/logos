import { Observable } from "rxjs";

export interface Input<T> {
  observe(): Observable<T>;
}
