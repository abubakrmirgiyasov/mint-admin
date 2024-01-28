import {ChangeDetectionStrategy, Component} from "@angular/core";
import {CategoriesService} from "@pages/catalog/categories/categories.service";

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.component.html',
  styleUrl: 'categories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent {
  columns = [
    'displayOrder',
    'photo',
    'name',
    'ico',
    'badgeStyle',
    'badgeText',
    'defaultLink',
    'subCategories',
    'actions',
  ];

  applySearch(value: string): void {

  }

  refresh(): void {

  }
}
