import {filter, map, merge, Observable, scan} from "rxjs";
import {tuiIsPresent} from "@taiga-ui/cdk";

export function combineReload<T>(value$: Observable<T>, reload$: Observable<void>): Observable<T> {
  return merge(value$, reload$).pipe(
    scan((oldValue, currentValue) => currentValue ?? oldValue),
    filter((value) => tuiIsPresent(value)),
    map((value) => value as T)
  );
}
