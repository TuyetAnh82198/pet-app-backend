const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

const io = require("../socket.js");
const PetModel = require("../models/PetModel.js");

//Thêm thú cưng
const addPet = async (req, res) => {
  try {
    const errors = validationResult(req);
    //Nếu dữ liệu nhập vào không hợp lệ thì trả về mảng
    //gồm các thông báo lỗi, và dùng alert để thông báo
    //với người dùng phía Client App
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ err: errors.array().map((err) => err.msg) });
    } else {
      //Nếu thú cưng chưa được thêm thì mới thêm thú cưng
      const existingPet = await PetModel.findOne({ _id: req.body._id });
      if (existingPet) {
        return res.status(400).json({ err: [], message: "ID must be unique!" });
      } else {
        const newPet = new PetModel(req.body);
        await newPet.save();
        const pets = await PetModel.find();
        io.getIO().emit("pets", { action: "add", addResult: pets });
        return res.status(200).json({ err: [], message: "Added!" });
      }
    }
  } catch (err) {
    return res.redirect(`${process.env.CLIENT_APP}server-error`);
  }
};

//trả về danh sách thú cưng
const getPets = async (req, res) => {
  try {
    const pets = await PetModel.find();
    return res.status(200).json({ result: pets });
  } catch (err) {
    return res.redirect(`${process.env.CLIENT_APP}server-error`);
  }
};

//Xóa thú cưng
const deletePet = async (req, res) => {
  try {
    const pet = await PetModel.findOne({ _id: req.params.id });
    // console.log(req.params.id, pets[0]._id);
    if (pet) {
      await PetModel.deleteOne({ _id: req.params.id });
      const pets = await PetModel.find();
      io.getIO().emit("pets", { action: "delete", deleteResult: pets });
      return res.status(200).json({ message: "Deleted!" });
    } else {
      return res.redirect(process.env.CLIENT_APP);
    }
  } catch (err) {
    return res.redirect(`${process.env.CLIENT_APP}server-error`);
  }
};

//cập nhật thông tin thú cưng
const updatePet = async (req, res) => {
  try {
    const errors = validationResult(req);
    //Nếu dữ liệu nhập vào không hợp lệ thì trả về mảng
    //gồm các thông báo lỗi, và dùng alert để thông báo
    //với người dùng phía Client App
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ err: errors.array().map((err) => err.msg) });
    } else {
      await PetModel.updateOne(
        { _id: req.params.id },
        {
          name: req.body.name,
          weight: req.body.weight,
          length: req.body.length,
          age: req.body.age,
          type: req.body.type,
          color: req.body.color,
          breed: req.body.breed,
          vac: req.body.vac,
          dew: req.body.dew,
          ste: req.body.ste,
        }
      );
      const pets = await PetModel.find();
      io.getIO().emit("pets", { action: "update", updateResult: pets });
      return res.status(200).json({ err: [], message: "Updated!" });
    }
  } catch (err) {
    return res.redirect(`${process.env.CLIENT_APP}server-error`);
  }
};

//hàm xử lý việc export data
const exportData = async (req, res) => {
  try {
    const data = await PetModel.find();
    fs.writeFileSync(
      path.join(__dirname, "../data/petsdata.json"),
      JSON.stringify(data)
    );
    await res.download(path.join(__dirname, "../data/petsdata.json"));
  } catch (err) {
    return res.redirect(`${process.env.CLIENT_APP}server-error`);
  }
};

module.exports = { addPet, getPets, deletePet, updatePet, exportData };
