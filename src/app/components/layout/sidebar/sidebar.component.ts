import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Output() onVerticalOverlayToggle = new EventEmitter();

  onToggle = (event: MouseEvent): void => {
    event.preventDefault();

    this.onVerticalOverlayToggle.emit();
  };
}
