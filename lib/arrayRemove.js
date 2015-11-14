'use strict';

// Remove specific string in an array
module.exports = function(array, string) {
	var i;

	for (i = array.length - 1; i >= 0; i--) {
		if (array[i] === string) {
			array.splice(i, 1);
			break;
		}
	}

	return array;
};
