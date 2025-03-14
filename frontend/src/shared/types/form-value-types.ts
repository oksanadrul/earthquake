import { ZonedDateTime } from '@internationalized/date';

export type FormValues = {
  id?: string | null;
  magnitude: string;
  date: ZonedDateTime | null;
  latitude: string;
  longitude: string;
};
