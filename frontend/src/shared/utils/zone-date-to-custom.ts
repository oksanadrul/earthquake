import { ZonedDateTime } from '@internationalized/date';

export const formatZonedDateTimeToCustomString = (
  zonedDateTime: ZonedDateTime
): string => {
  const year = zonedDateTime.year;
  const month = String(zonedDateTime.month).padStart(2, '0');
  const day = String(zonedDateTime.day).padStart(2, '0');

  const hour = String(zonedDateTime.hour).padStart(2, '0');
  const minute = String(zonedDateTime.minute).padStart(2, '0');
  const second = String(zonedDateTime.second).padStart(2, '0');

  const millisecond = String(zonedDateTime.millisecond)
    .padStart(3, '0')
    .slice(0, 2); // Get 2 digits for milliseconds

  // Return formatted string "YYYY/MM/DD HH:mm:ss.SS"
  return `${year}/${month}/${day} ${hour}:${minute}:${second}.${millisecond}`;
};