const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tripSchema = new Schema({
  fromPlace: {
    type: String,
  },
  toPlace: {
    type: String,
  },
});

const Trip = model("trip-collections", tripSchema);

module.exports = Trip;
