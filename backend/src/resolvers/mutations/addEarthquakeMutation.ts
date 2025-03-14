import { Earthquake } from '../../models/earthquake';
import mongoose from 'mongoose';

export const addEarthquakeMutation = {
  Mutation: {
    addEarthquake: async (
      _: any,
      {
        location,
        magnitude,
        date,
      }: {
        location: { longitude: string; latitude: string };
        magnitude: string;
        date: string;
      },
    ) => {
      try {
        const earthquake = new Earthquake({
          location: {
            longitude: location.longitude,
            latitude: location.latitude,
          },
          magnitude, // magnitude is now a string
          date,
        });

        await earthquake.validate(); // Validate before saving

        await earthquake.save();
        return earthquake;
      } catch (error) {
        console.error('Error adding earthquake:', error);

        if (error instanceof mongoose.Error.ValidationError) {
          throw new Error(`Validation failed: ${error.message}`);
        }

        // Handle duplicate earthquake error (this comes from the pre-save hook)
        if (error instanceof Error && error.message.includes('Duplicate earthquake detected')) {
          throw new Error(error.message);
        }

        throw new Error('Failed to add earthquake');
      }
    },
  },
};
