<?php
/**
 * WPStarter Theme Functions
 *
 * @package WPStarter
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Theme Setup
 * Registers theme support for various WordPress features
 */
function wpstarter_theme_setup()
{
    // Add default posts and comments RSS feed links to head
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails
    add_theme_support('post-thumbnails');
    set_post_thumbnail_size(1200, 675, true);

    // Add custom image sizes
    add_image_size('wpstarter-featured', 1200, 675, true);
    add_image_size('wpstarter-thumbnail', 400, 250, true);
    add_image_size('wpstarter-medium', 800, 450, true);

    // Enable support for custom logo
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    // Switch default core markup to output valid HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
        'navigation-widgets',
    ));

    // Add theme support for selective refresh for widgets
    add_theme_support('customize-selective-refresh-widgets');

    // Add support for responsive embedded content
    add_theme_support('responsive-embeds');

    // Add support for editor styles
    add_theme_support('editor-styles');
    add_editor_style('style.css');

    // Add support for wide and full alignment
    add_theme_support('align-wide');

    // Add support for block styles
    add_theme_support('wp-block-styles');

    // Add support for custom line height controls
    add_theme_support('custom-line-height');

    // Add support for custom spacing controls
    add_theme_support('custom-spacing');

    // Add support for custom units
    add_theme_support('custom-units', 'px', 'em', 'rem', 'vh', 'vw', '%');

    // Add support for experimental link color control
    add_theme_support('experimental-link-color');

    // Add support for appearance tools (border, padding, etc)
    add_theme_support('appearance-tools');

    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'wpstarter'),
        'footer'  => __('Footer Menu', 'wpstarter'),
    ));
}
add_action('after_setup_theme', 'wpstarter_theme_setup');

/**
 * Set the content width
 */
function wpstarter_content_width()
{
    $GLOBALS['content_width'] = apply_filters('wpstarter_content_width', 800);
}
add_action('after_setup_theme', 'wpstarter_content_width', 0);

/**
 * Register widget areas
 */
