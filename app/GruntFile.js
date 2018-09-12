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
    sass: {                              // Task
     dist: {                            // Target
       options: {                       // Target options
         style: 'expanded'
       },
       files: {                         // Dictionary of files
         'src/css/style.css': 'src/css/style.scss',       // 'destination': 'source'
         'widgets.css': 'widgets.scss'
       }
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
  grunt.loadNpmTasks('grunt-contrib-sass');

  // grunt.registerTask();
 grunt.registerTask('min', ['cssmin']);
 grunt.registerTask('w', ['watch']);
 grunt.registerTask('lint', ['csslint']);
 grunt.registerTask('default', ['sass']);
};
