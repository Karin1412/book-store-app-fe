import { BookTitle } from "@/types/book";
import { mockAuthors } from "./author";
import { mockCategories } from "./category";

export const mockBookTitles: BookTitle[] = [
  {
    id: "1",
    name: "The Pragmatic Programmer",
    isActive: true,
    author: mockAuthors[0],
    category: mockCategories[0],
    description: "A guide to becoming a better programmer.",
  },
  {
    id: "2",
    name: "Clean Code",
    isActive: true,
    author: mockAuthors[1],
    category: mockCategories[1],
    description: "A handbook of agile software craftsmanship.",
  },
  {
    id: "3",
    name: "Atomic Habits",
    isActive: true,
    author: mockAuthors[2],
    category: mockCategories[2],
    description: "An easy & proven way to build good habits & break bad ones.",
  },
  {
    id: "4",
    name: "Deep Work",
    isActive: true,
    author: mockAuthors[3],
    category: mockCategories[3],
    description: "Rules for focused success in a distracted world.",
  },
  {
    id: "5",
    name: "The Power of Habit",
    isActive: true,
    author: mockAuthors[0],
    category: mockCategories[0],
    description: "Why we do what we do in life and business.",
  },
  {
    id: "6",
    name: "The 7 Habits of Highly Effective People",
    isActive: true,
    author: mockAuthors[0],
    category: mockCategories[0],
    description: "Powerful lessons in personal change.",
  },
  {
    id: "7",
    name: "Thinking, Fast and Slow",
    isActive: true,
    author: mockAuthors[1],
    category: mockCategories[1],
    description: "A tour of the mind.",
  },
  {
    id: "8",
    name: "Sapiens: A Brief History of Humankind",
    isActive: true,
    author: mockAuthors[2],
    category: mockCategories[2],
    description: "A brief history of humankind.",
  },
  {
    id: "9",
    name: "Educated",
    isActive: true,
    author: mockAuthors[3],
    category: mockCategories[3],
    description: "A memoir about",
  },
  {
    id: "10",
    name: "Becoming",
    isActive: true,
    author: mockAuthors[0],
    category: mockCategories[0],
    description: "A memoir by Michelle Obama.",
  },
];
