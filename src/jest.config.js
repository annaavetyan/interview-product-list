export default {
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
    extensionsToTreatAsEsm: ['.jsx'],
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
};

