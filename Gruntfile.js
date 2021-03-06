module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // these are the folders of the project, configured as variables
    source: 'source', 
    build: 'build', // this build folder is *IGNORED* by git
    dist: 'dist',   // this build folder is *TRACKED* by git
    test: 'test',

    copy: {
      build: {
        files: [
          {cwd: '<%= source %>/', expand: true, src: ['**/*'], dest: '<%= build %>/'},

          // includes files within path and its sub-directories
          //{expand: true, src: ['path/**'], dest: 'dest/'},

          // makes all src relative to cwd
          //{expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

          // flattens results to a single level
          //{expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
        ]
      },
      dist: {
        files: [
          {cwd: '<%= source %>/', expand: true, src: ['**/*'], dest: '<%= dist %>/'},        
        ]
      }
    },

    jshint: {
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      },
      all: ['Gruntfile.js', '<%= source %>/*.js', '!<%= source %>/lib/**/*', '<%= test %>/**/*.js']
    },

    clean: {
      build: ['<%= build %>/'],
      dist: ['<%= dist %>/']
    }    
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');  

  grunt.registerTask('default', ['']);

  grunt.registerTask('build', ['copy:build']);
  grunt.registerTask('dist', ['copy:dist']);

};