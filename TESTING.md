# Testing Guide

Comprehensive testing setup for WPStarter with JavaScript, React, and PHP tests.

## Table of Contents

1. [Overview](#overview)
2. [JavaScript Testing (Vitest)](#javascript-testing-vitest)
3. [React Component Testing](#react-component-testing)
4. [PHP Testing (PHPUnit)](#php-testing-phpunit)
5. [Test Scripts](#test-scripts)
6. [Writing Tests](#writing-tests)
7. [Best Practices](#best-practices)
8. [CI/CD Integration](#cicd-integration)
9. [Troubleshooting](#troubleshooting)

---

## Overview

### Testing Stack

**JavaScript/React:**
- ⚡ **Vitest** - Lightning fast unit test framework (Vite-native)
- 🧪 **React Testing Library** - Component testing utilities
- 🎭 **jsdom** - Browser environment simulation
- 👤 **User Event** - Realistic user interaction simulation

**PHP:**
- 🐘 **PHPUnit** - PHP unit testing framework
- 🔌 **WordPress Test Suite** - WordPress-specific testing utilities

### Test Types Supported

- ✅ **Unit Tests** - Individual functions and utilities
- ✅ **Component Tests** - React components and blocks
- ✅ **Integration Tests** - Multiple components working together
- ✅ **WordPress Tests** - Theme functions and WordPress integration

---

## JavaScript Testing (Vitest)

### Why Vitest?

- **10x faster** than Jest
- Native Vite integration (same config, same plugins)
- Modern ESM support out of the box
- Compatible with Jest API (easy migration)
- Built-in code coverage with v8
- Beautiful UI for test exploration

### Configuration

See `vitest.config.js`:

```javascript
export default defineConfig({
    test: {
        globals: true,          // Use global test functions
        environment: 'jsdom',   // Browser-like environment
        setupFiles: ['./tests/setup.js'],
        coverage: {
            provider: 'v8',     // Fast native coverage
            reporter: ['text', 'json', 'html'],
        },
    },
});
```

### Running Tests

```bash
# Run tests in watch mode (recommended for development)
npm test

# Run tests once
npm run test:run

# Run tests with UI (visual test explorer)
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Watch mode (re-run on file change)
npm run test:watch
```

### Example Unit Test

```javascript
// tests/unit/utils.test.js
import { describe, it, expect } from 'vitest';

function add(a, b) {
    return a + b;
}

describe('Math utilities', () => {
    it('should add two numbers', () => {
        expect(add(2, 3)).toBe(5);
    });

    it('should handle negative numbers', () => {
        expect(add(-1, -1)).toBe(-2);
    });
});
```

---

## React Component Testing

### Setup

React Testing Library is configured in `tests/utils/test-utils.jsx` with custom render function and utilities.

### Example Component Test

```javascript
// tests/components/MyComponent.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen, userEvent } from '../utils/test-utils';

const MyComponent = ({ onClick }) => (
    <button onClick={onClick}>Click Me</button>
);

describe('MyComponent', () => {
    it('should render button', () => {
        render(<MyComponent />);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('should call onClick when clicked', async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();

        render(<MyComponent onClick={handleClick} />);
        await user.click(screen.getByText('Click Me'));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
```

### Testing WordPress Blocks

```javascript
// tests/components/MyBlock.test.jsx
import { render, screen, createMockBlock } from '../utils/test-utils';

const MyBlock = ({ attributes, setAttributes }) => (
    <div>
        <input
            value={attributes.content}
            onChange={e => setAttributes({ content: e.target.value })}
        />
    </div>
);

describe('MyBlock', () => {
    it('should render with attributes', () => {
        render(
            <MyBlock
                attributes={{ content: 'Hello' }}
                setAttributes={vi.fn()}
            />
        );

        expect(screen.getByDisplayValue('Hello')).toBeInTheDocument();
    });
});
```

### Custom Test Utilities

Located in `tests/utils/test-utils.jsx`:

```javascript
// Custom render with providers
render(<Component />);

// Mock WordPress block
const block = createMockBlock({ name: 'my-block' });

// Mock WordPress API
mockWPAPI('/wp-json/wp/v2/posts', { data: [] });

// Wait for async operations
await waitForAsync(() => expect(...).toBe(...));
```

---

## PHP Testing (PHPUnit)

### Setup WordPress Test Suite

First time setup:

```bash
# Install WordPress test suite
bash tests/bin/install-wp-tests.sh wordpress_test root '' localhost latest

# Install PHPUnit via Composer
composer require --dev phpunit/phpunit
```

### Running PHP Tests

```bash
# Run all PHP tests
vendor/bin/phpunit

# Run specific test file
vendor/bin/phpunit tests/php/ExampleTest.php

# Run with coverage
vendor/bin/phpunit --coverage-html tests/coverage/php
```

### Example PHP Test

```php
<?php
// tests/php/MyFunctionTest.php

use PHPUnit\Framework\TestCase;

class MyFunctionTest extends TestCase
{
    public function test_basic_function()
    {
        $result = my_custom_function('input');
        $this->assertEquals('expected', $result);
    }

    public function test_wordpress_function()
    {
        // Test WordPress-specific functionality
        $this->assertTrue(function_exists('wpstarter_theme_setup'));
    }
}
```

### Testing WordPress Functions

```php
<?php
// tests/php/ThemeTest.php

class ThemeTest extends WP_UnitTestCase
{
    public function test_theme_supports()
    {
        $this->assertTrue(
            current_theme_supports('post-thumbnails')
        );
    }

    public function test_custom_post_type_registered()
    {
        $this->assertTrue(
            post_type_exists('custom_type')
        );
    }
}
```

---

## Test Scripts

### JavaScript

| Command | Description | When to Use |
|---------|-------------|-------------|
| `npm test` | Watch mode | Development |
| `npm run test:run` | Run once | CI/CD |
| `npm run test:ui` | Visual UI | Debugging |
| `npm run test:coverage` | With coverage | QA checks |
| `npm run test:watch` | Watch mode | Development |

### PHP

| Command | Description | When to Use |
|---------|-------------|-------------|
| `vendor/bin/phpunit` | Run all tests | Testing |
| `vendor/bin/phpunit --filter test_name` | Run specific | Debugging |
| `vendor/bin/phpunit --coverage-html` | With coverage | QA checks |

### Combined

```bash
# Run all tests (JS + PHP)
npm run test:run && vendor/bin/phpunit

# Part of validate workflow
npm run validate  # Includes test:run
```

---

## Writing Tests

### Test File Naming

```
src/assets/js/utils.js → tests/unit/utils.test.js
src/components/Button.jsx → tests/components/Button.test.jsx
src/theme/functions.php → tests/php/ThemeFunctionsTest.php
```

### Test Structure

```javascript
describe('Feature or Component', () => {
    // Setup
    beforeEach(() => {
        // Runs before each test
    });

    // Tests grouped by behavior
    describe('when condition X', () => {
        it('should do Y', () => {
            // Arrange
            const input = 'test';

            // Act
            const result = myFunction(input);

            // Assert
            expect(result).toBe('expected');
        });
    });

    // Cleanup
    afterEach(() => {
        // Runs after each test
    });
});
```

### Assertion Examples

```javascript
// Equality
expect(value).toBe(5);
expect(value).toEqual({ key: 'value' });

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThan(10);
expect(value).toBeCloseTo(0.3, 1);

// Strings
expect(string).toMatch(/pattern/);
expect(string).toContain('substring');

// Arrays
expect(array).toContain(item);
expect(array).toHaveLength(3);

// Objects
expect(obj).toHaveProperty('key');
expect(obj).toMatchObject({ key: 'value' });

// DOM
expect(element).toBeInTheDocument();
expect(element).toHaveClass('active');
expect(element).toHaveAttribute('disabled');
expect(element).toHaveTextContent('Hello');
```

### Mocking

```javascript
// Mock functions
const mockFn = vi.fn();
mockFn('arg');
expect(mockFn).toHaveBeenCalledWith('arg');

// Mock return values
const mockFn = vi.fn().mockReturnValue(42);

// Mock implementations
const mockFn = vi.fn((x) => x * 2);

// Mock modules
vi.mock('./module', () => ({
    default: vi.fn(),
    namedExport: vi.fn(),
}));

// Mock WordPress
global.wp = {
    blocks: { registerBlockType: vi.fn() },
};
```

---

## Best Practices

### General

1. **Test behavior, not implementation**
   - ✅ Test what users see and do
   - ❌ Test internal state or private methods

2. **One assertion per test (when possible)**
   - Makes failures clear
   - Easier to debug

3. **Use descriptive test names**
   ```javascript
   // Good
   it('should disable submit button when form is invalid', () => {})

   // Bad
   it('button test', () => {})
   ```

4. **Arrange-Act-Assert pattern**
   ```javascript
   it('should format phone number', () => {
       // Arrange
       const input = '1234567890';

       // Act
       const result = formatPhone(input);

       // Assert
       expect(result).toBe('(123) 456-7890');
   });
   ```

### React Testing

1. **Query by accessibility**
   ```javascript
   // Good - Accessible to users and screen readers
   screen.getByRole('button', { name: /submit/i });
   screen.getByLabelText('Email');

   // Okay - User-visible text
   screen.getByText('Hello World');

   // Last resort - Test IDs
   screen.getByTestId('submit-button');
   ```

2. **Use userEvent over fireEvent**
   ```javascript
   // Good - Realistic user interaction
   const user = userEvent.setup();
   await user.click(button);
   await user.type(input, 'text');

   // Bad - Low-level event
   fireEvent.click(button);
   ```

3. **Test async operations properly**
   ```javascript
   it('should load data', async () => {
       render(<Component />);

       // Wait for element to appear
       const element = await screen.findByText('Loaded');
       expect(element).toBeInTheDocument();
   });
   ```

### PHP Testing

1. **Use WordPress test fixtures**
   ```php
   $post_id = $this->factory->post->create();
   $user_id = $this->factory->user->create();
   ```

2. **Clean up after tests**
   ```php
   public function tearDown(): void
   {
       parent::tearDown();
       // Clean up
   }
   ```

3. **Test edge cases**
   ```php
   public function test_handles_empty_input()
   {
       $result = my_function('');
       $this->assertEmpty($result);
   }
   ```

---

## CI/CD Integration

### GitHub Actions Example

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run JavaScript tests
        run: npm run test:run

      - name: Run PHP tests
        run: |
          composer install
          bash tests/bin/install-wp-tests.sh wordpress_test root '' localhost latest
          vendor/bin/phpunit

      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

### Pre-commit Hook

Add to `.husky/pre-commit`:

```bash
#!/bin/sh
npm run test:run
```

---

## Troubleshooting

### Tests Not Found

**Problem:** Vitest doesn't find tests

**Solution:**
```bash
# Check pattern in vitest.config.js
include: ['**/*.{test,spec}.{js,jsx}']

# Ensure files end with .test.js or .spec.js
```

### Import Errors

**Problem:** Cannot find module '@/...'

**Solution:**
```javascript
// Check resolve.alias in vitest.config.js
resolve: {
    alias: {
        '@': resolve(__dirname, './src'),
    },
}
```

### DOM Not Available

**Problem:** `document is not defined`

**Solution:**
```javascript
// In vitest.config.js
test: {
    environment: 'jsdom',  // ← Ensure this is set
}
```

### WordPress Functions Not Found

**Problem:** `Call to undefined function add_action()`

**Solution:**
```bash
# Install WordPress test suite
bash tests/bin/install-wp-tests.sh wordpress_test root '' localhost latest
```

### Slow Tests

**Optimization tips:**
- Use `describe.concurrent` for parallel tests
- Mock expensive operations
- Use `vi.mock()` for heavy modules
- Run specific test files during development

### Coverage Not Generating

**Problem:** No coverage report

**Solution:**
```bash
# Ensure c8 is installed (comes with vitest)
npm run test:coverage

# Check coverage config in vitest.config.js
```

---

## Resources

### Documentation

- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [PHPUnit](https://phpunit.de/)
- [WordPress Testing](https://make.wordpress.org/core/handbook/testing/automated-testing/phpunit/)

### Examples

All test examples are in:
- `tests/unit/example.test.js` - Unit tests
- `tests/components/Button.test.jsx` - Component tests
- `tests/components/WordPressBlock.test.jsx` - Block tests
- `tests/php/ExampleTest.php` - PHP tests
- `tests/php/ThemeFunctionsTest.php` - WordPress tests

### Test Utilities

- `tests/setup.js` - Global test setup
- `tests/utils/test-utils.jsx` - Custom testing utilities

---

## Quick Reference

### Common Queries

```javascript
// By role (best)
screen.getByRole('button', { name: /submit/i })

// By label (forms)
screen.getByLabelText('Email')

// By text
screen.getByText('Hello World')

// By placeholder
screen.getByPlaceholderText('Enter email...')

// By test ID (last resort)
screen.getByTestId('custom-element')

// Queries with "find" for async
await screen.findByText('Loaded')

// Queries with "query" for non-existence
expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
```

### Common User Interactions

```javascript
const user = userEvent.setup();

await user.click(button);
await user.dblClick(button);
await user.type(input, 'text');
await user.clear(input);
await user.selectOptions(select, 'value');
await user.upload(fileInput, file);
```

### Test File Template

```javascript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, userEvent } from '../utils/test-utils';

describe('Feature Name', () => {
    beforeEach(() => {
        // Setup
    });

    it('should do something', () => {
        // Test
    });

    afterEach(() => {
        // Cleanup
    });
});
```

---

**Happy Testing! 🧪**

For more help, check the [Testing Best Practices](#best-practices) section or refer to individual framework documentation.
