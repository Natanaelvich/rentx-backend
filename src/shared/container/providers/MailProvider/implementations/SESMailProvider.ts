/* eslint-disable no-console */
import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';
import { inject, injectable } from 'tsyringe';
import fs from 'fs';
import handlebars from 'handlebars';

import mailConfig from '@config/mail';
import ITemplateMailProvider from '../../TemplateMailProvider/models/ITemplateMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('TemplateMailProvider')
    private templateMailProvider: ITemplateMailProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-1',
      }),
    });
  }

  public async sendMail({
    subject,
    variables,
    to,
    path,
  }: ISendMailDTO): Promise<void> {
    const { email, name } = mailConfig.defaults.from;

    const templateFileContent = fs.readFileSync(path).toString('utf-8');
    const templateParse = handlebars.compile(templateFileContent);
    const templateHtml = templateParse(variables);

    // await this.client.sendMail({
    //   from: {
    //     name: from?.name || name,
    //     address: from?.email || email,
    //   },
    //   to: {
    //     name: to.name,
    //     address: to.email,
    //   },
    //   subject,
    //   html: await this.templateMailProvider.parse(templateData),
    // });
    await this.client.sendMail({
      to,
      from: {
        name,
        address: email,
      },
      subject,
      html: templateHtml,
    });
  }
}
