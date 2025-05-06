import { PickerItem } from "@/components/common/combobox";
import { Author } from "@/types/author";
import { Category } from "@/types/category";

export const convertAuthorToPickerItem = (author: Author): PickerItem => ({
  label: author.name,
  value: author.id,
});

export const convertCategoryToPickerItem = (
  category: Category
): PickerItem => ({
  label: category.name,
  value: category.id,
});
