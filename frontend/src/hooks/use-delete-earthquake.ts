import { useMutation } from '@apollo/client';
import { DeleteEarthquake, DeleteEarthquakeVariables } from '@/graphql/types/delete-earthquake.mutation';
import DeleteEarthquakeMutation from '@/graphql/delete-earthquake.mutation.graphql';

function useDeleteEarthquake() {
  const [mutation, { loading, error }] = useMutation<DeleteEarthquakeVariables, DeleteEarthquake>(
    DeleteEarthquakeMutation,
  );

  function deleteEarthquake(id: DeleteEarthquakeVariables) {
    return mutation({
      variables: {
        // @ts-ignore
        id,
      },
      update(cache, result) {
        cache.evict({
          id: cache.identify({
            __typename: 'Earthquake',
            id,
          }),
          broadcast: false,
        });
      },
    });
  }

  return { deleteEarthquake, loading, error };
}

export { useDeleteEarthquake };
