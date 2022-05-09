import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  skip,
  startWith,
  Subject,
  switchMap,
  tap,
} from "rxjs";

// https://stackoverflow.com/questions/72104497/combinelatest-with-variable-count-of-observables
export function dynamicCombineLatest(startingObservables: Observable<any>[]) {
  // this is the variable holding the array of Observables
  let observables = startingObservables;

  // this is the array that contains the list of Observables which have been, potentially, transformed to emit
  // immediately the last value emitted - this happens when a new Observable is added to the array
  let observablesPotentiallyWithLastValueImmediatelyEmitted =
    startingObservables;

  // this is the variable holding the array of values last notified by each Observable
  // we will use it when we need to add a new Observable to the list
  const lastValues: any[] = [];

  // this are the Subjects used to notify the 3 different types of events
  const start = new BehaviorSubject<Observable<any>[]>(observables);
  const add = new Subject<Observable<any>>();
  const remove = new Subject<Observable<any>>();

  let skipFirst = false;

  // this is the chain of operations which must happen when a new Observable is added
  const addToObservables = add.pipe(
    tap({
      next: (obs) => {
        // we need to make sure that the Observables in the list will immediately start to emit
        // the last value they emitted. In this way we are sure that, as soon as the new added Observable emits somthing,
        // the last value emitted by the previous Observables will be considered
        observablesPotentiallyWithLastValueImmediatelyEmitted = observables.map(
          (o, i) => {
            return startWith(lastValues[i])(o);
          }
        );
        // the new Observable is added to the list
        observables.push(obs);
        observablesPotentiallyWithLastValueImmediatelyEmitted.push(obs);
      },
    })
  );
  // this is the chain of operations which must happen when an Observable is removed
  const removeFromObservables = remove.pipe(
    tap({
      next: (obs) => {
        const index =
          observablesPotentiallyWithLastValueImmediatelyEmitted.indexOf(obs);
        // we simply remove the Observable from the list and it "last value"
        observablesPotentiallyWithLastValueImmediatelyEmitted.splice(index, 1);
        observables.splice(index, 1);
        lastValues.splice(index, 1);

        // we make sure that the Observables in the list will immediately start to emit with the last value they emitted
        observablesPotentiallyWithLastValueImmediatelyEmitted = observables.map(
          (o, i) => {
            return lastValues[i] ? startWith(lastValues[i])(o) : o;
          }
        );
        // we set that the first value of the new combineLatest Observable will be skipped
        skipFirst = true;
      },
    })
  );

  // here we merge the 2 chains of operations so that both add and remove logic will be executed
  // when the relative Subjects emit
  merge(addToObservables, removeFromObservables).subscribe({
    next: () => {
      // we notify that a change in the Observable list has occurred and therefore we need to unsubscribe the previous "combineLatest"
      // and subscribe to the new one we are going to build
      start.next(observablesPotentiallyWithLastValueImmediatelyEmitted);
    },
  });

  // this is where we switch to a new Observable, result of the "combineLatest" operation,
  // any time the start Subject emits a new Observable list
  const dynamicObservables = start.pipe(
    switchMap((_observables) => {
      const _observablesSavingLastValueAndSignallingRemove = _observables.map(
        (o, i) =>
          o.pipe(
            tap({
              next: (v) => {
                // here we save the last value emitted by each Observable
                lastValues[i] = v;
              },
              complete: () => {
                // here we notify that the Observable has completed and we need to remove it from the list
                remove.next(o);
              },
            })
          )
      );
      // eventually this is the Observable created by combineLatest with the expected array of Observables
      const _combineLatest = combineLatest(
        _observablesSavingLastValueAndSignallingRemove
      );
      const ret = skipFirst ? _combineLatest.pipe(skip(1)) : _combineLatest;
      skipFirst = false;
      return ret;
    })
  );

  // here we return the Observable which will be subscribed to and the add Subject to be used to add new Observables
  return { dynamicObservables, add };
}
