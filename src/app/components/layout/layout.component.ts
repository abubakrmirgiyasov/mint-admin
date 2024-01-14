import {Component, OnInit} from '@angular/core';
import {DataLayoutSizes, VERTICAL_SIDEBAR_ENABLE} from "@core/helpers/constants/layout.constants";
import {DATA_MOBILE, DATA_SIDEBAR_SIZE} from "@core/helpers/constants/storage.constants";
import {
  changeHTMLAttribute,
  isClientMobile,
  setDataSidebarSize,
  setMobileMenuOverlay
} from "@core/helpers/layout.helper";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  ngOnInit(): void {
    const dataLayoutSize = localStorage.getItem(DATA_SIDEBAR_SIZE)!;

    this.onVerticalOverlayToggle();

    setDataSidebarSize(dataLayoutSize);

    changeHTMLAttribute(DATA_MOBILE, String(isClientMobile()));

    if (dataLayoutSize) {
      const hamburgerSpan = document.querySelector('.hamburger-icon');

      if (dataLayoutSize === DataLayoutSizes[DataLayoutSizes.sm])
        hamburgerSpan?.classList.add('open');

      changeHTMLAttribute(
        DATA_SIDEBAR_SIZE,
        dataLayoutSize
          ? dataLayoutSize
          : DataLayoutSizes[DataLayoutSizes.lg]
      );
    }
  }

  onToggleMobileMenu(): void {
    if (isClientMobile()) {
      setMobileMenuOverlay();
    }
  }

  onVerticalOverlayToggle(): void {
    const overlay = document.querySelector('.vertical-overlay');
    overlay?.addEventListener('click', this.onToggleMobileMenu);
  }
}
