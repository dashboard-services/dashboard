var bourbon = require('node-bourbon');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

		browserify: {
			options: {
				transform: [ require('grunt-react').browserify ]
			},
			app: {
				src: 'public/js/main.js',
				dest: 'public/js/main.dist.js'
			}
		},

        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'compressed',
                precision: 3,
                includePaths: require('node-bourbon').includePaths
            },
            dist: {
                files: {
                    'public/css/main.css': 'styles/main.scss',
                    'public/css/tile.css': 'styles/tile.scss'
                }
            }
        },

		watch: {
            files: [
                'public/**/**/*.js',
                'public/**/*.js',
                '!public/js/main.dist.js',
                'styles/*.scss'
            ],
            tasks: ['browserify', 'sass', 'notify']
        },
		}
  });

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('default', ['sass', 'browserify']);
};

