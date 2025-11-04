import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./tests/setup.js'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'tests/',
                '**/*.test.{js,jsx}',
                '**/*.spec.{js,jsx}',
                'vite.config.js',
                'vitest.config.js',
                'gulpfile.js/',
            ],
        },
        include: ['**/*.{test,spec}.{js,jsx}'],
        exclude: ['node_modules', 'build', 'dist', 'gulpfile.js'],
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@assets': resolve(__dirname, './src/assets'),
            '@js': resolve(__dirname, './src/assets/js'),
            '@scss': resolve(__dirname, './src/assets/scss'),
        },
    },
});
