export interface IUpdateAnnouncementsDTO {
  id: string;
  user_id: string;
  manufacturer?: string;
  brand?: string;
  model?: string;
  manufacturer_year?: string;
  brand_year?: string;
  price?: string;
  description?: string;
}
