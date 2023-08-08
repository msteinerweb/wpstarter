/**
 * Generates a version string based on the current date and time.
 *
 * @function timeToVersion
 * @returns {string} The version string in the format of 'YYYY-MM-DD_hh:mm:ss'
 * @example
 * // returns '2023-07-11_14:25:30'
 * timeToVersion();
 */
function timeToVersion() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day}_${hour}:${minute}:${second}`;
}

module.exports = timeToVersion;
