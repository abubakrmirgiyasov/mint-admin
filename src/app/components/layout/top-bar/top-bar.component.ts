import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {DATA_SIDEBAR_SIZE} from "@core/helpers/constants/storage.constants";
import {changeSidebarSize, isClientMobile, setMobileMenuOverlay} from "@core/helpers/layout.helper";
import {DataLayoutSizes, VERTICAL_SIDEBAR_ENABLE} from "@core/helpers/constants/layout.constants";
import {getJwtUser} from "@core/helpers/jwt-decode.helper";
import {JwtUser} from "@core/models/jwt.user";
import {ThemeService} from "@core/services/theme.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit {
  userInfo!: JwtUser;
  userInfoIsOpened = false;

  constructor(
    protected night: ThemeService,
  ) { }

  ngOnInit(): void {
    this.userInfo = getJwtUser();
  }

  onMobileMenuButtonClick(event: MouseEvent) {
    event.preventDefault();

    if (isClientMobile()) {
      setMobileMenuOverlay();
    } else {
      const dataLayoutSize = localStorage.getItem(DATA_SIDEBAR_SIZE)!;
      changeSidebarSize(dataLayoutSize);

      const hamburgerSpan = document.querySelector('.hamburger-icon');
      hamburgerSpan?.classList.toggle('open');
    }
  }

  onUserInfoClick(): void {
    this.userInfoIsOpened = !this.userInfoIsOpened;
  }

  onUserInfoObscured(obscured: any): void {
    this.userInfoIsOpened = obscured ?? false;
  }

  onUserInfoActiveZone(active: any): void {
    this.userInfoIsOpened = active && this.userInfoIsOpened;
  }

  switchTheme(): void {
    this.night.toggle();
  }

  themeValue(): boolean {
    return this.night.value;
  }
}
