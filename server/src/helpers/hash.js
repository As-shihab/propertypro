const bycript = require('bcrypt');
const hash = async (password) => {
  const salt = await bycript.genSalt(10);
  const hashedPassword = await bycript.hash(password, salt);
  return hashedPassword;
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

module.exports = {hash , compareHash , compareString};