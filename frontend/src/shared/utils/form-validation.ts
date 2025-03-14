import { ZonedDateTime } from '@internationalized/date';

export function formValidation(keyField: string, value: string | ZonedDateTime | null) {
  switch (keyField) {
    case 'magnitude':
      return {
        condition: (value && (+value <= 0 || +value > 10)) || !value,
        errorMessage: 'Please enter a valid number of magnitude. It can be a decimal number from 0.01 to 10.',
      };
    case 'date': {
      return {
        condition: !value,
        errorMessage: 'Please enter a valid date.',
      };
    }
    case 'latitude': {
      return {
        condition: (value && (+value < -90 || +value > 90)) || !value,
        errorMessage: 'Latitude must be between -90 and 90 degrees.',
      };
    }
    case 'longitude': {
      return {
        condition: (value && (+value < -180 || +value > 180)) || !value,
        errorMessage: 'Longitude must be between -180 and 180 degrees.',
      };
    }
    default:
      return {
        condition: false,
        errorMessage: false,
      };
  }
}
