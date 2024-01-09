import {ChangeDetectionStrategy, Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {emailValidator} from "@core/helpers/validators/email.validator";
import {ThemeService} from "@core/services/theme.service";
import {ActivatedRoute, Router} from "@angular/router";
import {finalize, Observable} from "rxjs";
import {TuiCountryIsoCode} from '@taiga-ui/i18n';
import {SignInService} from "@pages/auth/sign-in/sign-in.service";
import {HttpErrorResponse} from "@angular/common/http";

interface ISignInForm {
  login: FormControl<string>;
  password: FormControl<string>;
  type: FormControl<string>;
  countryCode: FormControl<string>;
}

@Component({
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {
  private readonly _returnUrl: string | null;

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
    private signInService: SignInService,
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
    this.isAuthInProcess = true;
    this.formGroup.disable();

    this.signInService.submit(this.formGroup.value)
      .pipe(
        finalize(() => {
          this.formGroup.enable();
          this.isAuthInProcess = false;
        })
      )
      .subscribe({
        next: (r) => {
          localStorage.setItem("access_token", r.token);
          this.router.navigateByUrl(this._returnUrl ?? '/');
        },
        error: (e: HttpErrorResponse) => {
          this.error = e.error.message;
        }
      });
  }

  switchTheme(): void {
    this.night.toggle();
  }

  themeValue(): boolean {
    return this.night.value;
  }

}
