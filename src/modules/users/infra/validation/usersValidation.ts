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

        name: Yup.string().required(),
        user_name: Yup.string().required(),
        email: Yup.string().required().email(),
        phone: Yup.string().required(),
        address: Yup.string().required(),
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
