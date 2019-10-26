'use strict';

const test = require('tape');

const { extension, prefix, suffix } = require('../src/modifiers');

test('modifiers', t => {
  test('extension is preserved if a filename has it', t => {
    const filename = extension('test.txt');

    t.equal(filename, 'test.txt');
    t.end();
  });

  test('extension .js is added if a filename does not have it', t => {
    const filename = extension('/path/to/test');

    t.equal(filename, '/path/to/test.js');
    t.end();
  });

  test('prefix is prepended to a filename', t => {
    const prefixed = prefix('test.js', 'prefix');

    t.equal(prefixed, 'prefix-test.js');
    t.end();
  });

  test('prefix is prepended to a basename of a relative path', t => {
    const prefixed = prefix('path/to/test.js', 'prefix');

    t.equal(prefixed, 'path/to/prefix-test.js');
    t.end();
  });

  test('prefix is prepended to a basename of an absolute path', t => {
    const prefixed = prefix('/path/to/test.js', 'prefix');

    t.equal(prefixed, '/path/to/prefix-test.js');
    t.end();
  });

  test('suffix is appended to a filename', t => {
    const suffixed = suffix('test.js', 'suffix');

    t.equal(suffixed, 'test-suffix.js');
    t.end();
  });

  test('suffix starting with - are correctly appended to a filename', t => {
    const suffixed = suffix('test.js', '-suffix');

    t.equal(suffixed, 'test-suffix.js');
    t.end();
  });

  test('suffix starting with _ are correctly appended to a filename', t => {
    const suffixed = suffix('test.js', '_suffix');

    t.equal(suffixed, 'test_suffix.js');
    t.end();
  });

  test('suffix is prepended to a basename of a relative path', t => {
    const suffixed = suffix('path/to/test.js', 'suffix');

    t.equal(suffixed, 'path/to/test-suffix.js');
    t.end();
  });

  test('suffix is prepended to a basename of an absolute path', t => {
    const suffixed = suffix('/path/to/test.js', 'suffix');

    t.equal(suffixed, '/path/to/test-suffix.js');
    t.end();
  });

  t.end();
});
