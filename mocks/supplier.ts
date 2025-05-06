import { Supplier } from "@/types/supplier";

export const mockSuppliers: Supplier[] = [
  {
    id: "sup-001",
    name: "Global Book Distributors",
    email: "contact@globalbooks.com",
    phone: "+1-555-123-4567",
    debt: 1250.5,
  },
  {
    id: "sup-002",
    name: "Academic Publishing House",
    email: "sales@academicpub.com",
    phone: "+1-555-234-5678",
    debt: 890.0,
  },
  {
    id: "sup-003",
    name: "Readers World Supplies",
    email: "info@readersworld.com",
    phone: "+1-555-345-6789",
    debt: 0.0,
  },
  {
    id: "sup-004",
    name: "BookStream International",
    email: "support@bookstream.com",
    phone: "+1-555-456-7890",
    debt: 2345.75,
  },
  {
    id: "sup-005",
    name: "Library Essentials Ltd.",
    email: "orders@libraryessentials.com",
    phone: "+1-555-567-8901",
    debt: 315.2,
  },
];

export const mockSimpleSuppliers = mockSuppliers.map((supplier) => ({
  id: supplier.id,
  name: supplier.name,
  phone: supplier.phone,
}));
