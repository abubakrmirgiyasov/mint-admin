import {ValidatorFn, Validators} from "@angular/forms";
import {tuiValidatorFn} from "../tui-validator.function";

export const emailValidator: ValidatorFn = tuiValidatorFn(
  Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
  'Incorrect email'
);
