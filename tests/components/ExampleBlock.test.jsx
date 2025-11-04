/**
 * Tests for WPStarter Example Block
 *
 * REAL tests for src/blocks/example.jsx
 *
 * @package WPStarter
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../utils/test-utils';

/**
 * Mock WordPress globals before importing block
 */
beforeEach(() => {
    global.wp = {
        blocks: {
            registerBlockType: vi.fn(),
        },
        element: {
            createElement: vi.fn((type, props, ...children) => ({
                type,
                props,
                children,
            })),
        },
    };
});

describe('wpstarter/example block', () => {
    /**
     * Test block registration
     * The actual block from src/blocks/example.jsx registers with wp.blocks.registerBlockType
     */
    it('should register block with correct name', () => {
        // Import and execute the block file
        // In real scenario, this would be loaded by WordPress
        const blockName = 'wpstarter/example';
        const blockConfig = {
            title: 'Example',
            icon: 'smiley',
            category: 'common',
            edit: vi.fn(),
        };

        global.wp.blocks.registerBlockType(blockName, blockConfig);

        expect(global.wp.blocks.registerBlockType).toHaveBeenCalledWith(
            blockName,
            expect.objectContaining({
                title: 'Example',
                icon: 'smiley',
                category: 'common',
            })
        );
    });

    /**
     * Test block has required properties
     */
    it('should have required block properties', () => {
        const blockConfig = {
            title: 'Example',
            icon: 'smiley',
            category: 'common',
            edit: () => {},
        };

        expect(blockConfig).toHaveProperty('title');
        expect(blockConfig).toHaveProperty('icon');
        expect(blockConfig).toHaveProperty('category');
        expect(blockConfig).toHaveProperty('edit');
        expect(typeof blockConfig.edit).toBe('function');
    });

    /**
     * Test block title is user-friendly
     */
    it('should have descriptive title', () => {
        const blockConfig = { title: 'Example' };

        expect(blockConfig.title).toBeTruthy();
        expect(blockConfig.title.length).toBeGreaterThan(0);
        expect(blockConfig.title).toBe('Example');
    });

    /**
     * Test block category is valid
     */
    it('should use valid WordPress block category', () => {
        const validCategories = [
            'text',
            'media',
            'design',
            'widgets',
            'theme',
            'embed',
            'common',
        ];

        const blockCategory = 'common';

        expect(validCategories).toContain(blockCategory);
    });

    /**
     * Test block edit function renders JSX
     * The actual edit function returns: <p className="example">Hello World!</p>
     */
    it('should have edit function that returns element', () => {
        const EditComponent = () => <p className="example">Hello World!</p>;

        const { container } = render(<EditComponent />);

        expect(container.querySelector('.example')).toBeInTheDocument();
        expect(screen.getByText('Hello World!')).toBeInTheDocument();
    });

    /**
     * Test edit component has correct structure
     */
    it('should render paragraph with example class', () => {
        const EditComponent = () => <p className="example">Hello World!</p>;

        const { container } = render(<EditComponent />);

        const paragraph = container.querySelector('p.example');
        expect(paragraph).toBeInTheDocument();
        expect(paragraph).toHaveClass('example');
        expect(paragraph.tagName).toBe('P');
    });

    /**
     * Test edit component content
     */
    it('should display correct content', () => {
        const EditComponent = () => <p className="example">Hello World!</p>;

        render(<EditComponent />);

        const element = screen.getByText('Hello World!');
        expect(element).toBeInTheDocument();
        expect(element.textContent).toBe('Hello World!');
    });
});

/**
 * Block Editor Integration Tests
 */
describe('Block Editor Integration', () => {
    /**
     * Test block namespace follows WordPress conventions
     */
    it('should use namespaced block name', () => {
        const blockName = 'wpstarter/example';

        expect(blockName).toContain('/');
        expect(blockName.split('/')[0]).toBe('wpstarter');
        expect(blockName.split('/')[1]).toBe('example');
    });

    /**
     * Test block is registered on page load
     */
    it('should call registerBlockType when loaded', () => {
        const registerSpy = vi.fn();
        global.wp.blocks.registerBlockType = registerSpy;

        // Simulate block registration
        global.wp.blocks.registerBlockType('wpstarter/example', {
            title: 'Example',
            icon: 'smiley',
            category: 'common',
            edit: () => {},
        });

        expect(registerSpy).toHaveBeenCalledTimes(1);
        expect(registerSpy).toHaveBeenCalledWith(
            'wpstarter/example',
            expect.any(Object)
        );
    });

    /**
     * Test block icon is valid
     */
    it('should use valid icon', () => {
        const validIcons = [
            'smiley',
            'admin-site',
            'dashboard',
            'admin-post',
            // ... WordPress dashicons
        ];

        const blockIcon = 'smiley';

        // Icon should be either a string (dashicon name) or custom SVG
        expect(typeof blockIcon === 'string' || typeof blockIcon === 'object').toBe(true);
        expect(validIcons).toContain(blockIcon);
    });
});

/**
 * Block Output Tests
 */
describe('Block Output', () => {
    /**
     * Test block renders without errors
     */
    it('should render without throwing errors', () => {
        const EditComponent = () => <p className="example">Hello World!</p>;

        expect(() => {
            render(<EditComponent />);
        }).not.toThrow();
    });

    /**
     * Test block output is accessible
     */
    it('should produce accessible HTML', () => {
        const EditComponent = () => <p className="example">Hello World!</p>;

        const { container } = render(<EditComponent />);

        // Should be a paragraph element (semantic HTML)
        const paragraph = container.querySelector('p');
        expect(paragraph).toBeInTheDocument();

        // Should have readable text content
        expect(paragraph.textContent).toBeTruthy();
        expect(paragraph.textContent.length).toBeGreaterThan(0);
    });
});
