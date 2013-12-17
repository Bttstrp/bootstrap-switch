module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      all: ['test/*_test.js']
    },

    less: {
      build: {
        files: {
          "build/css/bootstrap2/bootstrap-switch.css": "src/less/bootstrap2/bootstrap-switch.less",
          "build/css/bootstrap3/bootstrap-switch.css": "src/less/bootstrap3/bootstrap-switch.less",
        }
      }
    },

    coffee: {
      build: {
        expand: true,
        cwd: 'src/coffee',
        src: '**/*.coffee',
        dest: 'build/js',
        ext: '.js'
      }
    },

    cssmin: {
      build: {
        expand: true,
        src: 'build/css/**/*.css',
        ext: '.min.css'
      }
    },

    uglify: {
      build: {
        expand: true,
        src: 'build/js/**/*.js',
        ext: '.min.js'
      }
    },

    jshint: {
      all: ['Gruntfile.js', '*.json', 'build/js/*.js', '!**/*.min.js']
    },

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        commitFiles: ['-a'],
        push: false
      }
    }

  });

  grunt.registerTask('build', ['less', 'coffee', 'cssmin', 'uglify']);

};