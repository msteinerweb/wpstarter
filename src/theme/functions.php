<?php

// setup thumbnail / featured image support
add_theme_support('custom-logo');
add_theme_support('post-thumbnails');
// add_image_size('resource-thumbnail', 400, 250, true);


// load theme scripts and styles
function include_resources() {
    wp_enqueue_style('style', get_stylesheet_uri(), [], '{{VERSION}}', 'all');
    wp_enqueue_script('main', get_template_directory_uri() . '/js/main.js', ['jquery'], '{{VERSION}}', true);
}
add_action('wp_enqueue_scripts', 'include_resources');


// include api routes
// require_once(dirname(__FILE__) . '/api/index.php');
