import fs from 'fs'
import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'

const name = pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1)
const banner = `/*!
* ${name} v${pkg.version} (${pkg.homepage})
* Copyright 2020-${new Date().getFullYear()} ${pkg.author}
* Licensed under ${pkg.license} (${pkg.repository.replace('.git', '')}/blob/master/LICENSE)
*/`

export default {
	input: pkg.source,
	output: [
		{ banner, format: 'umd', file: pkg.main, name },
		{ banner, format: 'es', file: pkg.module },
	],
	plugins: [
		typescript({ tsconfig: './tsconfig.json' }),
		{
			generateBundle() {
				setTimeout(() => fs.copyFileSync(pkg.types, pkg.module.replace('.js', '.d.ts')), 200)
			},
		},
	],
	onwarn: function (message) {
		if (/Use of eval/.test(message)) {
			return
		}
		console.error(message)
	},
}
