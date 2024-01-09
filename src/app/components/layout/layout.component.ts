import {Component, OnInit} from '@angular/core';
import {DataLayoutSizes, VERTICAL_SIDEBAR_ENABLE} from "@core/helpers/constants/layout.constants";
import {DATA_SIDEBAR_SIZE} from "@core/helpers/constants/storage.constants";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  ngOnInit(): void {
    if (document.documentElement.clientWidth <= 767)
      document.body.classList.toggle(VERTICAL_SIDEBAR_ENABLE);

    const dataLayoutSize = localStorage.getItem(DATA_SIDEBAR_SIZE);

    if (dataLayoutSize) {
      const hamburgerSpan = document.querySelector('.hamburger-icon');

      if (dataLayoutSize === DataLayoutSizes[DataLayoutSizes.sm]) {
        hamburgerSpan?.classList.add('open');
      }

      document.documentElement.setAttribute(
        DATA_SIDEBAR_SIZE,
        dataLayoutSize
          ? dataLayoutSize
          : DataLayoutSizes[DataLayoutSizes.lg]
      );
    } else {
      localStorage.setItem(DATA_SIDEBAR_SIZE, DataLayoutSizes[DataLayoutSizes.lg]);
      document.documentElement.setAttribute(DATA_SIDEBAR_SIZE, DataLayoutSizes[DataLayoutSizes.lg]);
    }
  }

  onToggleMobileMenu(): void {
    if (document.documentElement.clientWidth <= 767) {
      window.addEventListener('click', this.onToggleMobileMenu);
      document.body.classList.toggle(VERTICAL_SIDEBAR_ENABLE);
    }
  }

}
