/**
 * Tests for config.js
 *
 * REAL tests for config.js environment variable loading
 *
 * @package WPStarter
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import path from 'path';

describe('config.js', () => {
    let originalEnv;
    let config;

    beforeEach(() => {
        // Save original environment
        originalEnv = { ...process.env };

        // Clear module cache to get fresh config
        const configPath = path.resolve(__dirname, '../../config.js');
        delete require.cache[require.resolve(configPath)];

        // Mock dotenv to not actually load .env file
        vi.mock('dotenv', () => ({
            config: vi.fn(),
        }));
    });

    afterEach(() => {
        // Restore original environment
        process.env = originalEnv;
    });

    /**
     * Test default values when no environment variables set
     */
    describe('Default Values', () => {
        it('should use default site title', () => {
            delete process.env.SITE_TITLE;
            config = require('../../config.js');

            expect(config.site.title).toBe('Website Title');
        });

        it('should use default theme name', () => {
            delete process.env.SITE_THEME_NAME;
            config = require('../../config.js');

            expect(config.site.theme_name).toBe('WPStarter');
        });

        it('should use default admin user', () => {
            delete process.env.SITE_ADMIN_USER;
            config = require('../../config.js');

            expect(config.site.admin_user).toBe('admin');
        });

        it('should use default database name', () => {
            delete process.env.DB_NAME;
            config = require('../../config.js');

            expect(config.database.dbname).toBe('test');
        });

        it('should use default database prefix', () => {
            delete process.env.DB_PREFIX;
            config = require('../../config.js');

            expect(config.database.dbprefix).toBe('wp_');
        });

        it('should enable webp support by default', () => {
            delete process.env.WPSTARTER_WEBP_SUPPORT;
            config = require('../../config.js');

            expect(config.wpstarter.webp_support).toBe(true);
        });
    });

    /**
     * Test environment variable overrides
     */
    describe('Environment Variable Overrides', () => {
        it('should override site title from environment', () => {
            process.env.SITE_TITLE = 'My Custom Site';
            config = require('../../config.js');

            expect(config.site.title).toBe('My Custom Site');
        });

        it('should override theme name from environment', () => {
            process.env.SITE_THEME_NAME = 'CustomTheme';
            config = require('../../config.js');

            expect(config.site.theme_name).toBe('CustomTheme');
        });

        it('should override admin user from environment', () => {
            process.env.SITE_ADMIN_USER = 'superadmin';
            config = require('../../config.js');

            expect(config.site.admin_user).toBe('superadmin');
        });

        it('should override database settings from environment', () => {
            process.env.DB_NAME = 'production_db';
            process.env.DB_USER = 'prod_user';
            process.env.DB_PASSWORD = 'prod_pass';
            process.env.DB_HOST = 'db.example.com';

            config = require('../../config.js');

            expect(config.database.dbname).toBe('production_db');
            expect(config.database.dbuser).toBe('prod_user');
            expect(config.database.dbpass).toBe('prod_pass');
            expect(config.database.dbhost).toBe('db.example.com');
        });

        it('should override timezone from environment', () => {
            process.env.WP_TIMEZONE = 'America/New_York';
            config = require('../../config.js');

            expect(config.options.timezone_string).toBe('America/New_York');
        });

        it('should override start of week from environment', () => {
            process.env.WP_START_OF_WEEK = '1';
            config = require('../../config.js');

            expect(config.options.start_of_week).toBe(1);
            expect(typeof config.options.start_of_week).toBe('number');
        });
    });

    /**
     * Test boolean environment variables
     */
    describe('Boolean Environment Variables', () => {
        it('should parse "true" string as boolean true for webp support', () => {
            process.env.WPSTARTER_WEBP_SUPPORT = 'true';
            config = require('../../config.js');

            expect(config.wpstarter.webp_support).toBe(true);
        });

        it('should parse "false" string as boolean false for webp support', () => {
            process.env.WPSTARTER_WEBP_SUPPORT = 'false';
            config = require('../../config.js');

            expect(config.wpstarter.webp_support).toBe(false);
        });

        it('should parse undefined as true for webp support (default)', () => {
            delete process.env.WPSTARTER_WEBP_SUPPORT;
            config = require('../../config.js');

            expect(config.wpstarter.webp_support).toBe(true);
        });
    });

    /**
     * Test plugin array parsing
     */
    describe('Plugin Configuration', () => {
        it('should parse comma-separated plugin list', () => {
            process.env.WP_PLUGINS = 'wpforms-lite,wordpress-seo,contact-form-7';
            config = require('../../config.js');

            expect(Array.isArray(config.plugins)).toBe(true);
            expect(config.plugins).toHaveLength(3);
            expect(config.plugins).toContain('wpforms-lite');
            expect(config.plugins).toContain('wordpress-seo');
            expect(config.plugins).toContain('contact-form-7');
        });

        it('should handle single plugin', () => {
            process.env.WP_PLUGINS = 'single-plugin';
            config = require('../../config.js');

            expect(config.plugins).toHaveLength(1);
            expect(config.plugins[0]).toBe('single-plugin');
        });

        it('should trim whitespace from plugin names', () => {
            process.env.WP_PLUGINS = ' plugin-one , plugin-two , plugin-three ';
            config = require('../../config.js');

            expect(config.plugins[0]).toBe('plugin-one');
            expect(config.plugins[1]).toBe('plugin-two');
            expect(config.plugins[2]).toBe('plugin-three');
        });

        it('should use empty array when no plugins specified', () => {
            process.env.WP_PLUGINS = '';
            config = require('../../config.js');

            expect(Array.isArray(config.plugins)).toBe(true);
            expect(config.plugins).toHaveLength(0);
        });

        it('should use default empty array when env var not set', () => {
            delete process.env.WP_PLUGINS;
            config = require('../../config.js');

            expect(Array.isArray(config.plugins)).toBe(true);
        });
    });

    /**
     * Test config structure
     */
    describe('Config Structure', () => {
        beforeEach(() => {
            config = require('../../config.js');
        });

        it('should have site configuration object', () => {
            expect(config).toHaveProperty('site');
            expect(typeof config.site).toBe('object');
        });

        it('should have all required site properties', () => {
            expect(config.site).toHaveProperty('title');
            expect(config.site).toHaveProperty('blogdescription');
            expect(config.site).toHaveProperty('theme_name');
            expect(config.site).toHaveProperty('admin_user');
            expect(config.site).toHaveProperty('admin_password');
            expect(config.site).toHaveProperty('admin_email');
        });

        it('should have database configuration object', () => {
            expect(config).toHaveProperty('database');
            expect(typeof config.database).toBe('object');
        });

        it('should have all required database properties', () => {
            expect(config.database).toHaveProperty('dbname');
            expect(config.database).toHaveProperty('dbuser');
            expect(config.database).toHaveProperty('dbpass');
            expect(config.database).toHaveProperty('dbhost');
            expect(config.database).toHaveProperty('dbprefix');
        });

        it('should have wpstarter configuration object', () => {
            expect(config).toHaveProperty('wpstarter');
            expect(typeof config.wpstarter).toBe('object');
        });

        it('should have wpstarter properties', () => {
            expect(config.wpstarter).toHaveProperty('webp_support');
            expect(config.wpstarter).toHaveProperty('phpbin');
        });

        it('should have options configuration object', () => {
            expect(config).toHaveProperty('options');
            expect(typeof config.options).toBe('object');
        });

        it('should have WordPress options', () => {
            expect(config.options).toHaveProperty('timezone_string');
            expect(config.options).toHaveProperty('start_of_week');
        });

        it('should have plugins array', () => {
            expect(config).toHaveProperty('plugins');
            expect(Array.isArray(config.plugins)).toBe(true);
        });

        it('should have theme comment template', () => {
            expect(config).toHaveProperty('themeComment');
            expect(typeof config.themeComment).toBe('string');
            expect(config.themeComment).toContain('Theme Name:');
        });
    });

    /**
     * Test data types
     */
    describe('Data Types', () => {
        beforeEach(() => {
            config = require('../../config.js');
        });

        it('should have string values for site properties', () => {
            expect(typeof config.site.title).toBe('string');
            expect(typeof config.site.theme_name).toBe('string');
            expect(typeof config.site.admin_user).toBe('string');
        });

        it('should have string values for database properties', () => {
            expect(typeof config.database.dbname).toBe('string');
            expect(typeof config.database.dbuser).toBe('string');
            expect(typeof config.database.dbhost).toBe('string');
        });

        it('should have boolean for webp_support', () => {
            expect(typeof config.wpstarter.webp_support).toBe('boolean');
        });

        it('should have number for start_of_week', () => {
            expect(typeof config.options.start_of_week).toBe('number');
        });

        it('should have array for plugins', () => {
            expect(Array.isArray(config.plugins)).toBe(true);
        });
    });
});
