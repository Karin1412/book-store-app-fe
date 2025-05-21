import { PickerItem } from "@/components/common/combobox";
import { BookTitle } from "@/types/book";

export const convertBookTitleToPickerItem = (
  bookTitle: BookTitle
): PickerItem => ({
  label: bookTitle.name,
  value: bookTitle.id,
});
