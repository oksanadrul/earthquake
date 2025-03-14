import { parseAbsoluteToLocal } from '@internationalized/date';
import { parseCustomDate } from '@/shared/utils/parse-custom-date';
import { Earthquake_earthquakes_Earthquake as EarthquakeType } from '@/graphql/types/earthquake.query';

export const formDefaultValues = {
  id: null,
  magnitude: '',
  date: null,
  latitude: '',
  longitude: '',
};

export function transformToDefaultFormValue(earthquake?: EarthquakeType | null) {
  return earthquake
    ? {
        id: earthquake?.id ?? null,
        magnitude: earthquake?.magnitude ?? '',
        date: earthquake.date
          ? parseAbsoluteToLocal(parseCustomDate(earthquake.date))
          : null,
        latitude: Number(earthquake?.location.latitude).toFixed(2) ?? '',
        longitude: Number(earthquake?.location.longitude).toFixed(2) ?? '',
      }
    : formDefaultValues;
}
