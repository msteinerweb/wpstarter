<?php

// all settings - https://www.advancedcustomfields.com/resources/acf_add_options_page/


// add site options page
if (function_exists('acf_add_options_page')) {
  acf_add_options_page(array(
    'page_title' => 'Site Options',
  ));
}


// add social media profile links to site options page
if (function_exists('acf_add_local_field_group')) {
  acf_add_local_field_group(array(
    'key' => 'group_5e92210c858e5',
    'title' => 'Options - Social Media Accounts',
    'fields' => array(
      array(
        'key' => 'field_5e967958410dd',
        'label' => 'Social Media',
        'name' => '',
        'type' => 'accordion',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'open' => 0,
        'multi_expand' => 0,
        'endpoint' => 0,
      ),
      array(
        'key' => 'field_5e92211bceb79',
        'label' => 'Facebook URL',
        'name' => 'facebook_url',
        'type' => 'url',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'default_value' => '',
        'placeholder' => '',
      ),
      array(
        'key' => 'field_5e92220033ca9',
        'label' => 'LinkedIn URL',
        'name' => 'linkedin_url',
        'type' => 'url',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'default_value' => '',
        'placeholder' => '',
      ),
      array(
        'key' => 'field_5e92220f33caa',
        'label' => 'Instagram URL',
        'name' => 'instagram_url',
        'type' => 'url',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'default_value' => '',
        'placeholder' => '',
      ),
      array(
        'key' => 'field_5e92222f33cab',
        'label' => 'YouTube URL',
        'name' => 'youtube_url',
        'type' => 'url',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'default_value' => '',
        'placeholder' => '',
      ),
      array(
        'key' => 'field_5e92223e33cac',
        'label' => 'Pinterest URL',
        'name' => 'pinterest_url',
        'type' => 'url',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'default_value' => '',
        'placeholder' => '',
      ),
      array(
        'key' => 'field_5e922399c0a25',
        'label' => 'Twitter URL',
        'name' => 'twitter_url',
        'type' => 'url',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '',
          'class' => '',
          'id' => '',
        ),
        'default_value' => '',
        'placeholder' => '',
      ),
    ),
    'location' => array(
      array(
        array(
          'param' => 'options_page',
          'operator' => '==',
          'value' => 'acf-options-site-options',
        ),
      ),
    ),
    'menu_order' => 20,
    'position' => 'normal',
    'style' => 'seamless',
    'label_placement' => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen' => '',
    'active' => true,
    'description' => '',
  ));
}
