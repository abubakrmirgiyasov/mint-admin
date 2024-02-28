import { FormControl } from '@angular/forms';

export interface SubCategoriesActionModel {
  displayOrder: FormControl<number | null>;
  name: FormControl<string>;
  defaultLink: FormControl<string>;
  fullName: FormControl<string | null>;
  categoryId: FormControl<string>;
}
