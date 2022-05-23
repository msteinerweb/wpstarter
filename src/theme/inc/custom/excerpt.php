<?php

// custom exerpts
function custom_excerpt_length($length) {
    return 50;
}
add_filter('excerpt_length', 'custom_excerpt_length', 999);

function custom_excerpt_ending($more) {
    return '&#46;&#46;&#46;';
}
add_filter('excerpt_more', 'custom_excerpt_ending');
