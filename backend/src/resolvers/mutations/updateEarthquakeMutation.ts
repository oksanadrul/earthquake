import { Earthquake } from '../../models/earthquake';
import mongoose from 'mongoose';

export const updateEarthquakeMutation = {
  Mutation: {
    updateEarthquake: async (
      _: any,
      {
        id,
        location,
        magnitude,
        date,
      }: {
        id: string;
        location: { longitude: string; latitude: string };
        magnitude: string;
        date: string;
      },
    ) => {
      try {
        const earthquake = await Earthquake.findById(id);

        if (!earthquake) {
          throw new Error('Earthquake not found');
        }

        if (location) {
          earthquake.location = {
            longitude: location.longitude,
            latitude: location.latitude,
          };
        }

        if (magnitude !== undefined) {
          earthquake.magnitude = magnitude;
        }

        if (date) {
          earthquake.date = date;
        }

        await earthquake.validate();
        await earthquake.save();

        return earthquake;
      } catch (error) {
        console.error('Error updating earthquake:', error);

        if (error instanceof mongoose.Error.ValidationError) {
          throw new Error(`Validation failed: ${error.message}`);
        }

        if (error instanceof Error && error.message === 'Earthquake not found') {
          throw new Error(error.message); // Throw the specific error message
        }

        throw new Error('Failed to update earthquake');
      }
    },
  },
};
