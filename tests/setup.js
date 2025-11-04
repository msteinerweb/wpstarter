/**
 * Vitest Test Setup
 * Runs before all tests
 */

import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Cleanup after each test
afterEach(() => {
    cleanup();
});

// Global test utilities
global.testConfig = {
    theme: {
        name: 'WPStarter',
        version: '0.0.8',
    },
};

// Mock WordPress globals if needed
global.wp = {
    blocks: {
        registerBlockType: vi.fn(),
    },
    element: {
        createElement: (type, props, ...children) => ({ type, props, children }),
    },
    components: {},
};

// Mock jQuery if needed
global.$ = global.jQuery = vi.fn();
