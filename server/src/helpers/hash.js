const bycript = require('bcryptjs');
const hashPassword = async (password) => {
  const salt = await bycript.genSalt(10);
  const hashedPassword = await bycript.hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bycript.compare(password, hashedPassword);
  return isMatch;
};


module.exports = {hashPassword , comparePassword};