import { FormControl } from '@angular/forms';
import { Observable, startWith } from 'rxjs';

export function controlValue$<T>(control: FormControl<T>): Observable<T> {
  return control.valueChanges.pipe(startWith(control.value));
}
