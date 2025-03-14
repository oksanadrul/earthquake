import { Earthquake } from '../../models/earthquake';

export const earthquakeResolvers = {
  Query: {
    earthquakes: async () => {
      try {
        return await Earthquake.find(); // Fetch all earthquakes from MongoDB
      } catch (error) {
        console.error('Error fetching earthquakes:', error);
        throw new Error('Failed to fetch earthquakes');
      }
    },
  },
};
