const express = require("express");
const { body } = require("express-validator");

const {
  addPet,
  getPets,
  deletePet,
  updatePet,
  exportData,
} = require("../controllers/pets.js");

const route = express.Router();

route.post(
  "/add",
  [
    body("_id")
      .customSanitizer((value) => {
        return value.replace(/\s/g, "");
      })
      .notEmpty()
      .withMessage("Id cannot be empty")
      .isAlphanumeric()
      .withMessage("ID must be alphanumeric!"),
    body("name").trim().notEmpty().withMessage("Name cannot be empty"),
    body("age")
      .trim()
      .notEmpty()
      .withMessage("Age cannot be empty")
      .custom((value) => {
        return value >= 1 && value <= 15;
      })
      .withMessage("Age must be between 1 and 15!"),
    body("weight")
      .trim()
      .notEmpty()
      .withMessage("Weight cannot be empty")
      .custom((value) => {
        return value >= 1 && value <= 15;
      })
      .withMessage("Weight must be between 1 and 15!"),
    body("length")
      .trim()
      .notEmpty()
      .withMessage("Length cannot be empty")
      .custom((value) => {
        return value >= 1 && value <= 100;
      })
      .withMessage("Length must be between 1 and 100!"),
    body("type")
      .custom((value) => {
        return value !== "Select Type";
      })
      .withMessage("Please select Type!"),
    body("breed")
      .custom((value) => {
        return value !== "Select Breed";
      })
      .withMessage("Please select Breed!"),
  ],
  addPet
);
route.get("/get", getPets);
route.get("/delete/:id", deletePet);
route.post(
  "/update/:id",
  [
    body("name").trim().notEmpty().withMessage("Name cannot be empty"),
    body("age")
      .trim()
      .notEmpty()
      .withMessage("Age cannot be empty")
      .custom((value) => {
        return value >= 1 && value <= 15;
      })
      .withMessage("Age must be between 1 and 15!"),
    body("weight")
      .trim()
      .notEmpty()
      .withMessage("Weight cannot be empty")
      .custom((value) => {
        return value >= 1 && value <= 15;
      })
      .withMessage("Weight must be between 1 and 15!"),
    body("length")
      .trim()
      .notEmpty()
      .withMessage("Length cannot be empty")
      .custom((value) => {
        return value >= 1 && value <= 100;
      })
      .withMessage("Length must be between 1 and 100!"),
    body("type")
      .custom((value) => {
        return value !== "Select Type";
      })
      .withMessage("Please select Type!"),
    body("breed")
      .custom((value) => {
        return value !== "Select Breed";
      })
      .withMessage("Please select Breed!"),
  ],
  updatePet
);
route.get("/pets", exportData);

module.exports = route;
