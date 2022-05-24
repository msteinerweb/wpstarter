<?php

function remove_default_post_type() {
    remove_menu_page('edit.php');
}
add_action('admin_menu', 'remove_default_post_type');
