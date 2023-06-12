const ObjectId = require('mongoose').Types.ObjectId;
 function validateObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

 function validateNames(value) {
  return /^[A-Za-zÁÉÍÓÚÀÈÌÒÙàèìòùáéíóúÜüÑñ ]+$/.test(`${value}`);
}

function validateArrayElements(arr, regex) {
  for (let value of arr) {
    if (!regex.test(value)) {
      return false; //false if any element does not match the regex
    }
  }
  return true; // true if all elements match the regex
}

function validateObjectValues(obj, regex) {
  for (let value in obj) {
    
    if (!regex.test(obj[value])) {
      return false; // false if any value does not match the regex
    }
  }
  return true; // true if all values match the regex

}

function validateNumber(value) {
  return /^[0-9]{1,}$/.test(value);
}

const regexToFullNames = /^[A-Za-z0-9ÁÉÍÓÚÀÈÌÒÙàèìòùáéíóúÜüÑñ ]{2,}$/;
const regexToEmail = /^[a-zA-Z0-9._-]{4,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //basic regex to emails
const regexToNumber = /^[0-9]{1,}$/;
module.exports = {
  validateObjectId,
  validateNames,
  validateArrayElements,
  validateObjectValues,
  regexToFullNames,
  regexToEmail,
  regexToNumber,
  validateNumber
};
