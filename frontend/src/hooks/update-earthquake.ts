import { useMutation } from '@apollo/client';
import {
  UpdateEarthquake,
  UpdateEarthquake_updateEarthquake_Earthquake,
  UpdateEarthquakeVariables,
} from '@/graphql/types/update-earthquake.mutation';
import UpdateEarthquakeMutation from '@/graphql/update-earthquake.mutation.graphql';
import { Earthquake } from '@/graphql/types/earthquake.query';
import GetEarthquakeQuery from '@/graphql/earthquake.query.graphql';

function useUpdateEarthquake() {
  const [mutation, { loading, error }] = useMutation<UpdateEarthquakeVariables, UpdateEarthquake>(
    UpdateEarthquakeMutation,
  );

  function updateEarthquake(input: UpdateEarthquakeVariables) {
    return mutation({
      variables: {
        // @ts-ignore
        id: input.id,
        location: input.location,
        magnitude: input.magnitude,
        date: input.date,
      },
      update(cache, result) {
        const data = cache.readQuery<Earthquake>({ query: GetEarthquakeQuery });
        const updatedEarthquake = result.data as UpdateEarthquake_updateEarthquake_Earthquake;

        const newEarthquakes =
          data?.earthquakes?.map((earthquake) => {
            if (earthquake?.id === updatedEarthquake.id) {
              return updatedEarthquake;
            }
            return earthquake;
          }) ?? [];

        cache.writeQuery<Earthquake>({
          query: GetEarthquakeQuery,
          data: {
            earthquakes: [...newEarthquakes],
          },
        });
      },
    });
  }

  return { updateEarthquake, loading, error };
}

export { useUpdateEarthquake };
