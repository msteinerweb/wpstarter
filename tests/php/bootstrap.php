<?php
/**
 * PHPUnit Bootstrap for WordPress Testing
 *
 * To set up WordPress tests:
 * 1. Install WordPress test suite:
 *    bash tests/bin/install-wp-tests.sh wordpress_test root '' localhost latest
 * 2. Run tests:
 *    vendor/bin/phpunit
 */

// Composer autoload
$_composer_autoload = dirname(__DIR__, 2) . '/vendor/autoload.php';
if (file_exists($_composer_autoload)) {
    require_once $_composer_autoload;
}

// WordPress tests directory
$_tests_dir = getenv('WP_TESTS_DIR');
if (!$_tests_dir) {
    $_tests_dir = '/tmp/wordpress-tests-lib';
}

// Give access to tests_add_filter() function
if (file_exists($_tests_dir . '/includes/functions.php')) {
    require_once $_tests_dir . '/includes/functions.php';
}

/**
 * Manually load the theme being tested
 */
function _manually_load_theme()
{
    // Load theme files here if needed
    require dirname(__DIR__, 2) . '/src/theme/functions.php';
}

if (function_exists('tests_add_filter')) {
    tests_add_filter('muplugins_loaded', '_manually_load_theme');
}

// Start up the WP testing environment (if installed)
if (file_exists($_tests_dir . '/includes/bootstrap.php')) {
    require $_tests_dir . '/includes/bootstrap.php';
} else {
    echo "\n!!! WordPress test suite not installed. !!!\n";
    echo "Run: bash tests/bin/install-wp-tests.sh wordpress_test root '' localhost latest\n\n";
}
