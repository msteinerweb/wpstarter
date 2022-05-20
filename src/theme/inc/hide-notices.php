<?php

function hide_notices() {
    if (!current_user_can('manage_options')) {
        remove_action('admin_notices', 'update_nag',      3);
        remove_action('admin_notices', 'maintenance_nag', 10);
    }
}
add_action('admin_head', 'hide_notices');
