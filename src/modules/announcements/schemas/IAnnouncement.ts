import { ObjectId } from 'mongodb';

interface IAnnouncement {
  id: ObjectId;
  user_id: string;
  manufacturer: string;
  brand: string;
  model: string;
  advertiser_code: string;
  manufacturer_year: string;
  brand_year: string;
  cpf: string;
  cnpj: string;
  price: string;
  description: string;
  lot: string;
  photos?: string[];
}

export { IAnnouncement };
