import { celebrate, Joi, Segments } from 'celebrate';

export const announcementsUserValidate = celebrate({
  [Segments.QUERY]: {
    page: Joi.number().default(1),
    per_page: Joi.number().default(12),
  },
});
