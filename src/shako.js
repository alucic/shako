'use strict';

const os = require('os');
const fs = require('fs');
const path = require('path');

const { extension, prefix, suffix } = require('./modifiers');

class Shako {
  constructor(options = {}) {
    const { timestamp, prefix, suffix, template } = validateOptions(options);

    this.timestamp = timestamp;
    this.prefix = prefix;
    this.suffix = suffix;
    this.template = template;
  }

  /**
   * @param {string} filename
   *
   * @returns {string}
   */
  generate(filename) {
    filename = applyModifiers(this, filename);

    if (fs.existsSync(filename)) {
      throw new Error(`File ${filename} already exists`);
    }

    const content = getContent(this);

    fs.mkdirSync(path.dirname(filename), { recursive: true });
    fs.writeFileSync(filename, content);

    return filename;
  }
}

/**
 * @param {Object} options
 *
 * @returns {{template: string, prefix: string, suffix: string, timestamp: boolean}}
 */
function validateOptions(options) {
  let { timestamp, prefix, suffix, template } = options;

  if (typeof timestamp !== 'boolean') timestamp = true;
  if (typeof prefix !== 'string') prefix = '';
  if (typeof suffix !== 'string') suffix = '';
  if (typeof template !== 'string') template = '';

  if (template) {
    template = path.resolve(template);
    if (!fs.existsSync(template)) {
      throw new Error(`Template ${template} doesn\'t exists`);
    }

    if (!fs.lstatSync(template).isFile()) {
      throw new Error(`Template ${template} is not a file`);
    }
  }

  return {
    prefix,
    suffix,
    template,
    timestamp,
  };
}

/**
 * @param {Shako} shako
 * @param {string} filename
 *
 * @returns {string}
 */
function applyModifiers(shako, filename) {
  filename = path.resolve(filename);
  filename = extension(filename);

  if (shako.prefix) {
    filename = prefix(filename, shako.prefix);
  }

  if (shako.timestamp) {
    const yyyymmddhhmmss = new Date()
      .toISOString()
      .slice(-24)
      .replace(/\D/g,'')
      .slice(0, 14);

    filename = prefix(filename, yyyymmddhhmmss);
  }

  if (shako.suffix) {
    filename = suffix(filename, shako.suffix);
  }

  return filename;
}

/**
 * @param {Shako} shako
 *
 * @returns {string}
 */
function getContent(shako) {
  let content = '';

  if (shako.template) {
    content = fs.readFileSync(shako.template, { encoding: 'utf-8' });
  }

  if (!content.endsWith(os.EOL)) {
    content += os.EOL;
  }

  return content;
}

module.exports = Shako;
