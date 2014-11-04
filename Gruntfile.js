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

		watch: {
			files: ['public/**/**/*.js', 'public/**/*.js', '!public/js/main.dist.js'],
			tasks: ['browserify']
		}
  });

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['browserify']);
};

