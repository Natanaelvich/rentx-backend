interface ImailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

const mailConfig = {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'natanaelima@mundotech.dev',
      name: 'Rentx',
    },
  },
} as ImailConfig;

export default mailConfig;
