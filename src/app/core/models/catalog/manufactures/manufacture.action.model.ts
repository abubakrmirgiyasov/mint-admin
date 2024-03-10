import { FormControl } from "@angular/forms";

import { ContactDetailType } from "@core/helpers";

export interface ManufactureActionModel {
  name: FormControl<string>;
  displayOrder: FormControl<number>;
  description: FormControl<string | null>;
  country: FormControl<string>;
  fullAddress: FormControl<string | null>;
  website: FormControl<string | null>;
  folder: FormControl<string | null>;
  photo: FormControl<File[] | null>;
}

export interface ManufactureContactActionModel {
  type: FormControl<ContactDetailType>;
  contactInformation: FormControl<string>;
}
