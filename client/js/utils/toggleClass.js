/**
 * Toggles class
 * @param current1
 * @param class1
 * @param class2
 * @returns {*}
 */
const toggleClass = (current1, class1, class2) => {
  if (current1.indexOf(class1) > -1) {
    return class2;
  } else {
    return class1;
  }
};

export default toggleClass;
