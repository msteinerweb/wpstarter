<?php

// Register our sidebars and widgetized areas.
function custom_widgets_init() {

    register_sidebar(array(
        'name'          => 'Blog Sidebar',
        'id'            => 'blog_sidebar',
        'before_widget' => '<div>',
        'after_widget'  => '</div>',
        'before_title'  => '<h2>',
        'after_title'   => '</h2>',
    ));

}
add_action('widgets_init', 'custom_widgets_init');
