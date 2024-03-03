const { validationResult } = require("express-validator");

const io = require("../socket.js");
const BreedModel = require("../models/BreedModel.js");
const socket = require("../socket.js");

//lấy từ trong cơ sở dữ liệu và trả về dữ liệu về giống (breed) thú cưng
const getBreed = async (req, res) => {
  try {
    const breed = await BreedModel.find();
    // console.log(breed);
    return res.status(200).json({ result: breed });
  } catch (err) {
    return res.redirect(`${process.env.CLIENT_APP}server-error`);
  }
};

//thêm giống (breed) vào cơ sở dữ liệu
const addBreed = async (req, res) => {
  try {
    // console.log(req.body);
    const errors = validationResult(req);
    //Nếu dữ liệu nhập vào không hợp lệ thì trả về mảng
    //gồm các thông báo lỗi, và dùng alert để thông báo
    //với người dùng phía Client App
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ err: errors.array().map((err) => err.msg) });
    } else {
      //Nếu breed đó chưa được thêm thì mới thêm
      const existingBreed = await BreedModel.findOne({
        petBreed: req.body.petBreed,
        petType: req.body.petType,
      });
      if (existingBreed) {
        return res
          .status(400)
          .json({ err: [], message: "Breed must be unique!" });
      } else {
        const newBreed = new BreedModel(req.body);
        await newBreed.save();
        const breedList = await BreedModel.find();
        socket.getIO().emit("breeds", { action: "add", addResult: breedList });
        return res.status(200).json({ err: [], message: "Added!" });
      }
    }
  } catch (err) {
    return res.redirect(`${process.env.CLIENT_APP}server-error`);
  }
};

//Xóa thú cưng
const deleteBreed = async (req, res) => {
  try {
    const breed = await BreedModel.findOne({ _id: req.params.id });
    if (breed) {
      await BreedModel.deleteOne({ _id: req.params.id });
      const breedList = await BreedModel.find();
      socket
        .getIO()
        .emit("breeds", { action: "delete", deleteResult: breedList });
      return res.status(200).json({ message: "Deleted!" });
    } else {
      return res.redirect(process.env.CLIENT_APP);
    }
  } catch (err) {
    return res.redirect(`${process.env.CLIENT_APP}server-error`);
  }
};

module.exports = { getBreed, addBreed, deleteBreed };
