import { ValidatorFn, Validators } from '@angular/forms';
import { tuiValidatorFn, ContactDetailType } from '@core/helpers';

export const emailValidator: ValidatorFn = tuiValidatorFn(
  Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
  'Incorrect email'
);

export const VALIDATORS_BY_TYPE: Record<ContactDetailType, ValidatorFn[]> = {
  [ContactDetailType.Phone]: [Validators.required, Validators.pattern(/^\+\d{8,14}$/)],
  [ContactDetailType.Email]: [Validators.required, Validators.email],
};
