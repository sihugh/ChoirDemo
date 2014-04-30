module.exports = (grunt) ->
	grunt.initConfig
		pkg: '<json:pacakge.json>'

		coffee:
			lib:
				files:
					'./coffee/app.js': 'coffee/*.coffee' 

		watch:
			files: [
				'Gruntfile.coffee',
				'coffee/*.coffee'
			]
			tasks: 'default'

	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.registerTask 'default', 'coffee'
