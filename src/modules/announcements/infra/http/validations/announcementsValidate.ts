import { celebrate, Joi, Segments } from 'celebrate';

export const announcementsQueryFilter = celebrate({
  [Segments.QUERY]: {
    page: Joi.number().default(1),
    per_page: Joi.number().default(12),
    city: Joi.string(),
    lowest_price: Joi.string(),
    biggest_price: Joi.string(),
    model: Joi.string(),
    lowest_year: Joi.string(),
    biggest_year: Joi.string(),
    brand: Joi.string(),
    manufacturer: Joi.string(),
  },
});
