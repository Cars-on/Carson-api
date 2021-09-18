import { ObjectId } from 'mongodb';

interface IAnnouncementLogs {
  id: ObjectId;
  manufacturer: string;
  brand: string;
  model: string;
  advertiser_code: string;
  manufacturer_year: string;
  brand_year: string;
  cpf: string;
  cnpj: string;
  price: string;
  error: string[];
  line: number;
  description: string;
  lot: string;
}

export { IAnnouncementLogs };
