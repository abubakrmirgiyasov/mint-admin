import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {emailValidator} from "@core/helpers/validators/email.validator";
import {ThemeService} from "@core/services/theme.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {TuiCountryIsoCode} from '@taiga-ui/i18n';

interface ISignInForm {
  login: FormControl<string>;
  password: FormControl<string>;
  type: FormControl<string>;
  countryCode: FormControl<string>;
}

@Component({
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  private _returnUrl: string | null;

  users$!: Observable<string[]>;
  formGroup!: FormGroup<ISignInForm>;
  error: string | null = null;
  isAuthInProcess = false;
  type: boolean = true;
  countryIsoCode: TuiCountryIsoCode = TuiCountryIsoCode.RU;

  types: readonly string[] = [
    'Email',
    'Phone'
  ];

  countries: readonly TuiCountryIsoCode[] = [
    TuiCountryIsoCode.TJ,
    TuiCountryIsoCode.RU,
    TuiCountryIsoCode.KZ,
  ];

  constructor(
    protected night: ThemeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initForm();

    this._returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  initForm(): void {
    this.formGroup = new FormGroup<ISignInForm>({
      type: new FormControl(this.type ? 'Email' : 'Phone', { nonNullable: true, validators: Validators.required }),
      login: new FormControl('', { nonNullable: true, validators: !this.type ? Validators.required : [Validators.required, emailValidator] }),
      password: new FormControl('', { nonNullable: true, validators: Validators.required }),
      countryCode: new FormControl(this.countryIsoCode.toString(), { nonNullable: true, validators: Validators.required })
    });
  }

  onTypeChanged(type: string): void {
    this.type = type === 'Email';

    this.initForm();
  }

  onPhoneCountryCodeChange(countryIsoCode:  TuiCountryIsoCode): void {
    this.countryIsoCode = countryIsoCode;

    this.initForm();
  }

  submit(): void {
    console.log(this.formGroup.value)
  }

  switchTheme(): void {
    this.night.toggle();
  }

  themeValue(): boolean {
    return this.night.value;
  }

}
