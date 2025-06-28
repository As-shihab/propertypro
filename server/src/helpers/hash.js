const bycript = require('bcrypt');
const makeHash = async (data) => {
  const salt = await bycript.genSalt(10);
  const result = await bycript.hash(data, salt);
  return result;
};

const compareHash = async (password, hashedPassword) => {
  const isMatch = await bycript.compare(password, hashedPassword);
  return isMatch;
};

compareString = (string1 , string2)=>{
  string1 = string1.toLowerCase();
  string2 = string2.toLowerCase();
  return string1 === string2;
}

module.exports = {makeHash , compareHash , compareString};