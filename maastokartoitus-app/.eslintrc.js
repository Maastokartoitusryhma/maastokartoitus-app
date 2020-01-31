module.exports = {
    'parser': 'babel-eslint',
    'env': {
        'browser': true,
        'es6': true,
        'jest': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': [
        'react'
    ],
    'rules': {
        'react/prop-types': 0,
        'indent': [
            'error',
            2,
            { 'SwitchCase': 1 }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'no-const-assign': 'error',
        'no-console': 0,
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ],
        'comma-spacing': [
            'error', { 'before': false, 'after': true }
        ],
        'keyword-spacing': [
            'error', { 'before': true, 'after': true }
        ],
        'key-spacing': [
            'error'
        ],
        'space-infix-ops': [
            'error'
        ]
    }
}
