import { ChangeDetectionStrategy, Component } from '@angular/core';
import {SettingsService} from "@pages/account/settings/settings.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {finalize} from "rxjs";

interface ICreate {
  file: FormControl<File[]>;
  bucket: FormControl<string>;
}

@Component({
  selector: 'account-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SettingsService]
})
export class SettingsComponent {
  formGroup: FormGroup<ICreate>;
  imageURL: string | undefined;

  constructor(private http: HttpClient) {
    this.formGroup = new FormGroup<ICreate>({
      bucket: new FormControl('', { nonNullable: true, validators: Validators.required }),
      file: new FormControl([], { nonNullable: true, validators: Validators.required })
    });
  }

  showPreview(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.item(0);
    // this.formGroup.patchValue({
    //   file: file, bucket: ''
    // });

    // this.formGroup.get('file')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }

    // @ts-ignore
    reader.readAsDataURL(file);
  }

  submit(): void {
    if (this.formGroup.invalid)
      return;

    // const formData = new FormData();
    // formData.append("bucket", this.formGroup.value.bucket);
    // formData.append("file", this.formGroup.value.file);
    //
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data');
    //
    // const httpOptions = {
    //   headers: headers
    // };
    //
    // this.http.post("/file/minios/create", formData, httpOptions)
    //   .pipe(
    //   finalize(() => {
    //     console.log("finished")
    //   })
    // )
    //   .subscribe({
    //     next: (r) => {
    //       console.log(r)
    //     },
    //     error: (e: HttpErrorResponse) => {
    //       console.log(e)
    //     }
    //   });
  }

}
