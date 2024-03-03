const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BreedModel = new Schema({
  petBreed: { type: String, required: true },
  petType: { type: Schema.Types.ObjectId, ref: "type", required: true },
});

module.exports = mongoose.model("breed", BreedModel);
