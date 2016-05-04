import _ from 'lodash';

/**
 * groupByFields
 *
 * This will return the data in a similar format to d3Shape.stack
 * but without the stacking of the data.
 *
 * @param {object[]} collection - normalized data you want to operate on
 * @param {string[]} fields - fields to pluck off for the y data
 * @return {array[]} - array of arrays, one for each field
 */
export function groupByFields(collection, fields) {
	const fieldsArray = [].concat(fields);

	return _.map(fieldsArray, (field) => {
		return _.map(collection, (item) => item[field]);
	});
}

/**
 * toPairs
 *
 * Takes a collection of data and pairs up some x and y data.
 *
 * @param {object[]} collection
 * @param {string} xField
 * @param {string} yField
 * @return {array} - E.g. [[x, y], [x, y]]
 */
export function toPairs(collection, xField, yField) {
	return _.map(collection, (item) => [item[xField], item[yField]]);
}

/**
 * byFields
 *
 * Takes a collection of data and returns an array of all the fields off that
 * collection.
 *
 * @param {object[]} collection
 * @param {string[]} fields
 * @return {array}
 */
export function byFields(collection, fields) {
	const fieldArray = [].concat(fields);

	return _.reduce(fieldArray, (acc, field) => {
		return acc.concat(_.map(collection, field));
	}, []);
}

/**
 * minByFields
 *
 * Returns the minimum element from a collection by a set of fields.
 *
 * @param {object[]} collection
 * @param {string[]} fields
 * @return {any}
 */
export function minByFields(collection, fields) {
	return _.min(byFields(collection, fields));
}

/**
 * maxByFields
 *
 * Returns the maximum element from a collection by a set of fields.
 *
 * @param {object[]} collection
 * @param {string[]} fields
 * @return {any}
 */
export function maxByFields(collection, fields) {
	return _.max(byFields(collection, fields));
}

/**
 * maxByFieldsStacked
 *
 * Returns the max sum of a set of fields from a collection
 *
 * @param {object[]} collection
 * @param {string[]} fields
 * @return {any}
 */
export function maxByFieldsStacked(collection, fields) {
	const fieldArray = [].concat(fields);

	const sums = _.reduce(collection, (acc, item) => {
		const sum = _.chain(item)
			.pick(fieldArray)
			.toArray()
			.sum()
			.value();
		return acc.concat(sum);
	}, []);

	return _.max(sums);
}

/**
 * discreteTicks
 *
 * Returns `count` evenly spaced, representative values from the `array`.
 *
 * @param {array} array
 * @param {number} size - should be greater than 1
 * @return {array}
 */
export function discreteTicks(array, count) {
	if (!array || _.isNil(count) || array.length <= count) {
		return array;
	}

	const step = (array.length - 1) / Math.max(1, count - 1);

	return _.reduce(_.times(count), (acc, n) => {
		return acc.concat(array[Math.round(n  * step)]);
	}, []);
}

/**
 * transformFromCenter
 *
 * Scaling paths from their center is tricky. This function
 * helps do that be generating a translate/scale transform
 * string with the correct numbers.
 *
 * @param {number} x - the x data point where you want the path to be centered at
 * @param {number} y - the y data point where you want the path to be centered at
 * @param {number} xCenter - the x coordinate of the center of the path you're trying to transform
 * @param {number} yCenter - the x coordinate of the center of the path you're trying to transform
 * @param {number} scale - number to scale to, 2 would be 2x bigger
 * @return {string} - transform string
 */
export function transformFromCenter(x, y, xCenter, yCenter, scale) {
	return `translate(${((1 - scale) * xCenter) + (x - xCenter)}, ${((1 - scale) * yCenter) + (y - yCenter)}) scale(${scale})`;
}


