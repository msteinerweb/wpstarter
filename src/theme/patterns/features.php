<?php
/**
 * Title: Features Grid
 * Slug: wpstarter/features
 * Categories: columns
 * Description: A three-column features section
 * Viewport Width: 1200
 */
?>

<!-- wp:group {"align":"wide","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide" style="padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60)">

    <!-- wp:heading {"textAlign":"center","style":{"spacing":{"margin":{"bottom":"var:preset|spacing|50"}}}} -->
    <h2 class="wp-block-heading has-text-align-center" style="margin-bottom:var(--wp--preset--spacing--50)">Our Features</h2>
    <!-- /wp:heading -->

    <!-- wp:columns {"align":"wide"} -->
    <div class="wp-block-columns alignwide">

        <!-- wp:column -->
        <div class="wp-block-column">
            <!-- wp:heading {"level":3,"fontSize":"large"} -->
            <h3 class="wp-block-heading has-large-font-size">⚡ Lightning Fast</h3>
            <!-- /wp:heading -->

            <!-- wp:paragraph -->
            <p>Built with modern tools for optimal performance and developer experience.</p>
            <!-- /wp:paragraph -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column -->
        <div class="wp-block-column">
            <!-- wp:heading {"level":3,"fontSize":"large"} -->
            <h3 class="wp-block-heading has-large-font-size">🎨 Fully Customizable</h3>
            <!-- /wp:heading -->

            <!-- wp:paragraph -->
            <p>Take control with theme.json, custom blocks, and modern CSS.</p>
            <!-- /wp:paragraph -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column -->
        <div class="wp-block-column">
            <!-- wp:heading {"level":3,"fontSize":"large"} -->
            <h3 class="wp-block-heading has-large-font-size">📱 Responsive</h3>
            <!-- /wp:heading -->

            <!-- wp:paragraph -->
            <p>Mobile-first design ensures your site looks great on any device.</p>
            <!-- /wp:paragraph -->
        </div>
        <!-- /wp:column -->

    </div>
    <!-- /wp:columns -->

</div>
<!-- /wp:group -->
