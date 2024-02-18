export interface Pagination<T> {
  content: T[]; // Represents the list of items on the current page
  totalPages: number; // Total number of pages
  totalElements: number; // Total number of elements
  number: number; // Current page number
  size: number; // Number of elements per page
  // Add any additional fields as needed based on your API response
}
