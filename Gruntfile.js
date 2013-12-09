var _ = require('lodash');

module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      all: ['test/*_test.js']
    },

    less: {
      options: {
        paths: ["static"],
        verbose: true
      },
      test: {
        files: {
          "test/output/bootstrap-switch-less.css": "static/less/bootstrap-switch.less"
        }
      },
      build: {
        files: {
          "static/stylesheets/bootstrap-switch.css": "static/less/bootstrap-switch.less"
        }
      }
    },

    sass: {
      options: {
        style: 'expanded'
      },
      test: {
        files: {
          "test/output/bootstrap-switch-sass.css": "static/sass/bootstrap-switch.scss"
        }
      },
      build: {
        files: {
          "static/stylesheets/bootstrap-switch.css": "static/sass/bootstrap-switch.scss"
        }
      }
    },

    copy: {
      sass: {
        expand: true,
        cwd: 'static/less',
        dest: 'static/sass/',
        src: '**/*.less',
        ext: '.scss'
      }
    },

    // Just enough Less to Sass conversion to work.
    sed: {
      sassifyPrepend: {
        path: './static/sass/',
        recursive: true,
        pattern: / \* ============================================================ \*\//,
        replacement: function(comment){
          return comment + '\n' + '@function percent_opacify($color, $amount) { @return opacify($color, $amount/100%); }';
        },
      },
      sassifyDefault: {
        path: './static/sass/',
        recursive: true,
        pattern: /\n[\s]*(@[\w-]+\: *[^;]+);/g,
        replacement: function(string, assignment){
          return assignment + ' !default;\n';
        },
      },
      sassifyVariable: {
        path: './static/sass/',
        recursive: true,
        pattern: /@([\w-]+)/g,
        replacement: function(string, variable){
          // Including author handles as valid directives is an ugly workaround.
          return _.contains(['import', 'extend', 'include', 'mixin', 'function', 'return', 'SpiritualGuru', 'BdMdesigN'], variable) ? '@'+variable : '$'+variable;
        },
      },
      sassifyInclude: {
        path: './static/sass/',
        recursive: true,
        pattern: /\.([\w-]+\([^)]*\);)/g,
        replacement: function(string, mixin){
          return '@include '+mixin;
        },
      },
      sassifyMixin: {
        path: './static/sass/',
        recursive: true,
        pattern: /\.([\w-]+\([^)]*\) *{)/g,
        replacement: function(string, mixin){
          return '@mixin '+mixin;
        },
      },
      sassifyInterpolation: {
        path: './static/sass/',
        recursive: true,
        pattern: /~"([^"]+)"/g,
        replacement: function(string, interpolation){
          return interpolation.replace(/@{/g, '#{$');
        },
      },
      sassifyFunction: {
        path: './static/sass/',
        recursive: true,
        pattern: /([\w-]+)\(/g,
        replacement: function(string, method){
          var aliases = {
            argb: 'ie-hex-str',
            fadein: 'percent_opacify',
            spin: 'adjust-hue',
            e: 'unquote'
          };
          return (aliases[method] || method) + '(';
        },
      }
    },

    jshint: {
      all: ['Gruntfile.js', '*.json', 'static/js/*.js', '!**/*.min.js']
    },

    bump: {
      options: {
        files: ['package.json', 'bower.json', 'lib/bootstrap-switch/version.rb'],
        commitFiles: ['-a'],
        push: false
      }
    }

  });

  grunt.registerTask('sassify', ['copy', 'sed']);
  grunt.registerTask('test', ['less:test', 'sass:test', 'nodeunit']);

  // The official build is from less. sass:build would build the css from sass.
  grunt.registerTask('build', ['less:build']);

};