import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-crm',
  standalone: true,
  imports: [],
  templateUrl: './crm.component.html',
  styleUrl: './crm.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrmComponent {

}