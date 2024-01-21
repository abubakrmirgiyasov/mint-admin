import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MenuItem} from "@core/models/menu.item";
import {MENU} from "@components/layout/sidebar/menu";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  @Output() onVerticalOverlayToggle = new EventEmitter();
  menuItems: MenuItem[] = [];

  constructor(
    protected readonly translate: TranslateService
  ) {
    translate.setDefaultLang('ru');
  }

  ngOnInit(): void {
    this.menuItems = MENU;
  }

  onToggle = (event: MouseEvent): void => {
    event.preventDefault();

    this.onVerticalOverlayToggle.emit();
  };

  hasItems(item: MenuItem): boolean {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }
}
