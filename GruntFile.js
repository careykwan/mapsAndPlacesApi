
// GruntFile.js
module.exports = function (grunt) {
    // initiliased the config
    grunt.initConfig({
        jshint: {
            files: ["*.js", "js/script.js", "js/carey.js", "js/kelsey.js", "js/flo.js" ],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        csslint: {
            strict: {
                options: {
                    import: 2
                },
                src: ["css/style.css"]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'css',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            my_target: {
                files: {
                    'js/minjs/script.min.js': ['js/*.js']
                }
            }
        },
        sass: {
            dist: {
                files: {
                    "css/style.css": "scss/style.scss"
                }
            }
        },
        watch: {
            sass: {
                files: ["scss/**/*.*"],
                tasks: ["sass"]
            },
            css: {
                files: ["css/style.css"],
                tasks: ["csslint", "cssmin"]
            },
            js: {
                files: ["js/**/*.*"],
                tasks: ["jshint", "uglify"]
            }
            
        }
        

    });
    //Run command tasks
    // running grunt jshint
    grunt.loadNpmTasks('grunt-contrib-jshint');
    // running grunt csslint
    grunt.loadNpmTasks('grunt-contrib-csslint');
    // run grunt mincss
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // run grunt uglifyy js
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // run gruntSass
    grunt.loadNpmTasks('grunt-contrib-sass');
    // run gruntwatch
    grunt.loadNpmTasks('grunt-contrib-watch');
   


    // In terminal if entered 'grunt debug', 
    // it will only run the tasks inside the array 
    grunt.registerTask("default", ["jshint", "csslint"]);
    grunt.registerTask("min", ["csslint", "cssmin", "jshint", "uglify"]);
    grunt.registerTask("compile", ["sass"]);
    grunt.registerTask("w", ["watch"]);

};