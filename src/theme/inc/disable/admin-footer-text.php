<?php
function update_footer_admin() {
    echo '';
}
add_filter('admin_footer_text', 'update_footer_admin');
