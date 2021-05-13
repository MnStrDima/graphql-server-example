const { Trip } = require("./model/schema/tripSchema");

const resolvers = {
  Query: {
    trips: () => Trip,
  },

  Mutation: {
    createTrip: async (_, { fromPlaceName, toPlaceName }) => {
      const trip = new Trip({ fromPlaceName, toPlaceName });
      await trip.save();
      return trip;
    },
  },
};

module.exports = resolvers;
