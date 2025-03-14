import mongoose, { Schema, Document } from 'mongoose';

// Interface for Earthquake document (used for type-checking)
export interface IEarthquake extends Document {
  location: {
    longitude: string;
    latitude: string;
  };
  magnitude: string;  // Changed to string
  date: string;
}

// Schema definition for the Earthquake model
const earthquakeSchema = new Schema<IEarthquake>({
  location: {
    longitude: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          // Check if longitude is between -180 and 180 degrees
          return !isNaN(parseFloat(v)) && parseFloat(v) >= -180 && parseFloat(v) <= 180;
        },
        message: props => `${props.value} is not a valid longitude! Longitude must be between -180 and 180 degrees.`,
      },
    },
    latitude: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          // Check if latitude is between -90 and 90 degrees
          return !isNaN(parseFloat(v)) && parseFloat(v) >= -90 && parseFloat(v) <= 90;
        },
        message: props => `${props.value} is not a valid latitude! Latitude must be between -90 and 90 degrees.`,
      },
    },
  },
  magnitude: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        // Check if the string can be parsed to a valid number between 0 and 10
        const magnitude = parseFloat(v);
        return !isNaN(magnitude) && magnitude >= 0 && magnitude <= 10;
      },
      message: props => `${props.value} is not a valid magnitude! Magnitude must be a string representation of a number between 0 and 10.`,
    },
  },
  date: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        // Ensure the date is after Jan 1, 1970 and not today
        const currentDate = new Date();
        const today = new Date(currentDate.setHours(0, 0, 0, 0));  // Reset to midnight
        const inputDate = new Date(v);
        return inputDate >= new Date('1970-01-01') && inputDate < today;
      },
      message: props => `${props.value} is not a valid date! Date must be from January 1, 1970, to today, excluding today.`,
    },
  },
});

// Create a compound index to ensure location (longitude, latitude) and date are unique together
earthquakeSchema.index({ 'location.longitude': 1, 'location.latitude': 1, date: 1 }, { unique: true });

// Check for duplicates before saving
earthquakeSchema.pre('save', async function(next) {
  const existingEarthquake = await Earthquake.findOne({
    'location.longitude': this.location.longitude,
    'location.latitude': this.location.latitude,
    date: this.date,
  });

  if (existingEarthquake) {
    const error = new Error('Duplicate earthquake detected: An earthquake with the same location and date already exists.');
    next(error);  // Pass the error to Mongoose’s `next` function
  } else {
    next();  // No duplicate found, proceed with saving
  }
});

const Earthquake = mongoose.model<IEarthquake>('Earthquake', earthquakeSchema);

export { Earthquake };
