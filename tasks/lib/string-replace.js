/*
 * grunt-string-replace
 * https://github.com/erickrdch/grunt-string-replace
 *
 * Copyright (c) 2012 Erick Ruiz de Chavez
 * Licensed under the MIT license.
 */

exports.init = function (grunt) {
  'use strict';

  var path = require('path');

  var detectDestType = function (dest) {
    if (grunt.util._.endsWith(dest, '/')) {
      return 'directory';
    } else {
      return 'file';
    }
  };

  var unixifyPath = function (filepath) {
    if (process.platform === 'win32') {
      return filepath.replace(/\\/g, '/');
    } else {
      return filepath;
    }
  };

  exports.replace = function (files, replacements, callback) {
    var dest;
    var isExpandedPair;
    var content;

    grunt.util.async.forEach(files, function (filePair, callback) {
      grunt.util.async.forEach(filePair.src, function (src, callback) {

        isExpandedPair = filePair.orig.expand || false;

        if (detectDestType(filePair.dest) === 'directory') {
          dest = (isExpandedPair) ? filePair.dest : unixifyPath(path.join(filePair.dest, src));
        } else {
          dest = filePair.dest;
        }

        content = grunt.file.read(src);
        content = exports.multi_str_replace(content, replacements);
        grunt.file.write(dest, content);

        callback();

      }, function (err) {
        callback(err);
      });
    }, callback);
  };

  exports.normalize_replacements = function (replacements) {
    return replacements.map(function (replacement) {
      return [replacement.pattern, replacement.replacement];
    });
  };

  exports.multi_str_replace = function (string, replacements) {
    return replacements.reduce(function (content, replacement) {
      return content.replace(replacement[0], replacement[1]);
    }, string);
  };

  return exports;
};