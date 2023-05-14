import {defineEventHandler} from 'h3';
import nodemailer from 'nodemailer';

import {useRuntimeConfig} from '#imports';
import phoneFormat, {PhoneMask} from '~/utils/phoneFormat';

type RequestDataType = {
  name: string;
  phone: string;
  message: string;
  files: {data: Buffer, name: string}[];
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  if (!config.smtpHost || !config.smtpPort || !config.smtpUser || !config.smtpPassword) throw createError({statusCode: 500});

  const body = await readMultipartFormData(event);
  if (!body) throw createError({statusCode: 400});

  const data = body.reduce<RequestDataType>((acc, el) => ({
    ...acc,
    [el.name || '']: el.filename ? [...acc.files, {data: el.data, name: el.filename}] : el.data.toString(),
  }), {
    name: '', phone: '', message: '', files: [],
  });
  if (!data.name || !data.phone || !data.message) throw createError({statusCode: 400});

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPassword,
    },
  });
  await transporter.sendMail({
    from: 'info@faraday-metal.ru',
    to: 'alexbidenko1998@gmail.com',
    subject: 'Заявка с сайта Faraday Metal',
    html: [
      `Заявка от клиента: ${data.name}`,
      `Номер телефона клиента: <a href="tel:${data.phone}">${phoneFormat(data.phone, PhoneMask.detailed)}</a>`,
      '',
      `Сообщение клиента: ${data.message}`,
    ].join('<br>'),
    attachments: data.files.map((el) => ({
      filename: el.name,
      content: el.data,
    })),
  });

  return {status: 'success'};
});
