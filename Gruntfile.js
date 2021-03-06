/*
 * grunt-string-replace
 * https://github.com/erickrdch/grunt-string-replace
 *
 * Copyright (c) 2012 Erick Ruiz de Chavez
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      },
      lint: ['Gruntfile.js', 'tasks/**/*.js']
    },

    clean: {
      files: ['tmp/']
    },

    nodeunit: {
      files: ['test/**/*.js']
    },

    watch: {
      files: '<%= jshint.lint %>',
      tasks: ['jshint', 'test']
    },

    'string-replace': {
      test: {
        files: {
          'tmp/foo.txt': 'test/fixtures/foo.txt'
        },
        options: {
          replacements: [{
            pattern: '[test:string]',
            replacement: 'replaced!'
          }, {
            pattern: /\[test a:regex \d{3,}\]/,
            replacement: 'replaced!'
          }, {
            pattern: /\[test b:regex \d{3,}\]/g,
            replacement: 'replaced!'
          }, {
            pattern: /\[test c:regex \d{3,}\]/g,
            replacement: 'replaced!'
          }, {
            pattern: /\[test d:regex \d{3,}\]/ig,
            replacement: 'replaced!'
          }]
        }
      }
    }
  });

  // Load nom tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Load local tasks.
  grunt.loadTasks('tasks');

  grunt.registerTask('test', ['clean', 'string-replace', 'nodeunit']);
  grunt.registerTask('default', ['jshint', 'test']);
};
