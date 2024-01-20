import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {JwtUser} from "@core/models/jwt.user";
import {getJwtUser} from "@core/helpers/jwt-decode.helper";
import {ProfileService} from "@pages/account/profile/profile.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {finalize} from "rxjs";

@Component({
  selector: 'user-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  activeItemIndex = 0;
  userInfo!: JwtUser;

  constructor(
    private readonly http: HttpClient,
    private readonly profileService: ProfileService
  ) {
    this.userInfo = getJwtUser();

    http.get<any>('/account/admin', {
      params: {
        id: this.userInfo.id
      }
    })
      .pipe(
      finalize(() => {
        console.log('finished')
      })
    )
      .subscribe({
        next: (r) => {
          console.log(r)
        },
        error: (e: HttpErrorResponse) => {
          console.log(e)
        }
      });
  }

  ngOnInit(): void {
  }

  onTabChange(item: string): void {

  }
}
