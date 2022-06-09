<?php

// setup thumbnail / featured image support
add_theme_support('custom-logo');
add_theme_support('post-thumbnails');
// add_image_size('resource-thumbnail', 400, 250, true);


// load theme scripts and styles
function include_resources() {
  wp_enqueue_style('style', get_stylesheet_uri(), array(), '{{VERSION}}', 'all');
  wp_enqueue_script('main_js', get_template_directory_uri() . '/js/main.js', null, '{{VERSION}}', true);
}
add_action('wp_enqueue_scripts', 'include_resources');


// include api routes
// require_once(dirname(__FILE__) . '/api/index.php');


// disable default settings
require_once(dirname(__FILE__) . '/inc/disable/posts.php'); // disables default post type if not blog
require_once(dirname(__FILE__) . '/inc/disable/comments.php'); // removes the ability for posts
require_once(dirname(__FILE__) . '/inc/disable/defaults-admin-bar.php'); // disables admin bar defaults
require_once(dirname(__FILE__) . '/inc/disable/defaults-meta-boxes.php'); // disables default metaboxes on home page
require_once(dirname(__FILE__) . '/inc/disable/defaults-widgets.php'); // disables default widgets provided by wordpress
require_once(dirname(__FILE__) . '/inc/disable/admin-footer-text.php'); // Admin footer modification

// register navigation
require_once(dirname(__FILE__) . '/inc/register-navigation.php');

// add page slug to body class
require_once(dirname(__FILE__) . '/inc/add-page-slug.php');

// prevent non admins from seeing update notifications
require_once(dirname(__FILE__) . '/inc/hide-notices.php');

// allow editor to edit menus
// require_once(dirname(__FILE__) . '/inc/editor-edit-menus.php');

// custom settings
// require_once(dirname(__FILE__) . '/inc/custom/posts/index.php'); // custom posts
// require_once(dirname(__FILE__) . '/inc/custom/excerpt.php'); // custom excerpt settings

// widgetize theme
// require_once(dirname(__FILE__) . '/inc/widgetized-areas.php');

// add sub menu nav walker
// require_once(dirname(__FILE__) . '/inc/sub-menu-walker.php');
