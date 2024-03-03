const TypeModel = require("../models/TypeModel.js");

//lấy từ trong cơ sở dữ liệu và trả về dữ liệu về loại (type) thú cưng
const getType = async (req, res) => {
  try {
    const type = await TypeModel.find();
    // console.log(type);
    return res.status(200).json({ result: type });
  } catch (err) {
    return res.redirect(`${process.env.CLIENT_APP}server-error`);
  }
};

module.exports = { getType };
