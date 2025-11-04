<?php
/**
 * Template Name: Page (Wide)
 * Template Post Type: page
 *
 * @package WPStarter
 */

get_header();
?>

<main id="primary" class="site-main site-main--wide">

    <?php
    while (have_posts()) :
        the_post();
        ?>

        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

            <?php if (has_post_thumbnail()) : ?>
                <div class="post-thumbnail">
                    <?php the_post_thumbnail('wpstarter-featured'); ?>
                </div>
            <?php endif; ?>

            <div class="entry-content entry-content--wide">
                <?php the_content(); ?>
            </div>

        </article>

        <?php
    endwhile;
    ?>

</main>

<?php
get_footer();
