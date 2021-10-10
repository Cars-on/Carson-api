export interface IQueryParamsDTO {
  page: number;
  per_page: number;
  city?: string;
  lowest_price?: string;
  biggest_price?: string;
  model?: string;
  lowest_year?: string;
  biggest_year?: string;
  brand?: string;
  manufacturer?: string;
}
