module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assemble: {
            options: {
                layout: 'page.hbs',
                layoutdir: './src/templates/layouts',
                partials: './src/templates/partials/**/*.hbs',
                plugins: ['permalinks'],
                data: './src/data/testdata.json'
            },
            site: {
                files: [{
                    cwd: './src/views/',
                    dest: './',
                    expand: true,
                    src: '**/*.hbs'
                }]
            }
        },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "./css/main.css": "./src/less/main.less"
                }
            }
        },
        concat: {
            dist: {
                src: ['./src/js/**/*.js'],
                dest: './js/main.js'
            }
        },
        jshint: {
            beforeconcat: ['./src/js/**/*.js'],
            afterconcat: ['./js/main.js']
        },
        watch: {
            scripts: {
                files: ['**/*.hbs'],
                tasks: ['assemble','less','concat','jshint'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    // Load handlebars template compiler
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    grunt.registerTask('default', ['assemble','less','concat','jshint']);

};