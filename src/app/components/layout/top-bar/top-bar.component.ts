import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DATA_SIDEBAR_SIZE} from "@core/helpers/constants/storage.constants";
import {changeSidebarSize} from "@core/helpers/layout.helper";
import {DataLayoutSizes, VERTICAL_SIDEBAR_ENABLE} from "@core/helpers/constants/layout.constants";
import {getJwtUser} from "@core/helpers/jwt-decode.helper";
import {JwtUser} from "@core/models/jwt.user";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit {
  @Output() mobileMenuButtonClick = new EventEmitter();

  userInfo!: JwtUser;
  userInfoIsOpened = false;

  ngOnInit(): void {
    this.userInfo = getJwtUser();
  }

  onMobileMenuButtonClick(event: MouseEvent) {
    event.preventDefault();
    this.mobileMenuButtonClick.emit();

    const dataLayoutSize = localStorage.getItem(DATA_SIDEBAR_SIZE)!;
    changeSidebarSize(dataLayoutSize);

    const hamburgerSpan = document.querySelector('.hamburger-icon');
    hamburgerSpan?.classList.toggle('open');

    if (document.documentElement.clientWidth <= 767)
      document.body.classList.toggle(VERTICAL_SIDEBAR_ENABLE);
  }

  onUserInfoClick(): void {
    this.userInfoIsOpened = !this.userInfoIsOpened;
  }

  onUserInfoObscured(obscured: any): void {
    console.log(obscured)
    if (obscured)
      this.userInfoIsOpened = false;
  }

  onUserInfoActiveZone(active: any): void {
    console.log(active)
    this.userInfoIsOpened = active && this.userInfoIsOpened;
  }

}
