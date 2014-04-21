module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['mocha-tests.js']
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', ['mochaTest']);

};