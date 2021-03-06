/*
 * grunt-string-replace
 * https://github.com/erickrdch/grunt-string-replace
 *
 * Copyright (c) 2012 Erick Ruiz de Chavez
 * Licensed under the MIT license.
 */

var grunt = require('grunt'),
  string_replace = require('../tasks/lib/string-replace').init(grunt);

var Replacement = function(pattern, replacement) {
    return {
      pattern: pattern || '',
      replacement: replacement || ''
    };
  };

exports['string-replace'] = {
  'normalize_replacements': function(test) {
    test.expect(2);

    var _ = grunt.util._,
      replacements = [];

    _(10).times(function() {
      replacements.push(new Replacement());
    });

    var normalized = string_replace.normalize_replacements(replacements);
    test.equal(_.isArray(normalized), true, 'normalized should be an array');

    var total = normalized.reduce(function(subtotal, item) {
      return subtotal + item.length;
    }, 0);
    test.equal(total, 20, 'normalized should have n * 2 items');

    test.done();
  },

  'multi_str_replace': function(test) {
    test.expect(1);
    test.equal(string_replace.multi_str_replace('ASDF QWER', [
      ['ASDF', 'Hello'],
      [/qwer/i, 'World']
    ]), 'Hello World', 'should replace a set of replacements');
    test.done();
  },

  'replace': function(test) {
    test.expect(1);

    var expected = grunt.file.read('test/fixtures/bar.txt');
    var actual = grunt.file.read('tmp/foo.txt');

    test.equal(actual, expected, 'should execute replacements and save a new file');
    test.done();
  }
};
