module.exports = function (grunt) {
// Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

// Define the configuration for all the tasks
  grunt.initConfig({
    // Project settings
    config: {
      // Configurable paths
      app: 'public'
    },


    // Watches files for changes and runs tasks based on the changed files
    watch: {
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/{,*/}*.html',
          '<%= config.app %>/{,*/}*.js',
          '<%= config.app %>/{,*/}*.css',
          '<%= config.app %>/img/{,*/}*'
        ]
      }
    },


    // The actual grunt server settings
    connect: {
      options: {
        port: 3030,
        livereload: 35729,
        hostname: 'localhost',
        middleware: function ( connect, options, middlewares ) {
          var modRewrite = require('connect-modrewrite');

          // enable Angular's HTML5 mode
          middlewares.unshift(modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png$ /index.html [L]']));

          return middlewares;
        }
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= config.app %>'
          ]
        }
      }
    },

    nodemon: {
      dev: {
        script: 'bin/www'
      }
    },
    wiredep: {

      task: {

        // Point to the files that should be updated when
        // you run `grunt wiredep`
        src: [
          'public/index.html',   // .html support...
        ]
      }
    }


  });
  grunt.registerTask('serve', function (target) {
    grunt.task.run([
      'wiredep',
      'connect:livereload',
      'watch'
    ]);
  });
};