module.exports= function(grunt){
  grunt.initConfig({
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'css/',
          src: ['*css', '!*.min.css'],
          dest: 'css/',
          ext: '.min.css'
        }]
      }
    },
    csslint: {
      strict: {
        options: {
          import: 2
        },
        src: ['src/css/style.css']
      },
      lax: {
        options: {
          import: false
        }
      }
    },
    watch: {
      css: {
        files: ['src/css/style.css'],
        task: ['csslint', 'cssmin']
      }
    }
  });

  // grunt.loadNpmTask();
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-csslint');

  // grunt.registerTask();
 grunt.registerTask('min', ['cssmin']);
 grunt.registerTask('w', ['watch']);
 grunt.registerTask('lint', ['csslint']);
};
