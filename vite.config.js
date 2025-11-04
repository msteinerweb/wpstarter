import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import liveReload from 'vite-plugin-live-reload';
import { resolve } from 'path';
import fs from 'fs';

// Load config
const config = require('./config.js');

// WordPress theme path
const themeDir = `./build/wordpress/wp-content/themes/${config.site.theme_name}`;

export default defineConfig(({ mode }) => {
    const isDev = mode === 'development';

    return {
        plugins: [
            react({
                babel: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                },
            }),
            liveReload([
                `${themeDir}/**/*.php`,
                `${themeDir}/**/*.html`,
                './src/theme/**/*.php',
            ]),
        ],
        base: isDev ? '/' : './',
        build: {
            outDir: themeDir,
            emptyOutDir: false, // Don't empty the directory (WordPress files are there)
            manifest: true,
            rollupOptions: {
                input: {
                    main: resolve(__dirname, 'src/assets/js/main.js'),
                    style: resolve(__dirname, 'src/assets/scss/style.scss'),
                },
                output: {
                    entryFileNames: 'js/[name].js',
                    chunkFileNames: 'js/[name]-[hash].js',
                    assetFileNames: assetInfo => {
                        const info = assetInfo.name.split('.');
                        const ext = info[info.length - 1];
                        if (/\.(css)$/.test(assetInfo.name)) {
                            return '[name][extname]';
                        }
                        if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(assetInfo.name)) {
                            return 'img/[name]-[hash][extname]';
                        }
                        if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
                            return 'fonts/[name]-[hash][extname]';
                        }
                        return 'assets/[name]-[hash][extname]';
                    },
                },
            },
            sourcemap: isDev,
            minify: !isDev,
            cssMinify: !isDev,
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                    additionalData: ``,
                    includePaths: ['node_modules'],
                },
            },
            postcss: './postcss.config.js',
        },
        server: {
            host: 'localhost',
            port: 3000,
            strictPort: false,
            cors: true,
            hmr: {
                host: 'localhost',
                protocol: 'ws',
            },
            watch: {
                usePolling: true,
                interval: 100,
            },
            // Proxy to local WordPress install if needed
            proxy: {
                // Uncomment if you want to proxy API requests
                // '/wp-json': {
                //   target: 'http://localhost:8080',
                //   changeOrigin: true
                // }
            },
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, './src'),
                '@assets': resolve(__dirname, './src/assets'),
                '@js': resolve(__dirname, './src/assets/js'),
                '@scss': resolve(__dirname, './src/assets/scss'),
            },
        },
    };
});
