<?php

// /wp-json/wp/test
add_action('rest_api_init', function () {
    register_rest_route('wp', 'test', array(
        'methods'  => 'GET',
        'callback' => function () {
            echo json_encode(
                array('success' => true,)
            );
        }
    ));
});
