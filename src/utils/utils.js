const bcrypt = require("bcrypt");
const fs = require("fs");
const { GeneralError } = require("./errors");

exports.response = (statusCode, message, data) => {
  return {
    statusCode,
    message,
    data,
  };
};

exports.isDefVar = (variable) => (variable ? true : false);

exports.isDefObject = (object) =>
  Object.keys(object).length === 0 ? false : true;

exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10).catch((error) => {
    throw new GeneralError(error);
  });
};

exports.checkPassword = async (givenPassword, userPassword) => {
  return await bcrypt.compare(givenPassword, userPassword).catch((error) => {
    throw new GeneralError(error);
  });
};

exports.addDay = (days) => {
  let date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

exports.getFileSize = (filePath) => {
  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats["size"];
  return fileSizeInBytes;
};
