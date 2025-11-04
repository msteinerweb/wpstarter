<?php
/**
 * Title: Call to Action
 * Slug: wpstarter/cta
 * Categories: call-to-action
 * Description: A call-to-action section with heading and button
 * Viewport Width: 800
 */
?>

<!-- wp:group {"align":"wide","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","right":"var:preset|spacing|40","bottom":"var:preset|spacing|60","left":"var:preset|spacing|40"},"blockGap":"var:preset|spacing|40"},"border":{"radius":"8px"}},"backgroundColor":"neutral","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide has-neutral-background-color has-background" style="border-radius:8px;padding-top:var(--wp--preset--spacing--60);padding-right:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--60);padding-left:var(--wp--preset--spacing--40)">

    <!-- wp:heading {"textAlign":"center","level":2} -->
    <h2 class="wp-block-heading has-text-align-center">Ready to get started?</h2>
    <!-- /wp:heading -->

    <!-- wp:paragraph {"align":"center"} -->
    <p class="has-text-align-center">Join thousands of users building amazing websites with WPStarter.</p>
    <!-- /wp:paragraph -->

    <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
    <div class="wp-block-buttons">
        <!-- wp:button {"backgroundColor":"primary"} -->
        <div class="wp-block-button"><a class="wp-block-button__link has-primary-background-color has-background wp-element-button">Start Building</a></div>
        <!-- /wp:button -->

        <!-- wp:button {"className":"is-style-outline"} -->
        <div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button">Learn More</a></div>
        <!-- /wp:button -->
    </div>
    <!-- /wp:buttons -->

</div>
<!-- /wp:group -->
