<?php

// setup thumbnail / featured image support
add_theme_support('custom-logo');
add_theme_support('post-thumbnails');
// add_image_size('resource-thumbnail', 400, 250, true);


// load theme scripts and styles
function include_resources() {

    // custom styles / scripts
    wp_enqueue_style('style', get_stylesheet_uri(), array(), '{{VERSION}}', 'all');
    wp_enqueue_script('main', get_template_directory_uri() . '/js/main.js', array('jquery'), '{{VERSION}}', true);

    // include fontawesome
    wp_enqueue_style('fontawesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css', array(), '5.15.4', 'all');

}
add_action('wp_enqueue_scripts', 'include_resources');
