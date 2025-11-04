/**
 * Example React Component Tests
 * Demonstrates component testing with React Testing Library
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent } from '../utils/test-utils';

// Example Button component
const Button = ({ onClick, children, disabled = false, variant = 'primary' }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`btn btn-${variant}`}
            data-testid="button"
        >
            {children}
        </button>
    );
};

describe('Button Component', () => {
    it('should render with text', () => {
        render(<Button>Click Me</Button>);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('should call onClick when clicked', async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();

        render(<Button onClick={handleClick}>Click Me</Button>);

        const button = screen.getByTestId('button');
        await user.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();

        render(
            <Button onClick={handleClick} disabled>
                Click Me
            </Button>
        );

        const button = screen.getByTestId('button');
        expect(button).toBeDisabled();

        await user.click(button);
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('should apply correct variant class', () => {
        render(<Button variant="secondary">Click Me</Button>);
        const button = screen.getByTestId('button');
        expect(button).toHaveClass('btn-secondary');
    });

    it('should have default primary variant', () => {
        render(<Button>Click Me</Button>);
        const button = screen.getByTestId('button');
        expect(button).toHaveClass('btn-primary');
    });

    it('should render children correctly', () => {
        render(
            <Button>
                <span>Icon</span>
                <span>Text</span>
            </Button>
        );

        expect(screen.getByText('Icon')).toBeInTheDocument();
        expect(screen.getByText('Text')).toBeInTheDocument();
    });
});
