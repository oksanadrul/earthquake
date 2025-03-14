import { useMutation } from '@apollo/client';
import AddEarthquakeMutation from '@/graphql/add-earthquake.mutation.graphql';
import { Earthquake } from '@/graphql/types/earthquake.query';
import GetEarthquakeQuery from '@/graphql/earthquake.query.graphql';
import { AddEarthquake, AddEarthquakeVariables } from '@/graphql/types/add-earthquake.mutation';

function useAddEarthquake() {
  const [mutation, { loading, error }] = useMutation<AddEarthquakeVariables, AddEarthquake>(AddEarthquakeMutation);

  function addEarthquake(input: AddEarthquakeVariables) {
    return mutation({
      variables: {
        // @ts-ignore
        location: input.location,
        magnitude: input.magnitude,
        date: input.date,
      },
      update(cache, result) {
        const data = cache.readQuery<Earthquake>({ query: GetEarthquakeQuery });
        // @ts-ignore
        const newEarthquake = (result.data as AddEarthquake).addEarthquake;

        cache.writeQuery<Earthquake>({
          query: GetEarthquakeQuery,
          data: {
            earthquakes: [newEarthquake, ...(data?.earthquakes ?? [])],
          },
        });
      },
    });
  }

  return { addEarthquake, loading, error };
}

export { useAddEarthquake };
