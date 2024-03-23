import { ChangeDetectionStrategy, Component } from '@angular/core';

export interface DeleteCategoryComponentData {
  categoryId: string;
}

@Component({
  selector: 'app-delete-category',
  templateUrl: 'delete-category.component.html',
  styleUrl: 'delete-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteCategoryComponent {

}
