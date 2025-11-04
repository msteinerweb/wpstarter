<?php
/**
 * Tests for WPStarter Theme Functions
 *
 * REAL tests for src/theme/functions.php
 *
 * @package WPStarter
 */

use PHPUnit\Framework\TestCase;

/**
 * Test actual theme functions
 */
class ThemeFunctionsTest extends TestCase
{
    /**
     * Test that all theme functions exist
     */
    public function test_all_theme_functions_exist()
    {
        $functions = [
            'wpstarter_theme_setup',
            'wpstarter_content_width',
            'wpstarter_widgets_init',
            'wpstarter_enqueue_scripts',
            'wpstarter_enqueue_block_editor_assets',
            'wpstarter_register_block_styles',
            'wpstarter_register_block_pattern_categories',
            'wpstarter_body_classes',
            'wpstarter_posts_link_attributes',
            'wpstarter_excerpt_length',
            'wpstarter_excerpt_more',
            'wpstarter_mime_types',
            'wpstarter_disable_emojis',
            'wpstarter_rest_theme_info',
        ];

        foreach ($functions as $function) {
            $this->assertTrue(
                function_exists($function),
                "Function {$function} should exist in functions.php"
            );
        }
    }

    /**
     * Test excerpt length customization
     */
    public function test_excerpt_length_returns_30()
    {
        if (!function_exists('wpstarter_excerpt_length')) {
            $this->markTestSkipped('wpstarter_excerpt_length not available');
        }

        $result = wpstarter_excerpt_length(55);
        $this->assertEquals(30, $result, 'Excerpt length should be 30 words');
    }

    /**
     * Test excerpt more string
     */
    public function test_excerpt_more_returns_ellipsis()
    {
        if (!function_exists('wpstarter_excerpt_more')) {
            $this->markTestSkipped('wpstarter_excerpt_more not available');
        }

        $result = wpstarter_excerpt_more('[...]');
        $this->assertEquals('&hellip;', $result, 'Excerpt more should be ellipsis');
    }

    /**
     * Test SVG MIME types are added
     */
    public function test_svg_mime_types_added()
    {
        if (!function_exists('wpstarter_mime_types')) {
            $this->markTestSkipped('wpstarter_mime_types not available');
        }

        $mimes = wpstarter_mime_types([]);
        $this->assertArrayHasKey('svg', $mimes, 'SVG mime type should be added');
        $this->assertEquals('image/svg+xml', $mimes['svg']);
        $this->assertArrayHasKey('svgz', $mimes, 'SVGZ mime type should be added');
    }

    /**
     * Test pagination link attributes
     */
    public function test_pagination_link_attributes()
    {
        if (!function_exists('wpstarter_posts_link_attributes')) {
            $this->markTestSkipped('wpstarter_posts_link_attributes not available');
        }

        $result = wpstarter_posts_link_attributes();
        $this->assertStringContainsString('class=', $result);
        $this->assertStringContainsString('pagination-link', $result);
    }

    /**
     * Test body classes are added
     */
    public function test_body_classes_adds_slug()
    {
        if (!function_exists('wpstarter_body_classes')) {
            $this->markTestSkipped('wpstarter_body_classes not available');
        }

        // Mock global $post
        global $post;
        $post = (object) [
            'post_type' => 'page',
            'post_name' => 'test-page',
        ];

        $classes = wpstarter_body_classes(['existing-class']);

        $this->assertContains('existing-class', $classes, 'Should preserve existing classes');
        $this->assertContains('page-test-page', $classes, 'Should add page slug class');
    }

    /**
     * Test body classes work without post
     */
    public function test_body_classes_handles_no_post()
    {
        if (!function_exists('wpstarter_body_classes')) {
            $this->markTestSkipped('wpstarter_body_classes not available');
        }

        global $post;
        $post = null;

        $classes = wpstarter_body_classes(['test-class']);

        $this->assertContains('test-class', $classes);
        $this->assertCount(1, $classes, 'Should not add slug without post');
    }
}

/**
 * WordPress Integration Tests
 * Requires WordPress test environment
 */
class ThemeWordPressIntegrationTest extends TestCase
{
    /**
     * Mark as skipped if WordPress not available
     */
    protected function setUp(): void
    {
        if (!function_exists('current_theme_supports')) {
            $this->markTestSkipped('WordPress test environment not available');
        }
    }

    /**
     * Test theme supports are registered
     * This would run in a WordPress test environment
     */
    public function test_theme_setup_registers_theme_supports()
    {
        // This test requires WordPress test environment
        // Run: bash tests/bin/install-wp-tests.sh wordpress_test root '' localhost latest

        $this->markTestIncomplete(
            'WordPress test environment required. ' .
            'Run: bash tests/bin/install-wp-tests.sh wordpress_test root \'\' localhost latest'
        );

        // When WordPress is available, test:
        // - current_theme_supports('post-thumbnails')
        // - current_theme_supports('title-tag')
        // - current_theme_supports('align-wide')
        // - etc.
    }

    /**
     * Test navigation menus are registered
     */
    public function test_navigation_menus_registered()
    {
        $this->markTestIncomplete('WordPress test environment required');

        // When WordPress is available, test:
        // - has_nav_menu('primary')
        // - has_nav_menu('footer')
    }

    /**
     * Test custom image sizes are registered
     */
    public function test_custom_image_sizes_registered()
    {
        $this->markTestIncomplete('WordPress test environment required');

        // When WordPress is available, test:
        // - Image sizes: wpstarter-featured, wpstarter-thumbnail, wpstarter-medium
    }

    /**
     * Test REST API endpoint works
     */
    public function test_rest_api_theme_info_endpoint()
    {
        $this->markTestIncomplete('WordPress test environment required');

        // When WordPress is available, test:
        // - GET /wp-json/wpstarter/v1/theme-info
        // - Returns theme name, version, description
    }
}
