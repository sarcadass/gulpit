'use strict';

// Remove duplicate strings in an array
module.exports = function(array) {
	var a = array.concat();
	var i, j;

	for (i = 0; i < a.length; ++i) {
		for (j = i + 1; j < a.length; ++j) {
			if (a[i] === a[j]) {
				a.splice(j--, 1);
			}
		}
	}

	return a;
};
