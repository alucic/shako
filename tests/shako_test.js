'use strict';

const test = require('tape');
const os = require('os');
const fs = require('fs');
const path = require('path');

const Shako = require('../src/shako');

test('Shako', t => {
  test('constructor', t => {
    test('has defaults', t => {
      const shako = new Shako();

      t.equal(shako.timestamp, true, 'timestamp defaults to true');
      t.equal(shako.prefix, '', 'prefix defaults to \'\'');
      t.equal(shako.suffix, '', 'suffix defaults to \'\'');
      t.equal(shako.template, '', 'template defaults to \'\'');
      t.end()
    });

    test('uses defaults if an option is invalid', t => {
      const shako = new Shako({
        timestamp: 'string',
        prefix: true,
        suffix: {},
        template: true,
      });

      t.equal(shako.timestamp, true);
      t.equal(shako.prefix, '');
      t.equal(shako.suffix, '');
      t.equal(shako.template, '');
      t.end()
    });

    test('uses options if options are valid', t => {
      const shako = new Shako({
        timestamp: true,
        prefix: 'prefix',
        suffix: 'suffix',
      });

      t.equal(shako.timestamp, true);
      t.equal(shako.prefix, 'prefix');
      t.equal(shako.suffix, 'suffix');
      t.end()
    });

    test('throws error if template does not exist', t => {
      t.throws(() => {
        new Shako({
          template: 'not-exist-template.js'
        });
      }, /not-exist-template\.js doesn't exists/);

      t.end()
    });

    test('throws error if template is not a file', t => {
      t.throws(() => {
        new Shako({ template: '.' });
      }, /is not a file/);

      t.end()
    });

    test('sets template if file exists', t => {
      const shako = new Shako({ template: __dirname + '/template.js' });

      t.equal(shako.template, path.resolve(__dirname, 'template.js'));
      t.end()
    });

    t.end();
  });

  test('generate', t => {
    test('writes an empty file with EOL in the current directory', t => {
      const shako = new Shako({
        timestamp: false,
      });

      const filename = shako.generate('test.js');
      const content = fs.readFileSync(filename, 'utf8');

      t.equal(content, os.EOL);

      fs.unlinkSync(filename);
      t.end();
    });

    test('creates a directory to write a file', t => {
      const shako = new Shako({
        timestamp: false,
      });

      const filename = shako.generate('dir/test.js');
      const content = fs.readFileSync(filename, 'utf8');

      t.equal(content, os.EOL);

      fs.unlinkSync(filename);

      fs.rmdirSync(path.dirname(filename));
      t.end();
    });

    test('uses template to write a file', t => {
      const shako = new Shako({
        timestamp: false,
        template: __dirname + '/template.js',
      });

      const filename = shako.generate('dir/test.js');
      const content = fs.readFileSync(filename, 'utf8');
      const expected = fs.readFileSync(shako.template, 'utf8');
      t.equal(content, expected);

      fs.unlinkSync(filename);

      fs.rmdirSync(path.dirname(filename));
      t.end();
    });

    test('timestamp, prefix and suffix', t => {
      const shako = new Shako({
        timestamp: true,
        prefix: 'prefix',
        suffix: 'suffix',
      });

      const filename = shako.generate('test.js');
      let basename = path.basename(filename);

      let timestampWithoutSeconds = new Date()
        .toISOString()
        .slice(-24)
        .replace(/\D/g,'')
        .slice(0, 12);

      t.equal(0, basename.indexOf(timestampWithoutSeconds));
      t.equal(basename.substr(14), '-prefix-test-suffix.js');

      fs.unlinkSync(filename);
      t.end();
    });

    t.end();
  });

  t.end()
});
