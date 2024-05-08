import antfu from '@antfu/eslint-config'

export default antfu({
    yaml: false,
    typescript: true,
    stylistic: {
        indent: 4,
    },
    rules: {
        'antfu/if-newline': 'off',
        'ts/consistent-type-definitions': 'off',
        'style/comma-dangle': ['error', 'always-multiline'],
        'test/no-import-node-test': 'off',
    },
})
