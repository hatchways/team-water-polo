// const Board = require("../models/Board");
// const User = require("../models/User");

const checkIfExists = async (data, Collection, res, type) => {
  const promises = data.map(async (id) => await Collection.exists({ _id: id }));

  const result = await Promise.all(promises);

  if (result.includes(false)) {
    res.status(404);
    throw new Error(`${type} doesnt exist`);
  }
};
module.exports = checkIfExists;
