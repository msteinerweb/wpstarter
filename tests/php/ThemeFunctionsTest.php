<?php
/**
 * Theme Functions Test
 *
 * Tests for WordPress theme functions
 *
 * @package WPStarter
 */

use PHPUnit\Framework\TestCase;

/**
 * Test theme functions
 *
 * Note: These tests require WordPress test environment
 * Run: bash tests/bin/install-wp-tests.sh wordpress_test root '' localhost latest
 */
class ThemeFunctionsTest extends TestCase
{
    /**
     * Test theme setup function exists
     */
    public function test_theme_setup_function_exists()
    {
        $this->assertTrue(
            function_exists('wpstarter_theme_setup'),
            'wpstarter_theme_setup function should exist'
        );
    }

    /**
     * Test enqueue scripts function exists
     */
    public function test_enqueue_scripts_function_exists()
    {
        $this->assertTrue(
            function_exists('wpstarter_enqueue_scripts'),
            'wpstarter_enqueue_scripts function should exist'
        );
    }

    /**
     * Test block styles function exists
     */
    public function test_block_styles_function_exists()
    {
        $this->assertTrue(
            function_exists('wpstarter_register_block_styles'),
            'wpstarter_register_block_styles function should exist'
        );
    }

    /**
     * Test widgets function exists
     */
    public function test_widgets_init_function_exists()
    {
        $this->assertTrue(
            function_exists('wpstarter_widgets_init'),
            'wpstarter_widgets_init function should exist'
        );
    }

    /**
     * Test body classes function exists
     */
    public function test_body_classes_function_exists()
    {
        $this->assertTrue(
            function_exists('wpstarter_body_classes'),
            'wpstarter_body_classes function should exist'
        );
    }

    /**
     * Test excerpt length customization
     */
    public function test_excerpt_length()
    {
        if (function_exists('wpstarter_excerpt_length')) {
            $length = wpstarter_excerpt_length(55);
            $this->assertEquals(30, $length, 'Excerpt length should be 30 words');
        } else {
            $this->markTestSkipped('wpstarter_excerpt_length function not available');
        }
    }

    /**
     * Test excerpt more customization
     */
    public function test_excerpt_more()
    {
        if (function_exists('wpstarter_excerpt_more')) {
            $more = wpstarter_excerpt_more('[...]');
            $this->assertEquals('&hellip;', $more, 'Excerpt more should be ellipsis');
        } else {
            $this->markTestSkipped('wpstarter_excerpt_more function not available');
        }
    }
}
