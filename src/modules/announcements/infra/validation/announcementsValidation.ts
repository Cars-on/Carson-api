/* eslint-disable no-return-await */
import * as Yup from 'yup';

class VerifyParams {
  public async execute(datas: any) {
    const schema = Yup.object().shape(
      {
        cnpj: Yup.string().when('cpf', {
          is: '',
          then: Yup.string().required(),
          otherwise: Yup.string(),
        }),
        cpf: Yup.string().when('cnpj', {
          is: '',
          then: Yup.string().required(),
          otherwise: Yup.string(),
        }),
        manufacturer: Yup.string().required(),
        brand: Yup.string().required(),
        model: Yup.string().required(),
        advertiser_code: Yup.string().required(),
        manufacturer_year: Yup.string().required(),
        brand_year: Yup.string().required(),
        price: Yup.string().required(),
        description: Yup.string(),
      },
      ['cnpj', 'cpf'],
    );

    try {
      await schema.validate(datas, {
        abortEarly: false,
      });
    } catch (error) {
      return await error.errors;
    }
  }
}

export { VerifyParams };
