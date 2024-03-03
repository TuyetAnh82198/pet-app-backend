const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TypeSchema = new Schema({
  petType: { type: String, required: true },
});

module.exports = mongoose.model("type", TypeSchema);
