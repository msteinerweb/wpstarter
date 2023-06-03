<?php

// theme support
function theme_setup() {
    add_theme_support('custom-logo');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    add_theme_support('title-tag');
    // add_image_size('resource-thumbnail', 400, 250, true);
}
add_action('after_setup_theme', 'theme_setup');


// load theme scripts and styles
function include_resources() {

    // custom styles / scripts
    wp_enqueue_style('style', get_stylesheet_uri(), array(), '{{VERSION}}', 'all');
    wp_enqueue_script('main', get_template_directory_uri() . '/js/main.js', array('jquery'), '{{VERSION}}', true);

    // include fontawesome
    wp_enqueue_style('fontawesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css', array(), '5.15.4', 'all');
}
add_action('wp_enqueue_scripts', 'include_resources');


// add page slug to body class
function add_slug_body_class($classes) {
    global $post;
    if (isset($post)) $classes[] = $post->post_type . '-' . $post->post_name;
    return $classes;
}
add_filter('body_class', 'add_slug_body_class');
