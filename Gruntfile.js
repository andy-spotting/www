'use strict';
module.exports = function( grunt ) {

	// Configure tasks
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			general: {
				files: [
					'assets/scss/*.scss',
					'assets/js/*.js',
					'!assets/js/*.min.js',
					'!assets/js/*.min.css'
				],
				tasks: ['default'],
			},
		},
		clean: {
			dist: [
				'assets/css/style.css',
				'assets/css/style.*.css',
				'assets/js/script.min.js',
				'assets/js/script.*.min.js'
			]
		},
		sass: {
			dist: {
				files: {
					'assets/css/style.css': [
						'assets/scss/*.scss'
					]
				}
			}
		},
		postcss: {
			options: {
				map: true,
				processors: [
					require('autoprefixer')({
						browsers: ['last 3 versions']
					})
				]
			},
			dist: {
				src: 'assets/css/style.css',
				dest: 'assets/css/style.css'
			}
		},
	});

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-postcss');

	// Register tasks
	grunt.registerTask('default', [
		'clean',
		'sass',
		'postcss',
	]);
	grunt.registerTask('dev', [
		'default',
		'watch'
	]);
};
