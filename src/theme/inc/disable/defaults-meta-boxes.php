<?php

// remove metaboxes
function remove_my_post_metaboxes() {

    // dashboard
    remove_action('welcome_panel', 'wp_welcome_panel'); // Remove welcome dialog
    remove_meta_box('dashboard_incoming_links', 'dashboard', 'normal'); // Removes the 'incoming links' widget
    remove_meta_box('dashboard_plugins', 'dashboard', 'normal'); // Removes the 'plugins' widget
    remove_meta_box('dashboard_primary', 'dashboard', 'normal'); // Removes the 'WordPress News' widget
    remove_meta_box('dashboard_secondary', 'dashboard', 'normal'); // Removes the secondary widget
    remove_meta_box('dashboard_quick_press', 'dashboard', 'side'); // Removes the 'Quick Draft' widget
    remove_meta_box('dashboard_recent_drafts', 'dashboard', 'side'); // Removes the 'Recent Drafts' widget
    remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal'); // Removes the 'Activity' widget
    remove_meta_box('dashboard_right_now', 'dashboard', 'normal'); // Removes the 'At a Glance' widget
    remove_meta_box('dashboard_activity', 'dashboard', 'normal'); // Removes the 'Activity' widget (since 3.8)
    remove_meta_box('dashboard_site_health', 'dashboard', 'normal'); // Site Health
    remove_meta_box('wpforms_reports_widget_lite', 'dashboard', 'normal'); // WPForms

    // // post
    // remove_meta_box('apsc-floating-counter-box', 'post', 'normal');
    // remove_meta_box('ap-share-box', 'post', 'normal');

    // // page
    // remove_meta_box('apsc-floating-counter-box', 'page', 'normal');
    // remove_meta_box('ap-share-box', 'page', 'normal');

}
add_action('admin_menu', 'remove_my_post_metaboxes');
