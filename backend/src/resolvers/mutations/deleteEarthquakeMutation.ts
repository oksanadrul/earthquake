import { Earthquake } from '../../models/earthquake';

export const deleteEarthquakeMutation = {
  Mutation: {
    deleteEarthquake: async (_: any, { id }: { id: string }) => {
      try {
        const earthquake = await Earthquake.findByIdAndDelete(id);

        if (!earthquake) {
          throw new Error('Earthquake not found');
        }

        return `Earthquake with ID: ${id} has been deleted successfully`;
      } catch (error) {
        console.error('Error deleting earthquake:', error);

        // Handle the error for Earthquake not found
        if (error instanceof Error && error.message === 'Earthquake not found') {
          throw new Error(error.message);
        }

        throw new Error('Failed to delete earthquake');
      }
    },
  },
};
