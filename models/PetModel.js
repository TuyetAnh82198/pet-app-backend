const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PetModel = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: String, required: true },
  type: { type: Schema.Types.ObjectId, ref: "type", required: true },
  weight: { type: Number, required: true },
  length: { type: Number, required: true },
  breed: { type: Schema.Types.ObjectId, ref: "breed", required: true },
  color: { type: String, required: true },
  vac: { type: Boolean, required: true },
  dew: { type: Boolean, required: true },
  ste: { type: Boolean, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("pet", PetModel);
