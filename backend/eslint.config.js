export default [
    {
        files: ['**/*.js'], // Apply to all JavaScript files
        rules: {
            'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }], // Ignore variables starting with uppercase letters or underscores
            semi: ['error', 'always'], // Enforce semicolons at the end of statements
        },
    },
];
