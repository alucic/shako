'use strict';

const path = require('path');

const defaultSeparator = '-';
const defaultExtension = '.js';

/**
 * @param {string} filename
 *
 * @returns {string}
 */
const extension = filename => {
  if (path.extname(filename)) {
    return filename;
  }

  return filename + defaultExtension;
};

/**
 * @param {string} filename
 * @param {string} prefix
 *
 * @returns {string}
 */
const prefix = (filename, prefix) => {
  const basename = path.basename(filename);
  let dirname = path.dirname(filename);

  dirname = dirname === '.' ? '' : dirname + '/';

  return dirname + prefix + defaultSeparator + basename;
};

/**
 * @param {string} filename
 * @param {string} suffix
 *
 * @returns {string}
 */
const suffix = (filename, suffix) => {
  let basename = path.basename(filename);
  let separator = defaultSeparator;
  const extension = path.extname(basename);

  if (suffix.startsWith('-') || suffix.startsWith('_')) {
    separator = '';
  }

  let dirname = path.dirname(filename);

  dirname = dirname === '.' ? '' : dirname + '/';

  return dirname + basename.replace(extension, '') + separator + suffix + extension;
};

module.exports = {
  extension,
  prefix,
  suffix
};
