const fs = require('fs/promises')
const { performance } = require('perf_hooks')

// Configuration
const config = {
	src: {
		css: 'scss',
	},
	dst: {
		html: 'dist',
		css: 'dist/css',
		js: 'dist/js',
	},
}

const util = {
	// Bulk rm
	rm: async (paths) => {
		return await Promise.all(
			paths.map((path) => {
				return fs.rm(path, { recursive: true }).catch((e) => undefined)
			})
		)
	},

	// Bulk mkdir
	mkdir: async (paths) => {
		return await Promise.all(
			paths.map((path) => {
				return fs.mkdir(path, { recursive: true })
			})
		)
	},

	// To get updated content with "required()". By default, "require()" is cached
	requireUncached: (moduleName) => {
		delete require.cache[require.resolve(moduleName)]
		return require(moduleName)
	},

	// Chokidar watcher
	watcher: require('chokidar').watch,

	// Execute command with promises
	exec: require('util').promisify(require('child_process').exec),

	// Logging with elapsed time
	starting: (taskName) => {
		console.log(`Starting '${taskName}'...`)
		return performance.now()
	},
	finished: (taskName, start) => {
		let finish = Math.round(performance.now() - start)
		finish = finish >= 1000 ? +(finish / 1000).toFixed(2) + ' s' : Math.round(finish) + ' ms'
		finish = finish.toString()
		console.log(`Finished '${taskName}' after ${finish}`)
	},
}

// Clean destination folder
async function clean() {
	const start = util.starting('clean')
	await util.rm([config.dst.css])
	await util.mkdir([config.dst.css])
	util.finished('clean', start)
}

// Render scss to css
async function css() {
	const start = util.starting('css')
	await util.exec(`sass --source-map --embed-sources ${config.src.css}:${config.dst.css}`)

	// if build process, autoprefix
	if (process.argv.includes('--build')) {
		await util.exec(`npx postcss ${config.dst.css}/*.css !${config.dst.css}/*.min.css --use autoprefixer --map --replace`)
	}

	util.finished('css', start)
}

// Minify all css and js files
async function minify() {
	const start = util.starting('minify')

	await Promise.all([
		util.exec(`npx cssmin-recursive ${config.dst.css}`),
		util.exec(`npx jsmin-recursive ${config.dst.js}`),
	])

	util.finished('minify', start)
}

// Server
const server = {
	serve: () => {
		require('tinyliveserver').start({
			root: config.dst.html,
			watch: [
				'nothing', // watch folder that doesn't exist, so it doesn't auto reload. We will do autoreload manually
			],
			verbose: false,
		})
	},
	reload: () => require('tinyliveserver').reload(),
}

// Watch scss changes
function cssWatch() {
	util.watcher(config.src.css, { ignoreInitial: true })
		.on('all', () => console.log(`Starting 'css'`))
		.on('ready', () => console.log('Watching css, ready for changes'))

	require('child_process')
		.exec(`sass --source-map --embed-sources ${config.src.css}:${config.dst.css} --watch --no-poll`)
		.stdout.on('data', (data) => {
			if (!data.startsWith('Sass is watching')) {
				console.log(data.replace(/(?:\r\n|\r|\n)/g, ''))
				server.reload()
			}
		})
}

// Run
void (async () => {
	console.clear()

	// Build
	if (process.argv.includes('--build')) {
		await clean()
		await css()
		await minify()
	}

	// Development
	if (process.argv.includes('--dev')) {
		cssWatch()
		server.serve()
		util.watcher(config.dst.html + '/**/*.html', { ignoreInitial: true }).on('all', server.reload)
		util.watcher(config.dst.js + '/*.js', { ignoreInitial: true }).on('all', server.reload)
	}
})()
