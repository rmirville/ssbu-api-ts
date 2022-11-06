module.exports = {
	root: true,
	env: {
		node: true,
		es2022: true,
	},
	overrides: [
		{
			files: ['**/*.ts'],
			extends: [
				'eslint:recommended',
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
				'prettier',
			],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				tsconfigRootDir: __dirname,
				project: ['./tsconfig.json'],
			},
			plugins: ['@typescript-eslint'],
		},
	],
};
