import { CategoryTagSampleModel, ManufactureSampleModel, SubCategoriesSampleModel } from "@core/models";

export interface CategoryModel {
  id: string;
  name: string;
  ico: string | null;
  badgeStyle: string | null;
  badgeText: string | null;
  defaultLink: string | null;
  displayOrder: number;
  photo: string | null;
  subCategories: SubCategoriesSampleModel[] | null;
  categoryTags: CategoryTagSampleModel[] | null;
  manufactureCategories: ManufactureSampleModel[] | null;
}
