import {FormControl} from "@angular/forms";

export interface CategoryActionModel {
  name: FormControl<string>;
  displayOrder: FormControl<number | null>;
  defaultLink: FormControl<string | null>;
  badgeText: FormControl<string | null>;
  badgeStyle: FormControl<string | null>;
  isPublished: FormControl<boolean | null>;
  showOnHomePage: FormControl<boolean | null>;
  ico: FormControl<string | null>;
  description: FormControl<string | null>;
  photo: FormControl<File[] | null>;
  subCategories: FormControl<string[] | null>;
  categoryTags: FormControl<string[] | null>;
  products: FormControl<string[] | null>;
}

export interface CategoryFormValueModel {
  name: string;
  displayOrder: number | null;
  defaultLink: string | null;
  badgeText: string | null;
  badgeStyle: string | null;
  isPublished: boolean | null;
  showOnHomePage: boolean | null;
  ico: string | null;
  description: string | null;
  photo: File | null;
  subCategories: string[] | null;
  categoryTags: string[] | null;
  products: string[] | null;
}
