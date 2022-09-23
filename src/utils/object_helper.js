/**
 * obkectListToArray.
 * @param {*} object 
 * @returns array of String ids
 */
module.exports.objectListToArray = (object) => {
  return Object.values(object).map((id) => String(id));
};

/**
 * addToArray. 
 * @param {*} array : array, can be empty
 * @param {*} object : an array with one object
 * 
 * @return array containing both array and object
 */
module.exports.addToArray = (array, object) => {
  array?
  Array.prototype.push.apply(array, object)
  : array = object
}
