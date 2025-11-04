/**
 * Test Utilities
 * Reusable testing helpers
 */

import { render as rtlRender } from '@testing-library/react';
import { vi } from 'vitest';

/**
 * Custom render function with providers
 * Extend this as you add context providers, Redux, etc.
 */
export function render(ui, options = {}) {
    const Wrapper = ({ children }) => {
        // Add any providers here
        // Example: <ThemeProvider><Redux>{children}</Redux></ThemeProvider>
        return children;
    };

    return rtlRender(ui, { wrapper: Wrapper, ...options });
}

/**
 * Create mock WordPress block
 */
export function createMockBlock(overrides = {}) {
    return {
        name: 'wpstarter/test-block',
        title: 'Test Block',
        icon: 'smiley',
        category: 'common',
        attributes: {},
        edit: vi.fn(),
        save: vi.fn(),
        ...overrides,
    };
}

/**
 * Mock WordPress API response
 */
export function mockWPAPI(endpoint, response) {
    global.fetch = vi.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(response),
        })
    );
}

/**
 * Wait for async operations
 */
export async function waitForAsync(callback, timeout = 1000) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
        try {
            await callback();
            return true;
        } catch (e) {
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }
    throw new Error('Timeout waiting for async operation');
}

// Re-export everything from testing-library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
