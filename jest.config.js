module.exports = {
    testMatch: ['**/*.(test|spec).js'],
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.svelte$': './node_modules/svelte-jester/dist/transformer.cjs'
    },
    moduleFileExtensions: ['js', 'svelte'],
    testEnvironment: "jsdom",
    bail: false,
    moduleNameMapper: {
        '^@([A-Z].*)$': '<rootDir>/src/$1'
    },
    setupFilesAfterEnv: [
        "<rootDir>/jest.setup.js",
    ]
};
