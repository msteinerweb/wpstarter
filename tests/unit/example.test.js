/**
 * Example Unit Tests
 * Demonstrates basic unit testing patterns
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Example Unit Tests', () => {
    describe('Basic JavaScript', () => {
        it('should perform basic math', () => {
            expect(2 + 2).toBe(4);
        });

        it('should compare strings', () => {
            expect('Hello').toBe('Hello');
            expect('Hello').toContain('ell');
        });

        it('should work with arrays', () => {
            const arr = [1, 2, 3];
            expect(arr).toHaveLength(3);
            expect(arr).toContain(2);
        });

        it('should work with objects', () => {
            const obj = { name: 'WPStarter', version: '0.0.8' };
            expect(obj).toHaveProperty('name');
            expect(obj.name).toBe('WPStarter');
        });
    });

    describe('Async Operations', () => {
        it('should handle promises', async () => {
            const asyncFunction = () => Promise.resolve('success');
            const result = await asyncFunction();
            expect(result).toBe('success');
        });

        it('should handle async/await', async () => {
            const fetchData = async () => {
                return new Promise(resolve => {
                    setTimeout(() => resolve({ data: 'test' }), 10);
                });
            };

            const result = await fetchData();
            expect(result).toEqual({ data: 'test' });
        });
    });

    describe('Mocking', () => {
        it('should mock functions', () => {
            const mockFn = vi.fn();
            mockFn('hello');

            expect(mockFn).toHaveBeenCalled();
            expect(mockFn).toHaveBeenCalledWith('hello');
            expect(mockFn).toHaveBeenCalledTimes(1);
        });

        it('should mock return values', () => {
            const mockFn = vi.fn().mockReturnValue(42);
            const result = mockFn();

            expect(result).toBe(42);
        });

        it('should mock implementations', () => {
            const mockFn = vi.fn((x, y) => x + y);
            const result = mockFn(2, 3);

            expect(result).toBe(5);
            expect(mockFn).toHaveBeenCalledWith(2, 3);
        });
    });

    describe('WordPress Utilities', () => {
        it('should access theme config', () => {
            expect(global.testConfig.theme.name).toBe('WPStarter');
        });

        it('should mock WordPress globals', () => {
            expect(global.wp).toBeDefined();
            expect(global.wp.blocks).toBeDefined();
        });
    });
});
