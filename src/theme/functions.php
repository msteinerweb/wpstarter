<?php

// setup thumbnail / featured image support
add_theme_support('custom-logo');
add_theme_support('post-thumbnails');
// add_image_size('resource-thumbnail', 400, 250, true);


require_once(dirname(__FILE__) . '/inc/debug/print.php'); // print data browser



// disable default settings
require_once(dirname(__FILE__) . '/inc/disable/comments.php'); // removes the ability for posts
require_once(dirname(__FILE__) . '/inc/disable/defaults-admin-bar.php'); // disables admin bar defaults
require_once(dirname(__FILE__) . '/inc/disable/defaults-meta-boxes.php'); // disables default metaboxes on home page
require_once(dirname(__FILE__) . '/inc/disable/defaults-widgets.php'); // disables default widgets provided by wordpress


// custom settings
// require_once(dirname(__FILE__) . '/inc/custom/posts/index.php'); // custom posts
// require_once(dirname(__FILE__) . '/inc/custom/excerpt.php'); // custom excerpt settings


// bootstrap 4 support
// require_once(dirname(__FILE__) . '/inc/bootstrap/breadcrumbs.php');
// require_once(dirname(__FILE__) . '/inc/bootstrap/nav.php');
// require_once(dirname(__FILE__) . '/inc/bootstrap/pagination.php');


// widgetize theme
// require_once(dirname(__FILE__) . '/inc/widgetized-areas.php');


// add sub menu nav walker
// require_once(dirname(__FILE__) . '/inc/sub-menu-walker.php');


// register navigation
function register_navigation() {
  register_nav_menus(array(
    'main-menu'  => __('Main Menu', 'text_domain'),
    'footer-menu'  => __('Footer Menu', 'text_domain'),
  ));
}
add_action('after_setup_theme', 'register_navigation', 0);





// load theme scripts and styles
function include_resources() {
  wp_enqueue_style('style', get_stylesheet_uri(), array(), '20200420.1', 'all');
  wp_enqueue_script('header_js', get_template_directory_uri() . '/js/header-bundle.js', null, '20200420.1', false);
  wp_enqueue_script('footer_js', get_template_directory_uri() . '/js/footer-bundle.js', null, '20200420.1', true);
}
add_action('wp_enqueue_scripts', 'include_resources');


// Admin footer modification
function update_footer_admin() {
  echo '';
}
add_filter('admin_footer_text', 'update_footer_admin');


// add page slug to body class
function add_slug_body_class($classes) {
  global $post;
  if (isset($post)) {
    $classes[] = $post->post_type . '-' . $post->post_name;
  }
  return $classes;
}
add_filter('body_class', 'add_slug_body_class');


// prevent non admins from seeing update notifications
add_action('admin_head', function() {
  if(!current_user_can('manage_options')){
      remove_action( 'admin_notices', 'update_nag',      3  );
      remove_action( 'admin_notices', 'maintenance_nag', 10 );
  }
});


// allow editor to edit menus
// $role_object = get_role('editor');
// $role_object->add_cap('edit_theme_options');


