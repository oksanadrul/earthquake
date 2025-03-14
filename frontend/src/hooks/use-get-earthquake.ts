import { useQuery } from '@apollo/client';
import {
  Earthquake,
  EarthquakeVariables,
} from '@/graphql/types/earthquake.query';
import GetEarthquake from '@/graphql/earthquake.query.graphql';

function useGetEarthquake() {
  const { data, loading, error } = useQuery<Earthquake, EarthquakeVariables>(
    GetEarthquake,
    {
      fetchPolicy: 'cache-first',
    }
  );

  return {
    earthquakes: data?.earthquakes ?? [],
    loading,
    error,
  };
}

export { useGetEarthquake };
