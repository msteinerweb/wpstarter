/**
 * WordPress Block Component Tests
 * Example of testing custom Gutenberg blocks
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, createMockBlock } from '../utils/test-utils';

// Example WordPress block component
const ExampleBlock = ({ attributes, setAttributes }) => {
    const { content = '' } = attributes;

    return (
        <div className="wpstarter-example-block">
            <input
                type="text"
                value={content}
                onChange={e => setAttributes({ content: e.target.value })}
                placeholder="Enter content..."
                data-testid="block-input"
            />
            <p data-testid="block-preview">{content || 'No content yet'}</p>
        </div>
    );
};

describe('WordPress Block Component', () => {
    let mockSetAttributes;

    beforeEach(() => {
        mockSetAttributes = vi.fn();
    });

    it('should render with default attributes', () => {
        render(<ExampleBlock attributes={{}} setAttributes={mockSetAttributes} />);

        expect(screen.getByTestId('block-input')).toBeInTheDocument();
        expect(screen.getByTestId('block-preview')).toHaveTextContent('No content yet');
    });

    it('should render with provided content', () => {
        render(
            <ExampleBlock
                attributes={{ content: 'Hello World' }}
                setAttributes={mockSetAttributes}
            />
        );

        expect(screen.getByTestId('block-input')).toHaveValue('Hello World');
        expect(screen.getByTestId('block-preview')).toHaveTextContent('Hello World');
    });

    it('should call setAttributes on input change', async () => {
        const user = (await import('@testing-library/user-event')).default.setup();

        render(<ExampleBlock attributes={{}} setAttributes={mockSetAttributes} />);

        const input = screen.getByTestId('block-input');
        await user.type(input, 'New content');

        expect(mockSetAttributes).toHaveBeenCalled();
        // Check last call
        const lastCall = mockSetAttributes.mock.calls[mockSetAttributes.mock.calls.length - 1][0];
        expect(lastCall.content).toBe('t'); // Last character typed
    });

    it('should have correct CSS class', () => {
        const { container } = render(
            <ExampleBlock attributes={{}} setAttributes={mockSetAttributes} />
        );

        const blockDiv = container.querySelector('.wpstarter-example-block');
        expect(blockDiv).toBeInTheDocument();
    });
});

describe('WordPress Block Registration', () => {
    it('should create a valid block object', () => {
        const block = createMockBlock({
            name: 'wpstarter/example',
            title: 'Example Block',
        });

        expect(block.name).toBe('wpstarter/example');
        expect(block.title).toBe('Example Block');
        expect(block).toHaveProperty('edit');
        expect(block).toHaveProperty('save');
    });

    it('should register block with WordPress', () => {
        const blockConfig = createMockBlock();
        global.wp.blocks.registerBlockType(blockConfig.name, blockConfig);

        expect(global.wp.blocks.registerBlockType).toHaveBeenCalledWith(
            blockConfig.name,
            blockConfig
        );
    });
});
