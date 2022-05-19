<?php

register_post_type(
    'workshops',

    array(

        'label' => ' Workshop',
        'description'   => 'Holds workshop specific data',

        'supports' => array(
            'title',
            'editor',
            'excerpt',
            'thumbnail'
        ),

        'labels' => array(
            'name'               => _x('Workshops', 'post type general name'),
            'singular_name'      => _x('Workshop', 'post type singular name'),
            'add_new'            => _x('Add New', 'workshop'),
            'add_new_item'       => __('Add New Workshop'),
            'edit_item'          => __('Edit Workshop'),
            'new_item'           => __('New Workshop'),
            'all_items'          => __('All Workshops'),
            'view_item'          => __('View Workshop'),
            'search_items'       => __('Search Workshops'),
            'not_found'          => __('No workshops found'),
            'not_found_in_trash' => __('No workshops found in the Trash'),
            'parent_item_colon'  => ':',
            'menu_name'          => 'Workshops'
        ),


        'public' => true,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',

        'menu_icon' => 'dashicons-welcome-learn-more', // https://developer.wordpress.org/resource/dashicons/
        'menu_position' => 6,
        'has_archive' => true,
        'rewrite' => array('slug' => 'workshops'),
        'show_in_rest' => true, // enable gutenberg


    )
);
