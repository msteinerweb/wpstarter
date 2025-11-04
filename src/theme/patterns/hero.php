<?php
/**
 * Title: Hero Section
 * Slug: wpstarter/hero
 * Categories: featured
 * Description: A hero section with heading, paragraph, and button
 * Viewport Width: 1200
 */
?>

<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|80","bottom":"var:preset|spacing|80"}}},"backgroundColor":"primary","textColor":"base","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-base-color has-primary-background-color has-text-color has-background" style="padding-top:var(--wp--preset--spacing--80);padding-bottom:var(--wp--preset--spacing--80)">

    <!-- wp:heading {"textAlign":"center","level":1,"fontSize":"xxx-large"} -->
    <h1 class="wp-block-heading has-text-align-center has-xxx-large-font-size">Welcome to Your Site</h1>
    <!-- /wp:heading -->

    <!-- wp:paragraph {"align":"center","fontSize":"large"} -->
    <p class="has-text-align-center has-large-font-size">Create something amazing with modern WordPress and WPStarter</p>
    <!-- /wp:paragraph -->

    <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"var:preset|spacing|50"}}}} -->
    <div class="wp-block-buttons" style="margin-top:var(--wp--preset--spacing--50)">
        <!-- wp:button {"backgroundColor":"tertiary","textColor":"contrast"} -->
        <div class="wp-block-button"><a class="wp-block-button__link has-contrast-color has-tertiary-background-color has-text-color has-background wp-element-button">Get Started</a></div>
        <!-- /wp:button -->
    </div>
    <!-- /wp:buttons -->

</div>
<!-- /wp:group -->
