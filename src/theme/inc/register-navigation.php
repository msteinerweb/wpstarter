<?php

function register_navigation() {
    register_nav_menus(array(
        'main-menu'  => __('Main Menu', 'text_domain'),
        'footer-menu'  => __('Footer Menu', 'text_domain'),
    ));
}
add_action('after_setup_theme', 'register_navigation', 0);
