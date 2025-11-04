# Modern WordPress Features Guide

This document outlines all the modern WordPress features implemented in WPStarter and how to use them.

## Table of Contents

1. [Enhanced theme.json](#enhanced-themejson)
2. [Block Patterns](#block-patterns)
3. [Block Styles](#block-styles)
4. [Template Parts](#template-parts)
5. [Custom Templates](#custom-templates)
6. [Performance Optimizations](#performance-optimizations)
7. [REST API Integration](#rest-api-integration)
8. [Advanced Features](#advanced-features)

---

## Enhanced theme.json

### What Changed

The theme.json file has been upgraded from a restrictive v2 configuration to a fully-featured v3 configuration that takes advantage of WordPress 6.6+ features.

### New Features

#### 1. Fluid Typography
Automatically scales font sizes between min and max values based on viewport:

```json
{
    "name": "Large",
    "slug": "large",
    "size": "1.25rem",
    "fluid": {
        "min": "1.1rem",
        "max": "1.25rem"
    }
}
```

**Usage in blocks:**
- Font sizes automatically responsive
- No media queries needed
- Better readability across devices

#### 2. Spacing Scale
Consistent spacing system with 7 predefined sizes:

- X-Small: 0.5rem (8px)
- Small: 1rem (16px)
- Medium: 1.5rem (24px)
- Large: 2rem (32px)
- X-Large: 3rem (48px)
- 2X-Large: 4rem (64px)
- 3X-Large: 6rem (96px)

**Usage:**
```
padding: var(--wp--preset--spacing--40)
```

#### 3. Content & Wide Sizes
- **contentSize**: 800px (default content width)
- **wideSize**: 1200px (wide alignment width)

Enables proper use of:
- Normal width blocks
- Wide alignment blocks
- Full-width blocks

#### 4. Custom Color Palette
Extended palette with 7 colors:
- Primary: #244458
- Secondary: #8A3232
- Tertiary: #F3AE3D
- Quaternary: #8EA67E
- Base: #FFFFFF
- Contrast: #1A1A1A
- Neutral: #F5F5F5

#### 5. Gradients
Pre-defined gradient options:
- Primary to Secondary
- Tertiary to Quaternary

#### 6. Shadow Presets
Three levels of elevation:
- Small: Subtle shadow
- Medium: Moderate depth
- Large: Strong elevation

#### 7. Aspect Ratio Support (WP 6.6+)
Control image and media aspect ratios directly in the editor.

#### 8. Position Sticky
Enable sticky positioning for blocks.

#### 9. Appearance Tools
All border, padding, and spacing controls enabled for blocks.

---

## Block Patterns

Pre-designed block layouts that users can insert with one click.

### Available Patterns

#### 1. Hero Section (`wpstarter/hero`)
**Category:** Featured
**Use case:** Homepage hero, landing pages
**Contains:**
- Full-width section with colored background
- Large heading (h1)
- Descriptive paragraph
- Call-to-action button

#### 2. Call to Action (`wpstarter/cta`)
**Category:** Call-to-Action
**Use case:** Conversion sections, sign-ups
**Contains:**
- Bordered container
- Centered heading and text
- Two buttons (primary + outline)

#### 3. Features Grid (`wpstarter/features`)
**Category:** Columns
**Use case:** Feature showcases, service lists
**Contains:**
- Three-column layout
- Icon/emoji headings
- Description text

#### 4. Testimonial (`wpstarter/testimonial`)
**Category:** Text
**Use case:** Social proof, quotes
**Contains:**
- Bordered quote section
- Italic quote text
- Author attribution

### How to Use Patterns

1. In block editor, click the **+** button
2. Select **Patterns** tab
3. Browse by category or search
4. Click pattern to insert
5. Customize content and colors

### Creating Custom Patterns

Add new pattern files to `src/theme/patterns/`:

```php
<?php
/**
 * Title: Your Pattern Name
 * Slug: wpstarter/your-slug
 * Categories: your-category
 * Description: Pattern description
 * Viewport Width: 1200
 */
?>

<!-- Your block markup here -->
```

---

## Block Styles

Custom styling variations for core WordPress blocks.

### Available Block Styles

#### 1. Button - Outline
Transparent button with border:
- Background: transparent
- Border: 2px solid
- Text color: primary

**Usage:**
1. Add Button block
2. In sidebar, select **Outline** style

#### 2. Quote - Fancy Quote
Enhanced quote styling with custom design.

#### 3. List - Checkmark List
Replace bullet points with checkmarks.

### Registering Custom Block Styles

In `functions.php`:

```php
register_block_style('core/button', array(
    'name'  => 'your-style',
    'label' => __('Your Style', 'wpstarter'),
));
```

Add CSS in your stylesheet:

```css
.wp-block-button.is-style-your-style {
    /* Your styles */
}
```

---

## Template Parts

Reusable sections that can be edited from the Site Editor.

### Available Template Parts

#### Header (`parts/header.html`)
Contains:
- Site logo
- Navigation menu
- Responsive layout

#### Footer (`parts/footer.html`)
Contains:
- Three-column layout
- About, Links, Contact sections
- Copyright notice

### Using Template Parts

In PHP templates:
```php
<?php get_header(); ?>
<!-- or -->
<?php block_template_part('header'); ?>
```

In block templates:
```html
<!-- wp:template-part {"slug":"header"} /-->
```

### Editing Template Parts

1. Go to **Appearance → Editor**
2. Click **Template Parts**
3. Select part to edit
4. Make changes visually
5. Save

---

## Custom Templates

### Page (Wide) Template

Full-width page template without sidebar.

**How to use:**
1. Edit any page
2. In sidebar, find **Template**
3. Select **Page (Wide)**
4. Publish

**When to use:**
- Landing pages
- Full-width content
- Portfolio pages
- Contact forms

---

## Performance Optimizations

### Implemented Optimizations

#### 1. Emoji Script Disabled
Removes WordPress emoji detection script (-10KB).

#### 2. Selective Script Loading
- Comment reply script only on posts with comments
- Block editor assets only in editor

#### 3. Font Awesome 6
Updated from v5.15.4 to v6.5.1 with better performance.

#### 4. Theme Version Caching
Uses theme version for cache busting instead of random numbers.

#### 5. Responsive Embeds
Native lazy loading for embedded content.

### Optional Performance Tweaks

Uncomment in `functions.php`:

```php
// Disable remote block patterns (faster editor)
add_filter('should_load_remote_block_patterns', '__return_false');

// Preload fonts
function wpstarter_preload_fonts() {
    echo '<link rel="preconnect" href="https://fonts.googleapis.com">';
}
add_action('wp_head', 'wpstarter_preload_fonts', 1);
```

---

## REST API Integration

### Theme Info Endpoint

**Endpoint:** `/wp-json/wpstarter/v1/theme-info`

**Response:**
```json
{
    "name": "WPStarter",
    "version": "0.0.8",
    "description": "Modern WordPress theme"
}
```

**Use cases:**
- Headless WordPress
- Theme information display
- Version checking

### Creating Custom Endpoints

Add to `functions.php`:

```php
function your_custom_endpoint() {
    register_rest_route('wpstarter/v1', '/your-route', array(
        'methods'  => 'GET',
        'callback' => function() {
            return array('data' => 'value');
        },
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'your_custom_endpoint');
```

---

## Advanced Features

### 1. SVG Upload Support
SVG files can be uploaded (trust users only).

**Security note:** Only enable for trusted users as SVGs can contain malicious code.

### 2. Navigation Menus
Two registered menus:
- Primary (header)
- Footer

**Configure:**
1. Go to **Appearance → Menus**
2. Create menu
3. Assign to location

### 3. Widget Areas
Two registered sidebars:
- Sidebar (main)
- Footer widgets

### 4. Custom Image Sizes
Three optimized sizes:
- `wpstarter-featured`: 1200x675 (hero images)
- `wpstarter-thumbnail`: 400x250 (cards)
- `wpstarter-medium`: 800x450 (content)

**Usage:**
```php
the_post_thumbnail('wpstarter-featured');
```

### 5. Custom Logo Support
Flexible logo with recommended size 400x100.

### 6. Editor Styles
Editor matches frontend styling for accurate preview.

### 7. Wide & Full Alignment
Blocks can break out of content width:
- **Wide:** 1200px
- **Full:** 100% viewport width

---

## Block Editor Features

### What's Enabled

✅ **Appearance Tools** - Border, spacing controls
✅ **Custom Line Height** - Fine-tune typography
✅ **Custom Spacing** - Precise padding/margins
✅ **Custom Units** - px, em, rem, vh, vw, %
✅ **Link Color Control** - Per-block link colors
✅ **Responsive Embeds** - Auto-sizing media
✅ **Align Wide/Full** - Content width breakout
✅ **Block Styles** - Style variations
✅ **Editor Styles** - WYSIWYG editing

### Using Block Features

#### Custom Spacing
1. Select any block
2. Open **Settings** sidebar
3. Find **Spacing** section
4. Adjust padding/margin with presets or custom values

#### Custom Colors
1. Select text or block
2. Find **Color** settings
3. Choose from palette or custom
4. Link colors available separately

#### Wide/Full Alignment
1. Select block (Group, Image, Gallery, etc.)
2. In toolbar, click **Align**
3. Choose:
   - None (800px)
   - Wide (1200px)
   - Full (100%)

---

## Theme Development Tips

### 1. Use CSS Custom Properties

Access theme.json values in CSS:

```css
.my-element {
    color: var(--wp--preset--color--primary);
    font-size: var(--wp--preset--font-size--large);
    padding: var(--wp--preset--spacing--40);
}
```

### 2. Block Editor vs Frontend

Styles apply to both:
```css
.wp-block-button {
    /* Styles here */
}
```

Editor-only:
```css
.editor-styles-wrapper .wp-block-button {
    /* Editor only */
}
```

### 3. Responsive Design

Use fluid typography - it's automatic!

For custom responsive:
```css
@media (max-width: 782px) {
    .my-element {
        padding: var(--wp--preset--spacing--30);
    }
}
```

### 4. Testing Patterns

1. Install on dev site
2. Create test page
3. Insert pattern
4. Check responsive views
5. Test with different content lengths

---

## Migration from Old Themes

### If You Have an Existing Theme

1. **Backup everything**
2. **Review theme.json** - Your colors/fonts preserved
3. **Update functions.php** - Copy custom functions
4. **Test patterns** - May need adjustment
5. **Check templates** - Wide template is new
6. **Review blocks** - Block styles are new

### Breaking Changes

None for end users! All changes are additive.

### Developer Changes

- Function names now prefixed `wpstarter_`
- New block style registration
- Pattern directory structure
- Template parts in HTML format

---

## Resources

### WordPress Documentation
- [theme.json docs](https://developer.wordpress.org/themes/global-settings-and-styles/settings/)
- [Block Patterns](https://developer.wordpress.org/themes/features/block-patterns/)
- [Block Styles](https://developer.wordpress.org/reference/functions/register_block_style/)

### WPStarter
- [GitHub Repository](https://github.com/msteinerweb/wpstarter)
- [Issue Tracker](https://github.com/msteinerweb/wpstarter/issues)

---

## What's Next?

### Future WordPress Features to Watch

1. **Font Management** (WP 6.5+) - Local font uploads
2. **Block Bindings** (WP 6.5+) - Dynamic content
3. **Interactivity API** (WP 6.5+) - Interactive blocks
4. **Style Variations** (WP 6.6+) - Complete color scheme switching
5. **Grid Layout** - Native CSS Grid blocks coming

### Experimental Features

Enable in theme.json for bleeding-edge features:

```json
{
    "settings": {
        "appearanceTools": true,
        "useRootPaddingAwareAlignments": true
    }
}
```

---

## Support

Need help? Check:

1. WordPress documentation (linked above)
2. WPStarter GitHub issues
3. WordPress Stack Exchange
4. WordPress.org support forums

---

**Last Updated:** 2024
**WordPress Version:** 6.6+
**Theme Version:** 0.0.8+
