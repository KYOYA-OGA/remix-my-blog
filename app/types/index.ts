import type { MicroCMSDate, MicroCMSImage } from 'microcms-js-sdk';

export type Content = {
  id: string;
  title: string;
  eyecatch: MicroCMSImage;
  createdAt: string;
  content: string;
  cover?: MicroCMSImage;
} & MicroCMSDate;

export type Errors = {
  name?: boolean;
  email?: boolean;
  message?: boolean;
};
