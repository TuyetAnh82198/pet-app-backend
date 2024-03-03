const express = require("express");
const { body } = require("express-validator");

const { getBreed, addBreed, deleteBreed } = require("../controllers/breed.js");

const route = express.Router();

route.get("/get", getBreed);
route.post(
  "/add",
  [
    body("petBreed").trim().notEmpty().withMessage("Please enter Breed!"),
    body("petType")
      .custom((value) => {
        return value !== "Select Type";
      })
      .withMessage("Please select Type!"),
  ],
  addBreed
);
route.get("/delete/:id", deleteBreed);

module.exports = route;