function wpstarter_widgets_init()
{
    register_sidebar(array(
        'name'          => __('Sidebar', 'wpstarter'),
        'id'            => 'sidebar-1',
        'description'   => __('Add widgets here to appear in your sidebar.', 'wpstarter'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));

    register_sidebar(array(
        'name'          => __('Footer', 'wpstarter'),
        'id'            => 'footer-1',
        'description'   => __('Add widgets here to appear in your footer.', 'wpstarter'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));
}
add_action('widgets_init', 'wpstarter_widgets_init');

/**
 * Enqueue scripts and styles
 */
function wpstarter_enqueue_scripts()
{
    // Get theme version
    $theme_version = wp_get_theme()->get('Version');

    // Main stylesheet
    wp_enqueue_style(
        'wpstarter-style',
        get_stylesheet_uri(),
        array(),
        $theme_version
    );

    // Main JavaScript
    wp_enqueue_script(
        'wpstarter-main',
        get_template_directory_uri() . '/js/main.js',
        array('jquery'),
        $theme_version,
        true
    );

    // Font Awesome 6 (latest version)
    wp_enqueue_style(
        'fontawesome',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
        array(),
        '6.5.1'
    );

    // Comment reply script for threaded comments
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'wpstarter_enqueue_scripts');

/**
 * Enqueue block editor assets
 */
function wpstarter_enqueue_block_editor_assets()
{
    // Editor styles
    wp_enqueue_style(
        'wpstarter-editor-styles',
        get_template_directory_uri() . '/style.css',
        array(),
        wp_get_theme()->get('Version')
    );

    // Custom blocks (if exists)
    $blocks_js = get_template_directory() . '/blocks/example.js';
    if (file_exists($blocks_js)) {
        wp_enqueue_script(
            'wpstarter-blocks',
            get_template_directory_uri() . '/blocks/example.js',
            array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components'),
            filemtime($blocks_js),
            true
        );
    }
}
add_action('enqueue_block_editor_assets', 'wpstarter_enqueue_block_editor_assets');

/**
 * Register block styles
 */
function wpstarter_register_block_styles()
{
    // Button outline style
    register_block_style('core/button', array(
        'name'  => 'outline',
        'label' => __('Outline', 'wpstarter'),
    ));

    // Quote with border
    register_block_style('core/quote', array(
        'name'  => 'fancy-quote',
        'label' => __('Fancy Quote', 'wpstarter'),
    ));

    // List with checkmarks
    register_block_style('core/list', array(
        'name'  => 'checkmark-list',
        'label' => __('Checkmark List', 'wpstarter'),
    ));
}
add_action('init', 'wpstarter_register_block_styles');

/**
 * Register block pattern categories
 */
function wpstarter_register_block_pattern_categories()
{
    register_block_pattern_category('wpstarter', array(
        'label' => __('WPStarter', 'wpstarter'),
    ));
}
add_action('init', 'wpstarter_register_block_pattern_categories');

/**
 * Add custom body classes
 */
function wpstarter_body_classes($classes)
{
    global $post;

    // Add page slug to body class
    if (isset($post)) {
        $classes[] = $post->post_type . '-' . $post->post_name;
    }

    // Add class if sidebar is active
    if (is_active_sidebar('sidebar-1')) {
        $classes[] = 'has-sidebar';
    }

    // Add class for full-width template
    if (is_page_template('templates/page-wide.php')) {
        $classes[] = 'full-width';
    }

    return $classes;
}
add_filter('body_class', 'wpstarter_body_classes');

/**
 * Add custom classes to pagination links
 */
function wpstarter_posts_link_attributes()
{
    return 'class="pagination-link"';
}
add_filter('next_posts_link_attributes', 'wpstarter_posts_link_attributes');
add_filter('previous_posts_link_attributes', 'wpstarter_posts_link_attributes');

/**
 * Disable block directory (optional - for performance)
 * Uncomment to disable remote block patterns
 */
// add_filter('should_load_remote_block_patterns', '__return_false');

/**
 * Add preload for Google Fonts (if using external fonts)
 * Uncomment and customize if needed
 */
// function wpstarter_preload_fonts() {
//     echo '<link rel="preconnect" href="https://fonts.googleapis.com">';
//     echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
// }
// add_action('wp_head', 'wpstarter_preload_fonts', 1);

/**
 * Customize excerpt length
 */
function wpstarter_excerpt_length($length)
{
    return 30;
}
add_filter('excerpt_length', 'wpstarter_excerpt_length');

/**
 * Customize excerpt more string
 */
function wpstarter_excerpt_more($more)
{
    return '&hellip;';
}
add_filter('excerpt_more', 'wpstarter_excerpt_more');

/**
 * Enable SVG uploads (be careful - only for trusted users)
 */
function wpstarter_mime_types($mimes)
{
    $mimes['svg'] = 'image/svg+xml';
    $mimes['svgz'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'wpstarter_mime_types');

/**
 * Performance: Disable emoji scripts
 */
function wpstarter_disable_emojis()
{
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_styles', 'print_emoji_styles');
    remove_filter('the_content_feed', 'wp_staticize_emoji');
    remove_filter('comment_text_rss', 'wp_staticize_emoji');
    remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
}
add_action('init', 'wpstarter_disable_emojis');

/**
 * Add theme info to REST API (useful for headless)
 */
function wpstarter_rest_theme_info()
{
    register_rest_route('wpstarter/v1', '/theme-info', array(
        'methods'  => 'GET',
        'callback' => function () {
            $theme = wp_get_theme();
            return array(
                'name'        => $theme->get('Name'),
                'version'     => $theme->get('Version'),
                'description' => $theme->get('Description'),
            );
        },
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'wpstarter_rest_theme_info');
