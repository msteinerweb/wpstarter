<?php


// disable admin bar defaults
function admin_bar_remove_defaults() {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu('wp-logo'); // remove wordpress logo
    $wp_admin_bar->remove_menu('search'); // remove search button
    $wp_admin_bar->remove_menu('customize'); // remove "customize" button
    $wp_admin_bar->remove_menu('new-content'); // remove "add new content" button
}
add_action('wp_before_admin_bar_render', 'admin_bar_remove_defaults', 0);


// replace the text "Howdy"
function replace_wordpress_howdy($wp_admin_bar) {
    $my_account = $wp_admin_bar->get_node('my-account');
    $newtext = str_replace('Howdy,', 'Welcome,', $my_account->title);
    $wp_admin_bar->add_node(array(
        'id' => 'my-account',
        'title' => $newtext,
    ));
}
add_filter('admin_bar_menu', 'replace_wordpress_howdy', 25);
