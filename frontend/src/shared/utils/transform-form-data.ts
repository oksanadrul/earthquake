import { formatZonedDateTimeToCustomString } from '@/shared/utils/zone-date-to-custom';
import { FormValues } from '@/shared/types/form-value-types';

export function transformFormData(formValues: FormValues) {
  return {
    id: formValues.id ? formValues.id : '',
    location: {
      latitude: formValues.latitude,
      longitude: formValues.longitude,
    },
    magnitude: formValues.magnitude,
    date: formValues.date
      ? formatZonedDateTimeToCustomString(formValues.date)
      : '',
  };
}
