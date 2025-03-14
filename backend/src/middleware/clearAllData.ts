import mongoose from 'mongoose';

export const clearAllData = async () => {
  try {
    const collections = await mongoose.connection.db?.collections();
    collections?.forEach(async (collection) => {
      await collection.drop(); // Drops the entire collection
    });
    console.log('All data cleared!');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};
