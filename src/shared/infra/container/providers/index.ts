import { container } from 'tsyringe';

import { IMailProvider } from './mailProvider/models/IMailProvider';
import { EtherealMailProvider } from './mailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

const handlebarsMailTemplateProvider = new HandlebarsMailTemplateProvider();

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(handlebarsMailTemplateProvider),
);
