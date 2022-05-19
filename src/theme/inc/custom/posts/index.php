<?php

// for custom fields, use ACF
// https://www.advancedcustomfields.com/

// https://codex.wordpress.org/Function_Reference/register_post_type
function custom_post_type() {

  // workshops
  require_once(dirname(__FILE__) . '/workshops.php');


}
add_action( 'init', 'custom_post_type' );
