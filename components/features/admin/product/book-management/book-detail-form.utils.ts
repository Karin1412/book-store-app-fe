import { PickerItem } from "@/components/common/combobox";
import { BookTitle } from "@/types/book";
import { Publisher } from "@/types/publisher";

export const convertPublisherToPickerItem = (
  publisher: Publisher
): PickerItem => ({
  label: publisher.name,
  value: publisher.id,
});

export const convertBookTitleToPickerItem = (
  bookTitle: BookTitle
): PickerItem => ({
  label: bookTitle.name,
  value: bookTitle.id,
});
