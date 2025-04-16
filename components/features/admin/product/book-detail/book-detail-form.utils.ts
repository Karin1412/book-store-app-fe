import { PickerItem } from "@/components/common/combobox";
import { Author } from "@/types/author";
import { Publisher } from "@/types/publisher";

export const convertAuthorToPickerItem = (author: Author): PickerItem => ({
  label: author.name,
  value: author.id,
});

export const convertPublisherToPickerItem = (
  publisher: Publisher
): PickerItem => ({
  label: publisher.name,
  value: publisher.id,
});
